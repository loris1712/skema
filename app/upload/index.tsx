import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, Alert, Text, ActivityIndicator} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { View } from '@/components/Themed';
import shared from '@/styles/shared';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import { normalize } from '@/utils/normalize';
import FileUploadButton from '@/atoms/FileUploadButton';
import PrimaryButton from '@/atoms/PrimaryButton';
import { geminiFileRequest, getFileHash, geminiAudioRequest } from '@/services/gemini';
import DashedLine from '@/atoms/DashedLine';
import { saveFileMindMap, getFileMindMap } from '@/services/supabase';
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {DocumentPickerAsset} from "expo-document-picker/src/types";
import { Audio } from 'expo-av';

const UploadPage = () => {
  const router = useRouter();

  const {getItem} = useAsyncStorage('user-id');

  const [selectedFile, setSelectedFile] = useState<DocumentPickerAsset | null>(null);
  const [selectedType, setSelectedType] = useState<
    'pdf' | 'word' | 'audio' | null
  >(null);
  const [errorType, setErrorType] = useState<'pick' | 'mindmap' | null>();

  const pickDocument = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type,
        multiple: false,
      });
      if (result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets?.[0]);
      } else {
        setErrorType('pick');
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };


  const generateMindMapMutation = useMutation({
    mutationKey: ['generateMindMap'],
    mutationFn: async (file: any) => {
      const userId = await getItem();

      const base64Content = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileHash = await getFileHash(base64Content);

      const existingMindMap = await getFileMindMap(fileHash);
      const mindMap = existingMindMap?.[0] ?? null;

      if (mindMap) return fileHash;

      const geminiResponse = await geminiFileRequest(base64Content);
      if (geminiResponse && fileHash) {
        console.log({ geminiResponse });
        const responseJson = JSON.parse(geminiResponse);
        const payload = {
          id: fileHash,
          name: selectedFile?.name,
          mindMap: responseJson,
          extension: selectedType,
          type: selectedType,
          fileHash: fileHash,
          userId: userId,
          createdAt: new Date().toISOString()
        };
        // api to upload to server
        const { data, error } = await saveFileMindMap(payload);
        console.log({data})
        if (error) {
          console.log({error})
          throw new Error(error.message);
        }
        return fileHash;
      }
    },
    onSuccess: async (fileHash: any) => {
      router.push(`/upload/completed?file=${fileHash}`);
    },
    onError: (error) => {
      Alert.alert("Something Happened.", "Error generating MindMap for file.")
      console.log({error});
      setErrorType('mindmap');
    },
  });

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function splitBase64Audio(base64Content: string): Promise<string[]> {
    const size = base64Content.length;
    const segmentCount = size > 3_000_000 ? 3 : size > 1_500_000 ? 2 : 1;
    const segmentSize = Math.floor(size / segmentCount);
  
    const parts: string[] = [];
  
    for (let i = 0; i < segmentCount; i++) {
      const start = i * segmentSize;
      const end = i === segmentCount - 1 ? size : (i + 1) * segmentSize;
      parts.push(base64Content.slice(start, end));
    }
  
    return parts;
  }  

  const transcribeAudioFileMutation = useMutation({
    mutationKey: ['transcribeAudioFile'],
    mutationFn: async (file: DocumentPickerAsset) => {
      const userId = await getItem();
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
  
      if (!fileInfo.exists) {
        Alert.alert("No file found.", "Errore nel trovare il file.");
        return;
      }
  
      const base64Content = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const fileHash = await getFileHash(base64Content);
      const existingMindMap = await getFileMindMap(fileHash);
      if (existingMindMap?.[0]) return fileHash;
  
      const parts = await splitBase64Audio(base64Content);
      let finalText = "";
  
      for (let i = 0; i < parts.length; i++) {
        const partResponse = await geminiAudioRequest(parts[i], file.mimeType!);
        if (partResponse) finalText += partResponse + "\n";
  
        if (i < parts.length - 1) {
          await delay(3000); // 3s di delay per non stressare Gemini
        }
      }
  
      const payload = {
        id: fileHash,
        name: selectedFile?.name,
        mindMap: { text: finalText },
        extension: selectedType,
        type: selectedType,
        fileHash: fileHash,
        userId: userId,
        createdAt: new Date().toISOString()
      };
  
      const { error } = await saveFileMindMap(payload);
      if (error) throw new Error(error.message);
  
      return fileHash;
    },
    onSuccess: async (fileHash: any) => {
      router.push(`/upload/completed?file=${fileHash}`);
    },
    onError: (error) => {
      console.error({ error });
      Alert.alert("Errore", "Errore generando la mappa mentale.");
    }
  });
  

  const onCancel = () => {
    setSelectedFile(null);
    setSelectedType(null);
  };

  const isLoading = generateMindMapMutation.isPending || transcribeAudioFileMutation.isPending;

  return (

    <View style={{ ...shared.pageContainer }}>
      <PageLogoHeading asHeader title="Carica il tuo file" />
      <View style={styles.uploadButtonsWrapper}>
        <DashedLine />

        <TouchableOpacity
          onPress={() => {
            setSelectedType('audio');
            pickDocument('audio/*').then().catch();
          }}
        >
          <FileUploadButton
            selected={!!selectedFile?.name && selectedType === 'audio'}
            filename={selectedFile?.name}
            text="Audio -> Sbobina"
            onCancel={onCancel}
             active="yes"
          />
        </TouchableOpacity>
        <DashedLine />

        {/*<TouchableOpacity
          onPress={() => {
            setSelectedType('pdf');
            pickDocument('application/pdf').then().catch();
          }}
        >*/}
          <FileUploadButton
            selected={!!selectedFile?.name && selectedType === 'pdf'}
            filename={selectedFile?.name}
            text="Sbobina -> Skema (PDF)"
            onCancel={onCancel}
            active="no"

          />
        {/*</TouchableOpacity>*/}
        <DashedLine />

        {/*<TouchableOpacity
          onPress={() => {
            setSelectedType('word');
            pickDocument('application/msword').then().catch();
          }}
        >*/}
          <FileUploadButton
            selected={!!selectedFile?.name && selectedType === 'word'}
            filename={selectedFile?.name}
            text="Sbobina -> Skema (Word)"
            onCancel={onCancel}
             active="no"
          />

        {/*</TouchableOpacity>*/}
        <DashedLine />
        
      </View>
      {
        isLoading && (<ActivityIndicator size={"small"} color={"white"}/>)
      }

      {!!selectedFile?.name ? (
        <View>
          <PrimaryButton
            disabled={isLoading}
            onPress={async () => {
              const userId = await getItem();
              if(!userId){
                router.push("/auth/login");
              }else {
                if(selectedType === 'audio') {
                  transcribeAudioFileMutation.mutate(selectedFile)
                }else {
                  Alert.alert("sei sicuro?", "Questa funzione è attualmente in versione Beta. Stiamo lavorando per migliorarla, ma puoi già iniziare a provarla!");
                  generateMindMapMutation.mutate(selectedFile);
                }
              }

            }}
            text={isLoading ? 'Loading...' : (selectedType === 'audio' ? 'Sbobiniamo?' : 'Schemiamo?')}
          />
        </View>
      ) : <View>
        <PrimaryButton isWhite text={"Account"} onPress={()=> {
          router.push("/account");
        }}/>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: normalize(120),
    justifyContent: 'center',
  },
  uploadButtonsWrapper: {
    flex: 1,
  },
  subtitle: {
    fontSize: normalize(14),
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: normalize(10),
    marginBottom: normalize(10),
},
});

export default UploadPage;
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
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
import { geminiRequest, getFileHash } from '@/services/gemini';
import DashedLine from '@/atoms/DashedLine';
import { saveFileMindMap, getFileMindMap } from '@/services/supabase';

const UploadPage = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState<
    'pdf' | 'word' | 'audio' | null
  >(null);
  const [errorType, setErrorType] = useState<'pick' | 'mindmap' | null>();

  const generateMindMapMutation = useMutation({
    mutationKey: ['generateMindMap'],
    mutationFn: async (file: any) => {
      const base64Content = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileHash = await getFileHash(base64Content);

      const existingMindMap = await getFileMindMap(fileHash);
      const mindMap = existingMindMap?.[0] ?? null;

      if (mindMap) return mindMap;

      const geminiResponse = await geminiRequest(base64Content);
      if (geminiResponse) {
        const responseJson = JSON.parse(geminiResponse);
        const payload = {
          id: fileHash,
          name: selectedFile.name,
          mindMap: responseJson,
          extension: selectedType,
          type: selectedType,
          fileHash: fileHash,
        };
        // api to upload to server
        const { data, error } = await saveFileMindMap(payload);
        console.log({ error });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      }
    },
    onSuccess: async (payload: any) => {
      console.log("Response",{payload})
      router.push(`/upload/completed?file=${payload.fileHash}`);
    },
    onError: () => {
      setErrorType('mindmap');
    },
  });

  const pickDocument = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type,
        copyToCacheDirectory: true,
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

  const onCancel = () => {
    setSelectedFile(null);
    setSelectedType(null);
  };

  return (
    <View style={{ ...shared.pageContainer }}>
      <View style={styles.headerContainer}>
        <PageLogoHeading title="Carica il tuo file" />
      </View>

      <View style={styles.uploadButtonsWrapper}>
        <DashedLine />
        <TouchableOpacity
          onPress={() => {
            setSelectedType('pdf');
            pickDocument('application/pdf');
          }}
        >
          <FileUploadButton
            selected={selectedFile?.name && selectedType === 'pdf'}
            filename={selectedFile?.name}
            text="PDF File"
            onCancel={onCancel}
          />
        </TouchableOpacity>
        <DashedLine />
        <TouchableOpacity
          onPress={() => {
            setSelectedType('word');
            pickDocument('application/msword');
          }}
        >
          <FileUploadButton
            selected={selectedFile?.name && selectedType === 'word'}
            filename={selectedFile?.name}
            text="Word File"
            onCancel={onCancel}
          />
        </TouchableOpacity>
        <DashedLine />
        <TouchableOpacity
          onPress={() => {
            setSelectedType('audio');
            pickDocument('/mp3');
          }}
        >
          <FileUploadButton
            selected={selectedFile?.name && selectedType === 'audio'}
            filename={selectedFile?.name}
            text="Audio File"
            onCancel={onCancel}
          />
        </TouchableOpacity>
        <DashedLine />
      </View>

      {!!selectedFile?.name && (
        <View>
          <PrimaryButton
            disabled={generateMindMapMutation.isPending}
            onPress={() => {
              generateMindMapMutation.mutate(selectedFile);
            }}
            text={
              generateMindMapMutation.isPending ? 'Loading...' : 'Genera Mappa'
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: normalize(120),
    justifyContent: 'center',
    marginVertical: normalize(16),
  },
  uploadButtonsWrapper: {
    flex: 1,
  },
});

export default UploadPage;

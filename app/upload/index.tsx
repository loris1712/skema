import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { useRouter } from 'expo-router';

import { View } from '@/components/Themed';
import shared from '@/styles/shared';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import { normalize } from '@/utils/normalize';
import FileUploadButton from '@/atoms/FileUploadButton';
import PrimaryButton from '@/atoms/PrimaryButton';
import { geminiRequest } from '@/services/gemini';

const UploadPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const router = useRouter();

  const pickDocument = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type,
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setSelectedDocument(result.assets?.[0]);
        const [selectedFile] = result.assets;
        console.log('Selected file:', selectedFile.name);

        // Read file content as base64
        const base64Content = await FileSystem.readAsStringAsync(
          selectedFile.uri,
          { encoding: FileSystem.EncodingType.Base64 },
        );

        try{
          const geminiResponse = await geminiRequest(base64Content);
          if(geminiResponse){
            const responseJson = JSON.parse(geminiResponse);
            console.table(responseJson);
          }
        }catch(e){
          console.log(e)
        }
        
      }
      console.log(result);
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const processDocument = () => {
    router.push({
      pathname: '/',
      params: { documentName: selectedDocument.name },
    });
  };

  return (
    <View style={{ ...shared.pageContainer }}>
      <View style={styles.headerContainer}>
        <PageLogoHeading title="Carica il tuo file" />
      </View>

      <View style={styles.uploadButtonsWrapper}>
        <TouchableOpacity onPress={() => pickDocument('application/pdf')}>
          <FileUploadButton text="PDF File" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickDocument('application/pdf')}>
          <FileUploadButton text="Word File" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickDocument('application/pdf')}>
          <FileUploadButton text="Audio File" />
        </TouchableOpacity>
      </View>

      {!!selectedDocument?.name && (
        <View>
          <PrimaryButton onPress={() => {}} text="Genera Mappa" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: normalize(92),
    justifyContent: 'center',
  },
  uploadButtonsWrapper: {
    flex:1
  },
});

export default UploadPage;

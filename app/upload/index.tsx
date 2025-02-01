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
import { geminiRequest, getFileHash } from '@/services/gemini';
import DashedLine from '@/atoms/DashedLine';
import SecondaryButton from '@/atoms/SecondaryButton';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState<'pdf' | 'word' | 'audio' | null>(null)

  const pickDocument = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type,
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets?.[0]);
      }
      console.log(result);
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const processDocument = async () => {
    console.log('Selected file:', selectedFile.name);

    // Read file content as base64
    const base64Content = await FileSystem.readAsStringAsync(selectedFile.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileHash = await getFileHash(base64Content);
    console.log({ fileHash });

    try {
      const geminiResponse = await geminiRequest(base64Content);
      if (geminiResponse) {
        const responseJson = JSON.parse(geminiResponse);
        const payload = {
          filename: selectedFile.name,
          mindmap: responseJson,
          extension: selectedType,
          fileHash: fileHash,
        };
        console.log({payload})
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setSelectedFile(null);
    setSelectedType(null)
  }

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
          <PrimaryButton onPress={processDocument} text="Genera Mappa" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: normalize(120),
    justifyContent: 'center',
    marginVertical: normalize(16)
  },
  uploadButtonsWrapper: {
    flex:1
  },
});

export default UploadPage;

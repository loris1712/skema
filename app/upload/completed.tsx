import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { View } from '@/components/Themed';
import shared from '@/styles/shared';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import { normalize } from '@/utils/normalize';
import PrimaryButton from '@/atoms/PrimaryButton';
import DashedLine from '@/atoms/DashedLine';
import SecondaryButton from '@/atoms/SecondaryButton';
import { useQuery, useMutation } from "@tanstack/react-query";
import { saveFileMindMap, getFileMindMap } from "@/services/supabase";
import * as FileSystem from 'expo-file-system';
import { geminiAudioCleanUp, geminiAudioComparison } from '@/services/gemini';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { DocumentPickerAsset } from "expo-document-picker/src/types";

const CompletedPage = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['uploadedFile', file],
    enabled: !!file?.length,
    queryFn: async () => {
      const existingMindMap = await getFileMindMap(file?.toString());
      return existingMindMap?.[0] ?? null;
    }
  });

  const isAudio = data?.extension === "audio";

  const { getItem } = useAsyncStorage('user-id');
  const [selectedFile, setSelectedFile] = useState<DocumentPickerAsset | null>(null);
  const [selectedType, setSelectedType] = useState<'pdf' | 'word' | 'audio' | null>(null);
  const [cleanedText, setCleanedText] = useState<string | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [hasCleaned, setHasCleaned] = useState(false); // Aggiungi questo stato

  const handleCleanText = async () => {
    const textToClean = data?.mindMap?.text ?? "";
    const mimeType = data?.mimeType ?? "text";

    if (!textToClean) {
      Alert.alert("Errore", "Non ci sono dati da pulire.");
      return;
    }

    try {
      setIsCleaning(true);
      const cleaned = await geminiAudioCleanUp(textToClean, mimeType);

      const cleanedWithoutSymbols = cleaned?.replace(/[*#]/g, "");

      setCleanedText(cleanedWithoutSymbols ?? "");
      setHasCleaned(true); // Aggiorna hasCleaned
      Alert.alert("Pulito", "Il testo è stato ripulito con successo.");
    } catch (err) {
      console.error("Errore durante la pulizia:", err);
      Alert.alert("Errore", "Non è stato possibile pulire il testo.");
    } finally {
      setIsCleaning(false);
    }
  };

  const handleComparisonText = async () => {
    const mimeType = data?.mimeType ?? "text";

    if (!cleanedText) {
      Alert.alert("Errore", "Non ci sono dati da pulire.");
      return;
    }

    try {
      setIsComparing(true);
      const cleaned = await geminiAudioComparison(cleanedText, mimeType);

      const cleanedWithoutSymbols = cleaned?.replace(/[*#]/g, "");

      setCleanedText(cleanedWithoutSymbols ?? "");
      Alert.alert("Approfondito", "Il testo è stato approfondito con successo.");
    } catch (err) {
      console.error("Errore durante l'approfondimento:", err);
      Alert.alert("Errore", "Non è stato possibile approfondire il testo.");
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <View style={{ ...shared.pageContainer }}>
      <PageLogoHeading asHeader title="Completato" />
      <DashedLine />

      {isLoading && <ActivityIndicator />}
      {!isAudio && (
        <View style={styles.containerText}>
          <Text style={styles.title}>File pronto!</Text>
          <Text style={styles.message}>
            Il tuo file è pronto per essere visualizzato o scaricato.
          </Text>
        </View>
      )}

      <View style={styles.uploadButtonsWrapper}>
        {isAudio && (
          <View>
            <Text style={styles.generatedTextLabel}>Testo generato</Text>

            <ScrollView style={{ maxHeight: 320 }} nestedScrollEnabled>
              <Text style={styles.generatedText}>
                {cleanedText ?? data?.mindMap?.text}
              </Text>
            </ScrollView>

            <Text style={styles.scrollHint}>Scorri verso il basso</Text>
          </View>
        )}
      </View>

      {!isLoading && (
        <View style={styles.buttonWrapper}>
          {isAudio && (
            <>
              {/* Solo il bottone Riassumi inizialmente */}
              {!hasCleaned && (
                <PrimaryButton
                  onPress={handleCleanText}
                  text={isCleaning ? "Riassunto in corso..." : "Riassumi"}
                />
              )}

              {/* Dopo il riassunto, mostra Approfondisci */}
              {hasCleaned && (
                <PrimaryButton
                  onPress={handleComparisonText}
                  text={isComparing ? "Approfondimento in corso..." : "Approfondisci"}
                />
              )}

              <PrimaryButton
                isWhite
                onPress={async () => {
                  await Clipboard.setStringAsync(cleanedText ?? (data?.mindMap?.text || ''));
                  Alert.alert('Copiato', 'Il testo è stato copiato negli appunti.');
                }}
                text="Copia negli appunti"
              />
            </>
          )}

          {!isAudio && (
            <View style={styles.gridButtonsWrapper}>
              <View style={styles.gridButton}>
                <SecondaryButton
                  text="Visualizza"
                  onPress={() => router.push(`/mindmap?file=${file}`)}
                />
              </View>
              <View style={styles.gridButton}>
                <PrimaryButton
                  text="Scarica"
                  onPress={() => router.push(`/mindmap?file=${file}`)}
                />
              </View>
            </View>
          )}
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
  uploadButtonsWrapper: {},
  buttonWrapper: {
    gap: normalize(16),
  },
  gridButtonsWrapper: {
    flexDirection: 'row',
    gap: normalize(8),
    marginInline: normalize(-8),
  },
  gridButton: {
    flex: 1,
    paddingInline: normalize(-8),
  },
  containerText: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#007AFF',
    fontSize: normalize(28),
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    color: 'white',
    fontSize: normalize(16),
    textAlign: 'center',
  },
  generatedTextLabel: {
    color: "#fff",
    marginBottom: normalize(10),
    fontSize: normalize(18),
    fontWeight: '600',
    marginTop: 20,
  },
  generatedText: {
    color: "#fff",
    fontSize: normalize(14),
  },
  scrollHint: {
    color: "#fff",
    textAlign: "center",
    marginTop: normalize(18),
    marginBottom: normalize(18),
    fontSize: normalize(14),
  },
});

export default CompletedPage;

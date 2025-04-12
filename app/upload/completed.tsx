import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { View } from '@/components/Themed';
import shared from '@/styles/shared';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import { normalize } from '@/utils/normalize';
import PrimaryButton from '@/atoms/PrimaryButton';
import DashedLine from '@/atoms/DashedLine';
import SecondaryButton from '@/atoms/SecondaryButton';

const CompletedPage = () => {
  const router = useRouter();
  const { file } = useLocalSearchParams();

  return (
    <View style={{ ...shared.pageContainer }}>
      <PageLogoHeading title="Carica il tuo file" />
      <DashedLine />
      <View style={styles.uploadButtonsWrapper}></View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton
          isWhite
          text="Cancella"
          onPress={() => {
            router.replace('/upload');
          }}
        />

        <View style={styles.gridButtonsWrapper}>
          <View style={styles.gridButton}>
            <SecondaryButton
              text="Visualizza"
              onPress={() => {
                router.push(`/mindmap?file=${file}`);
              }}
            />
          </View>
          <View style={styles.gridButton}>
            <PrimaryButton
              text="Sacrica"
              onPress={() => {
                router.push(`/mindmap?file=${file}`);
              }}
            />
          </View>
        </View>
      </View>
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
});

export default CompletedPage;

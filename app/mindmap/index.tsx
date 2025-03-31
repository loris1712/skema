import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {useLocalSearchParams} from 'expo-router'


import { View } from '@/components/Themed';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import { normalize } from '@/utils/normalize';
import sharedStyles from '@/styles/shared';

const MindMapPage = () => {
    const { file } = useLocalSearchParams();
  return (
    <View style={{ ...sharedStyles.pageContainer }}>
      <View style={styles.headerContainer}>
        <PageLogoHeading asHeader title="Carica il tuo file" />
      </View>
      <WebView
        source={{ uri: `https://skema-mindmap.vercel.app?file=${file}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    marginVertical: normalize(16),
  },
  uploadButtonsWrapper: {
    flex: 1,
  },
});


export default MindMapPage;

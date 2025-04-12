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
        <PageLogoHeading asHeader title="Carica il tuo file" />Ï
      <WebView
        source={{ uri: `https://skema-mindmap.vercel.app?file=${file}` }}
      />
    </View>
  );
};



export default MindMapPage;

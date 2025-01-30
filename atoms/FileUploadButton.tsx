import {Image} from 'react-native'
import { Text, View } from "@/components/Themed"
import { StyleSheet } from "react-native"
import { normalize } from '@/utils/normalize'
import Colors from '@/constants/Colors'


interface Props {
    text: string
}

const FileUploadButton = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('@/assets/images/uploadIcon.png')}
      />
      <Text 
      lightColor={Colors.light.text} 
      style={styles.text}
      darkColor={Colors.dark.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: normalize(12),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: normalize(16),
    height: normalize(40)
  },
  icon: {
    height: normalize(16),
    width: normalize(24),
  },
  text: {
    fontWeight: '500',
    fontSize: normalize(20),
    lineHeight: normalize(32),
    color: '#fff',
  },
});

export default FileUploadButton
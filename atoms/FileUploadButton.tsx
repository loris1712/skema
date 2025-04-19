import {Image, TouchableOpacity} from 'react-native'
import { Text, View } from "@/components/Themed"
import { StyleSheet } from "react-native"
import { normalize } from '@/utils/normalize'
import Colors from '@/constants/Colors'


interface Props {
    text: string,
    selected?: boolean,
    filename?: string,
    onCancel?:()=> void
}

const FileUploadButton = ({ text, selected, filename, onCancel }: Props) => {
  return (
    <View style={styles.container}>
      {selected ? (
        <View>
          <Text style={styles.selectedTitle}>{text}</Text>
          <View style={styles.selectedFileWrapper}>
            <Text style={styles.selectedFilename}>{filename}</Text>
            <TouchableOpacity onPress={onCancel}>
              <Image
                style={styles.cancelImage}
                source={require('@/assets/images/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.itemWrapper}>
          <Image
            style={styles.icon}
            source={require('@/assets/images/uploadIcon.png')}
          />
          <Text
            lightColor={Colors.light.text}
            style={styles.text}
            darkColor={Colors.dark.text}
          >
            {text}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(16),
    minHeight: normalize(80),
    flexDirection: 'column',
    justifyContent: 'center',
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
  selectedTitle: {
    fontWeight: '400',
    fontSize: normalize(15),
    lineHeight: normalize(20),
    color: '#FFFFFF99',
  },
  selectedFilename: {
    color: '#FFFFFF4D',
    marginLeft: normalize(-8),
    fontSize: normalize(20),
    lineHeight:normalize(32),
    fontWeight:'500'
  },
  selectedFileWrapper: {
    flexDirection: 'row',
    columnGap: normalize(8),
    justifyContent:'flex-start',
    alignItems:'center',
  
  },
  itemWrapper: {
    flexDirection: 'row',
    gap: normalize(12),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: normalize(16),
  },
  cancelImage: {
    height: normalize(24),
    width: normalize(24)
  }
});

export default FileUploadButton
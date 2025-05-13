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
    active: string,
}

const FileUploadButton = ({ text, selected, filename, onCancel, active}: Props) => {
  return (
    <View
  style={[
    styles.container,
    active === 'no' && styles.disabledContainer
  ]}
>
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
        style={active === 'no'
          ? styles.iconBig 
          : styles.icon}
        source={
          active === 'no'
            ? require('@/assets/images/lockIcon.png')
            : require('@/assets/images/uploadIcon.png')
        }
      />
      <Text
        style={[
          styles.text,
          active === 'no' && styles.disabledText
        ]}
      >
        {text}
      </Text>
    </View>
  )}
</View>

  );
};

const styles = StyleSheet.create({
  disabledContainer: {
    opacity: 0.5,
  },
  
  disabledText: {
    color: '#FFFFFF66',
  },
  
  disabledIcon: {
    tintColor: '#FFFFFF66',
  },  
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
  iconBig: {
    height: normalize(30),
    width: normalize(30),
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
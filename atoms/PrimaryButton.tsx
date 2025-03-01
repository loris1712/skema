import Colors from "@/constants/Colors";
import { normalize } from "@/utils/normalize";
import { TouchableHighlight, Text, TouchableNativeFeedback, TouchableOpacity, TouchableOpacityProps } from "react-native"


interface Props extends TouchableOpacityProps{
    isWhite?: boolean,
    text: string,
    isLoading?: boolean,
}


const PrimaryButton = ({ text, onPress, isWhite, isLoading }: Props) => {
  return (
    <TouchableOpacity
  
    activeOpacity={0.8}
      onPress={onPress}
      style={{
        height: normalize(48),
        width: '100%',
        backgroundColor: isWhite ? '#ffffff' : Colors.dark.tint,
        borderRadius: normalize(8),
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <Text
        style={{
          color: isWhite ? '#000000' : '#ffffff',
          fontSize: normalize(16)
        }}
      >
        {isLoading ? "Loading..." : text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
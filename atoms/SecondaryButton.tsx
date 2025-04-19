import { normalize } from "@/utils/normalize";
import { TouchableOpacity, Text } from "react-native"


interface Props {
    text: string,
    onPress: () => void
}

const SecondaryButton = ({
    text,
    onPress
}: Props) => {


    return (
      <TouchableOpacity
       onPress={onPress}
       style={{
        height: normalize(48),
        backgroundColor:'transparent',
        borderColor:'#ffffff',
        borderRadius: normalize(8),
        borderWidth: normalize(1),
        alignItems:'center',
        justifyContent: 'center'
       }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: normalize(16),
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
}

export default SecondaryButton;
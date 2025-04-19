import { normalize } from "@/utils/normalize";
import { Image } from "react-native";

interface Props {
    size: number
}
const AppIcon = ({size}: Props) => {
    return (
      <Image
        style={{
          height: normalize(size),
          width: normalize(size),
          objectFit:'contain',
          marginLeft:normalize(-16)
        }}
        source={require('@/assets/images/icon-large.png')}
      />
    );
}

export default AppIcon
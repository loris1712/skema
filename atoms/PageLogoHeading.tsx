import { Text, View } from "@/components/Themed"
import { normalize } from "@/utils/normalize";
import { StyleSheet } from "react-native"
import AppIcon from "./AppIcon";


interface Props {
    title?: string
}

const PageLogoHeading = ({title}: Props) => {

    const hasTitle = !!title;
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: hasTitle ? 'flex-start' : 'center',
      }}
    >
      <AppIcon size={62} />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:'row',
        gap:normalize(16),
        alignItems: 'center',
        
    },
    hasText: {

    },
    text: {
        color:  "#ffffff",
        fontWeight:'700',
        fontSize: normalize(28),
        lineHeight: normalize(48)
    }
})

export default PageLogoHeading
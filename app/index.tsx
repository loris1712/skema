import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native"
import { useRouter} from "expo-router"
import Colors from "@/constants/Colors"
import { normalize } from "@/utils/normalize";
import AppIcon from "@/atoms/AppIcon";

export default function HomeScreen() {
    const router = useRouter()
    return (
      <View style={styles.container}>
        <AppIcon size={220} />
        <TouchableOpacity onPress={() => router.replace('/upload')}>
          <Text>On Board</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    logoImageLarge: {
        height: normalize(220),
        width: normalize(187.5)
    }
})



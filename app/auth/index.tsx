import {Text, View} from "@/components/Themed";
import shared from "@/styles/shared";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import {normalize} from "@/utils/normalize";
import DashLine from "@/atoms/DashedLine";
import {StyleSheet} from "react-native";
import PrimaryButton from "@/atoms/PrimaryButton";
import { router } from 'expo-router';

const AuthIndex = () => {


    return (
        <View style={shared.pageContainer}>
            <PageLogoHeading size={18} title={"File caricato"}/>
            <DashLine/>
            <View style={{
                marginTop: normalize(24),
                flex: 1,
            }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Salva le tue mappe</Text>
                    <Text style={styles.description}>Crea un account per salvare
                        e accedere facilmente alle
                        tue mappe in qualsiasi momento oppure effettua un Login.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <PrimaryButton text={"Login"} onPress={()=> {
                        router.push("/auth/login")
                    }}/>
                    <View style={styles.inputSpacer} />
                    <PrimaryButton isWhite={true} text={"Crea account"} onPress={()=> {
                        router.push("/auth/register")
                    }}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "black",
    },
    content: {
        marginTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    description: {
        marginTop: 8,
        fontSize: 16,
        color: "#999",
    },
    inputContainer: {
        marginTop: normalize(24),
        flex: 1,
    },
    inputSpacer: {
        height: 16,
    },
    buttonContainer: {
        marginTop: normalize(16),
    },
})


export default AuthIndex;
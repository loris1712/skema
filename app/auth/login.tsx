import {StyleSheet} from 'react-native';
import {  signInAnonymously } from "firebase/auth";
import {auth} from "@/firebaseConfig";
import {Text, View} from "@/components/Themed";
import shared from "@/styles/shared";
import {useEffect} from "react";
import PrimaryButton from "@/atoms/PrimaryButton";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import Input from "@/atoms/TextInput"
import {normalize} from "@/utils/normalize";
import DashLine from "@/atoms/DashedLine";


const LoginPage = () => {

    useEffect(() => {
        signInAnonymously(auth).then(user => {
            console.log(user);
        }).catch(console.error);
    }, []);

    return (
        <View style={shared.pageContainer}>
            <View style={{
                marginVertical:normalize(16)
            }}>
                <PageLogoHeading size={18} title={"File caricato"}/>
            </View>
            <DashLine/>
            <View style={{
                marginTop: normalize(24),
                flex: 1,
            }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.description}>Accedi al tuo account per visualizzare le proprie tue mappe.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
                    <View style={styles.inputSpacer} />
                    <Input placeholder="Password" secureTextEntry />
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton text={"Login"} onPress={()=> {

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

export default LoginPage;
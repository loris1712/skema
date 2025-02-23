
import {  signInAnonymously } from "firebase/auth";
import {auth} from "@/firebaseConfig";
import {Text, View} from "@/components/Themed";
import shared from "@/styles/shared";
import {useEffect} from "react";
import PrimaryButton from "@/atoms/PrimaryButton";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import {normalize} from "@/utils/normalize";


const LoginPage = () => {

    useEffect(() => {
        signInAnonymously(auth).then(user => {
            console.log(user);
        }).catch(console.error);
    }, []);

    return (
        <View style={shared.pageContainer}>
            <PageLogoHeading size={18} title={"Login"}/>
            <View style={{
                marginTop: normalize(24),
            }}>
                <Text darkColor={"#ffffff"} lightColor={"#ffffff"}>Login Page</Text>
                <PrimaryButton text={"Login"} onPress={()=> {

                }}/>
            </View>
        </View>
    )
}

export default LoginPage;
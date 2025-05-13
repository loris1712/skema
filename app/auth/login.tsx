import {StyleSheet, TouchableOpacity} from 'react-native';

import {Formik} from "formik";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from 'expo-router';
import {useState} from "react";


import {signInWithEmailAndPassword,setPersistence, browserLocalPersistence} from "firebase/auth";
import {auth} from "@/firebaseConfig";
import {Text, View} from "@/components/Themed";
import shared from "@/styles/shared";
import PrimaryButton from "@/atoms/PrimaryButton";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import Input from "@/atoms/TextInput"
import {normalize} from "@/utils/normalize";
import DashLine from "@/atoms/DashedLine";
import {FirebaseError} from "@firebase/util";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";


const LoginPage = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const {setItem:setIDItem} = useAsyncStorage('user-id');
    const {setItem: setTokenItem} = useAsyncStorage('user-token')

    const signInMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async ({email, password}: any) => {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const token = await result.user.getIdTokenResult();
            //console.log({token});
            await setTokenItem(token.token)
            await setIDItem(result.user.uid, () => {
            })
            return result.user;
        },
        onSuccess: () => {
            router.push("/upload");
        },
        onError:(e: FirebaseError)=> {
            alert(e.code)
        }
    })

    return (
        <View style={shared.pageContainer}>
            <PageLogoHeading asHeader size={18} title={"File caricato"}/>
            <DashLine/>
            <View style={{
                marginTop: normalize(24),
                flex: 1,
                overflow:'scroll'
            }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.description}>Accedi al tuo account per visualizzare le proprie tue mappe.</Text>
                </View>
                <Formik initialValues={{
                    email: "",
                    password: "",
                }} onSubmit={(values) => {
                    signInMutation.mutate(values);
                }}>
                    {({handleChange, handleBlur, values, handleSubmit}) => (
                        <>
                            <View style={styles.inputContainer}>
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"/>
                                <View style={styles.inputSpacer}/>
                                <Input value={values.password} onChangeText={handleChange('password')}
                                       onBlur={handleBlur('password')} placeholder="Password"
                                       secureTextEntry={!showPassword}/>
                                <TouchableOpacity style={{
                                    alignSelf: 'flex-end',
                                    marginVertical: normalize(8)
                                }} onPress={() => setShowPassword((p: boolean) => !p)}>
                                    <Text style={{
                                        color: "#ffffff",
                                        fontSize: normalize(12)
                                    }}>{showPassword ? "Hide" : "Show"} Password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    disabled={signInMutation.isPending}
                                    isLoading={signInMutation.isPending}
                                    text={"Login"} onPress={(e: any) => handleSubmit(e)}/>
                            </View>
                        </>
                    )}
                </Formik>
                <View style={styles.registerWrapper}>
                    <Text style={styles.registerDescription}>Don't have an account?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> router.replace('/auth/register')}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
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
        marginVertical: normalize(16),
    },
    registerWrapper: {
        height: normalize(50),
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        gap:normalize(8)
    },
    registerDescription: {
        color: '#fff',
    },
    registerText: {
        color: "#0066FF",
        textDecorationLine:'underline'
    }
})

export default LoginPage;
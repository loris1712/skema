import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "@/firebaseConfig";

import { useRouter } from 'expo-router';
import {useState} from "react"
import {Text, View} from "@/components/Themed";
import shared from "@/styles/shared";
import {normalize} from "@/utils/normalize";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import DashLine from "@/atoms/DashedLine";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Formik} from "formik";
import Input from "@/atoms/TextInput";
import PrimaryButton from "@/atoms/PrimaryButton";
import {useMutation} from "@tanstack/react-query";

const RegisterPage = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const createAccountMutation = useMutation({
        mutationKey: ["createAccount"],
        mutationFn: async (payload: any) => {
            const userCredentials = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            if (userCredentials.user) {
                await updateProfile(userCredentials.user, {
                    displayName: payload.username
                });
            }
        },
        onSuccess: () => {
            alert("Account created successfully!");
            router.push('/upload')
        },
        onError: (e) => {
            console.error(e);
            alert("An error occurred!");
        }
    })

    return (
        <View style={shared.pageContainer}>
            <PageLogoHeading asHeader size={18} title={"File caricato"}/>
            <DashLine/>
            <View style={{
                marginTop: normalize(24),
                flex: 1,
            }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Crea Account</Text>
                    <Text style={styles.description}>Crea un account per salvare
                        e accedere facilmente alle
                        tue mappe in qualsiasi momento.</Text>
                </View>
                <Formik
                    initialValues={{email: "", password: "", username: ""}}
                    onSubmit={(values) => {
                        createAccountMutation.mutate(values);
                    }}>
                    {({handleBlur, handleChange, values, handleSubmit}) => (
                        <>
                            <View style={styles.inputContainer}>
                                <Input
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    placeholder="Username" keyboardType="default" autoCapitalize="none"/>
                                <View style={styles.inputSpacer}/>
                                <Input onChangeText={handleChange('email')}
                                       value={values.email}
                                       onBlur={handleBlur('email')} placeholder="Email" keyboardType="email-address"
                                       autoCapitalize="none"/>
                                <View style={styles.inputSpacer}/>
                                <Input value={values.password} onChangeText={handleChange('password')}
                                       onBlur={handleBlur('password')} placeholder="Password" secureTextEntry={!showPassword}/>
                                <TouchableOpacity style={{
                                    alignSelf:'flex-end',
                                    marginVertical: normalize(8)
                                }} onPress={()=> setShowPassword((p:boolean) => !p)}>
                                    <Text style={{color: "#ffffff", fontSize: normalize(12)}}>{showPassword ? "Hide" : "Show"} Password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    isLoading={createAccountMutation.isPending}
                                    disabled={createAccountMutation.isPending} text={"Crea account"}
                                               onPress={(e) => {
                                                   handleSubmit(e as any)
                                               }}/>
                            </View>
                        </>
                    )}
                </Formik>
                <View style={styles.registerWrapper}>
                    <Text style={styles.registerDescription}>Don't have an account?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> router.replace('/auth/login')}>
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
        marginBottom: normalize(16),
        marginTop: normalize(32)
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

export default RegisterPage;
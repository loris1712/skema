import shared from "@/styles/shared";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import DashLine from "@/atoms/DashedLine";
import {normalize} from "@/utils/normalize";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {getAuth} from "firebase/auth";
import PrimaryButton from "@/atoms/PrimaryButton";
import {useRouter} from "expo-router";


const AccountIndex = () => {
    const {removeItem} = useAsyncStorage('user-id');
    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();


    return (
        <View style={shared.pageContainer}>
            <PageLogoHeading size={18} title={"Account"} asHeader/>
            <DashLine/>
            <View style={{
                marginTop: normalize(24),
                paddingHorizontal: normalize(16),
                flex: 1,
            }}>
                {!!user ? <View>
                    <View style={{
                        gap: normalize(8)
                    }}>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: normalize(32)
                        }}>Email</Text>
                        <Text style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: normalize(18)
                        }}>{user?.email}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Delete Account", "Your account will be deleted permanently and any data will be lost.", [
                                {
                                    text: "Cancel",
                                    onPress: () => {
                                    }
                                },
                                {
                                    text: "Delete",
                                    onPress: () => {
                                        user?.delete().then(() => {
                                            removeItem().then(() => {
                                                Alert.alert("Account Deleted", "Your account has been deleted successfully.", [
                                                    {
                                                        text: "OK",
                                                    }
                                                ]);
                                                router.push('/upload')
                                            })
                                        }).catch((e)=> {
                                            Alert.alert("Error", 'Account delete required a recent login.', [{
                                                text: "Login",
                                                onPress: ()=> router.push('/auth/login')
                                            }])
                                        })
                                    }
                                }
                            ])
                        }}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: '#FF2D5533',
                            borderRadius: normalize(8),
                            height: normalize(48),
                            marginTop: normalize(32),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            color: '#FF2D55',
                            fontSize: normalize(16)
                        }}>Delete Account</Text>
                    </TouchableOpacity>
                </View> : <PrimaryButton text={"Login"} onPress={() => router.push("/auth/login")}/>}
            </View>
        </View>
    )
}

export default AccountIndex;
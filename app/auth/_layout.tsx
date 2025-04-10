import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const AuthLayout = () => {

    return (
        <AppClientQuery>
            <SafeAreaView style={{ flex: 1 }}>
            <Stack initialRouteName={"index"}>
                <Stack.Screen
                    name={'index'}
                    options={{
                        headerShown: false,
                        presentation: 'modal'
                    }}
                />
                <Stack.Screen
                    name={'login'}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={'register'}
                    options={{
                        headerShown: false,
                        presentation: 'modal'
                    }}
                />
            </Stack>
            </SafeAreaView>
        </AppClientQuery>
    );

}
export default AuthLayout;
import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";

const AuthLayout = () => {

    return (
        <AppClientQuery>
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
        </AppClientQuery>
    );

}
export default AuthLayout;
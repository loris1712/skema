import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";

const AuthLayout = () => {

    return (
        <AppClientQuery>
            <Stack initialRouteName={"login"}>
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
                    }}
                />
            </Stack>
        </AppClientQuery>
    );

}
export default AuthLayout;
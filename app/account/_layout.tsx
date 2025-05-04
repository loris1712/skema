import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const AccountLayout = () => {

    return (
        <AppClientQuery>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack initialRouteName={"index"}>
                    <Stack.Screen
                        name={'index'}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
            </SafeAreaView>
        </AppClientQuery>
    );

}
export default AccountLayout;
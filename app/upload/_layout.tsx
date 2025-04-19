import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "react-native";

const UploadLayout = () => {

    return (
        <AppClientQuery>
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle="light-content" />
                <Stack>
                    <Stack.Screen
                        name={'index'}
                        options={{
                            headerTitle: 'Upload Documents',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name={'completed'}
                        options={{
                            headerTitle: 'Completed',
                            headerShown: false,
                        }}
                    />
                </Stack>
            </SafeAreaView>
        </AppClientQuery>
    );

}
export default UploadLayout;
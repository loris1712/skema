import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const UploadLayout = () => {

    return (
        <AppClientQuery>
            <SafeAreaView style={{flex: 1}}>
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
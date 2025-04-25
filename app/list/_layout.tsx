import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const ListLayout = () => {

    return (
        <AppClientQuery>
            <SafeAreaView style={{flex: 1}}>
                <Stack>
                    <Stack.Screen
                        name={'index'}
                        options={{
                            headerTitle: 'My Uploads',
                            headerShown: false,
                        }}
                    />
                </Stack>
            </SafeAreaView>
        </AppClientQuery>
    );

}
export default ListLayout;
import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";

const ListLayout = () => {

    return (
        <AppClientQuery>
            <Stack>
                <Stack.Screen
                    name={'index'}
                    options={{
                        headerTitle: 'My Uploads',
                        headerShown: false,
                    }}
                />
            </Stack>
        </AppClientQuery>
    );

}
export default ListLayout;
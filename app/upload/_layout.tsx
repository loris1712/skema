import AppClientQuery from "@/components/AppQueryClient";
import {Stack} from "expo-router";

const UploadLayout = () => {

    return (
      <AppClientQuery>
        <Stack>
          <Stack.Screen
            name={'index'}
            options={{
              headerTitle: 'Upload Documents',
              headerShown: false,
            }}
          />
        </Stack>
      </AppClientQuery>
    );

}
export default UploadLayout;
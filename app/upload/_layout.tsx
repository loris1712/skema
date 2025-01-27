import {Stack} from "expo-router";

const UploadLayout = () => {

    return (
        <Stack>
            <Stack.Screen name={"index"}
                          options={{
                              headerTitle:"Upload Documents",
                          }}/>
        </Stack>
    )

}
export default UploadLayout;
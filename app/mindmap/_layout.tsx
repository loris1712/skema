import {Stack} from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";

const MindMapLayout = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack>
                <Stack.Screen
                    name={'index'}
                    options={{
                        headerTitle: 'Upload Documents',
                        headerShown: false,
                    }}
                />
            </Stack>
        </SafeAreaView>
    );
};

export default MindMapLayout;

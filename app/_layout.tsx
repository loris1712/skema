import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaView, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import AppClientQuery from '@/components/AppQueryClient';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync().then(console.log);

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const router = useRouter();
    const onboardingAsync = useAsyncStorage('onboarding');

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        (async () => {
            const onboardingCompleted = await onboardingAsync.getItem();
            if (loaded) {
                SplashScreen.hideAsync().then(console.log);
                if (onboardingCompleted === 'completed') {
                    router.push('/list');
                } else {
                    router.push('/onboarding');
                }
            }
        })();
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <RootLayoutNav />
            </View>
        </SafeAreaView>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <AppClientQuery>
            <ThemeProvider value={DarkTheme}>
                <Stack initialRouteName="onboarding">
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                    <Stack.Screen name="upload" options={{ headerShown: false }} />
                    <Stack.Screen name="list" options={{ headerShown: false }} />
                    <Stack.Screen name="mindmap" options={{ headerShown: false }} />
                    <Stack.Screen name="account" options={{ headerShown: false }} />
                </Stack>
            </ThemeProvider>
        </AppClientQuery>
    );
}

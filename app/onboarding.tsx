import { View, Text } from '@/components/Themed';
import { StyleSheet, Image, Dimensions } from "react-native"

import shared from '@/styles/shared';
import FeatureSwiper from "@/components/FeatureSwiper";
import {useRouter} from "expo-router";

const { width } = Dimensions.get("window")


const OnboardingPage = () => {

    const router = useRouter();

    return (
        <View style={{...shared.pageContainer}}>
            <FeatureSwiper onComplete={()=> {
                router.push('/auth')
            }}/>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 48,
    },
    logoContainer: {
        width: width * 0.15,
        height: width * 0.15,
        marginTop: 20,
    },
    logo: {
        width: "100%",
        height: "100%",
        tintColor: "#0066FF",
    },
    imageContainer: {
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    featureImage: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        color: "#FFFFFF",
        marginTop: 20,
    },
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#333333",
    },
    activeDot: {
        backgroundColor: "#0066FF",
    },
})




export default OnboardingPage
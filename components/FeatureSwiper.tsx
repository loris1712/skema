import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Platform } from "react-native"
import Swiper from "react-native-swiper"
import {normalize} from "@/utils/normalize";

const { width } = Dimensions.get("window")

interface FeatureItem {
    id: number
    title: string
    image: string
}

const features: FeatureItem[] = [
    {
        id: 1,
        title: "Feature 1",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20at%2007.50.37-FgHNiLpptLAcPT2IbRilXxrkVJVzTx.png",
    },
    {
        id: 2,
        title: "Feature 2",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20at%2007.50.37-FgHNiLpptLAcPT2IbRilXxrkVJVzTx.png",
    },
    {
        id: 3,
        title: "Feature 3",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20at%2007.50.37-FgHNiLpptLAcPT2IbRilXxrkVJVzTx.png",
    },
]

interface FeatureSwiperProps {
    onComplete: () => void
}

export default function FeatureSwiper({ onComplete }: FeatureSwiperProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={onComplete} activeOpacity={0.7}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.logoContainer}>

            </View>

            <Swiper
                style={styles.wrapper}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                loop={false}
                onIndexChanged={(index) => {
                    if (index === features.length - 1) {
                        setTimeout(onComplete, 3000);
                    }
                }}
            >
                {features.map((feature) => (
                    <View key={feature.id} style={styles.slide}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: feature.image }} style={styles.featureImage} resizeMode="cover" />
                        </View>
                        <Text style={styles.title}>{feature.title}</Text>
                    </View>
                ))}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    skipButton: {
        position: "absolute",
        top: Platform.OS === "ios" ? normalize(50) : normalize(20),
        right: normalize(20),
        zIndex: 10,
        padding: normalize(8),
    },
    skipText: {
        color: "#FFFFFF",
        fontSize: normalize(16),
        fontWeight: "500",
    },
    wrapper: {},
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: normalize(80), // Space for the Get Started button
    },
    logoContainer: {
        width: normalize(width * 0.15),
        height: normalize(width * 0.15),
        position: "absolute",
        top: Platform.OS === "ios" ? normalize(50) : normalize(20),
        left: normalize(20),
        zIndex: normalize(10),
    },
    logo: {
        width: "100%",
        height: "100%",
        tintColor: "#0066FF",
    },
    imageContainer: {
        width: normalize(width * 0.85),
        height: normalize(width * 0.85),
        borderRadius: normalize(24),
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        marginBottom: normalize(20),
    },
    featureImage: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: normalize(28),
        fontWeight: "600",
        color: "#FFFFFF",
        marginTop: normalize(20),
    },
    dot: {
        width: normalize(8),
        height: normalize(8),
        borderRadius: normalize(4),
        backgroundColor: "#333333",
        marginLeft: normalize(4),
        marginRight: normalize(4),
    },
    activeDot: {
        width: normalize(8),
        height: normalize(8),
        borderRadius: normalize(4),
        backgroundColor: "#0066FF",
        marginLeft: normalize(4),
        marginRight: normalize(4),
    },
    getStartedButton: {
        position: "absolute",
        bottom: normalize(40),
        left: normalize(20),
        right: normalize(20),
        backgroundColor: "#0066FF",
        paddingVertical: normalize(16),
        borderRadius: normalize(12),
        alignItems: "center",
    },
    getStartedText: {
        color: "#FFFFFF",
        fontSize: normalize(18),
        fontWeight: "600",
    },
})


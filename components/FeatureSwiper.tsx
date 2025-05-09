import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Platform } from "react-native"
import Swiper from "react-native-swiper"
import {normalize} from "@/utils/normalize";

const { width } = Dimensions.get("window")

interface FeatureItem {
    id: number
    title: string
    subtitle: string
}

const features: FeatureItem[] = [
    {
        id: 1,
        title: "Trasforma la tua sbobina in skema!",
        subtitle:"Carichi il testo, ottieni uno schema logico pronto da studiare. -70% tempo. +100% chiarezza. Taglia il superfluo, collega i concetti, ti dà la base per il tuo skema digitale! Personalizza tutto. Studia meglio.",
    },
    {
        id: 2,
        title: "Trascrizione Audio Intelligente",
        subtitle: "Rivoluzionaria per la sua semplicità d’uso, Skema parte da una registrazione audio e ti offre due opzioni: una trascrizione sintetica, chiara e immediata, oppure una versione tecnica, arricchita con fonti accademiche e contenuti di approfondimento.",
    },
    {
        id: 3,
        title: "Ottimizzato Per Chi Studia Davvero",
        subtitle:"Skema è pensato per studenti, ricercatori e chiunque abbia bisogno di contenuti chiari e pronti da ripetere. I testi generati sono suddivisi in paragrafi logici, con una formattazione pulita che facilita la lettura e la memorizzazione. Che tu stia preparando un esame, una presentazione o solo ripassando, Skema ti aiuta a risparmiare tempo e ad avere tutto sotto controllo.",
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
                        <Text style={styles.title}>{feature.title}</Text>
                        <Text style={styles.subtitle}>{feature.subtitle}</Text>
                        </View>
                ))}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? normalize(50) : normalize(20),
    right: normalize(20),
    zIndex: 10,
    padding: normalize(8),
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: '500',
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: normalize(80), // Space for the Get Started button
  },
  logoContainer: {
    width: normalize(width * 0.15),
    height: normalize(width * 0.15),
    position: 'absolute',
    top: Platform.OS === 'ios' ? normalize(50) : normalize(20),
    left: normalize(20),
    zIndex: normalize(10),
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: '#0066FF',
  },
  imageContainer: {
    width: normalize(width * 0.85),
    height: normalize(width * 0.85),
    borderRadius: normalize(24),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(20),
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: normalize(22),
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: normalize(20),
    textAlign: 'center',
    paddingHorizontal: normalize(16)
  },
  subtitle: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#ffffffb5',
    marginTop: normalize(20),
    textAlign: 'center',
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#333333',
    marginLeft: normalize(4),
    marginRight: normalize(4),
  },
  activeDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#0066FF',
    marginLeft: normalize(4),
    marginRight: normalize(4),
  },
  getStartedButton: {
    position: 'absolute',
    bottom: normalize(40),
    left: normalize(20),
    right: normalize(20),
    backgroundColor: '#0066FF',
    paddingVertical: normalize(16),
    borderRadius: normalize(12),
    alignItems: 'center',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: normalize(18),
    fontWeight: '600',
  },
});


import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {Link} from "expo-router"

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>PDF Mind Map Creator</Text>

            <TouchableOpacity style={styles.button}>
                <Link href={{pathname: "/upload"}}>
                    <Text style={styles.buttonText}>New Document</Text>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Saved Documents</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})


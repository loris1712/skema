import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { useRouter } from "expo-router"


const UploadPage = () => {
    const [selectedDocument, setSelectedDocument] = useState<any | null>(null)
    const router = useRouter()

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" })
            const {assets = []} = result;
            setSelectedDocument(assets?.[0])
            console.log(result)
        } catch (err) {
            console.error("Error picking document:", err)
        }
    }

    const processDocument = () => {
        router.push({
            pathname: "/",
            params: { documentName: selectedDocument.name },
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickDocument}>
                <Text style={styles.buttonText}>Select PDF</Text>
            </TouchableOpacity>
            {selectedDocument && !!selectedDocument?.name && (
                <View>
                    <Text style={styles.selectedText}>Selected: {selectedDocument.name}</Text>
                    <TouchableOpacity style={styles.button} onPress={processDocument}>
                        <Text style={styles.buttonText}>Process Document</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    selectedText: {
        marginVertical: 10,
        fontSize: 16,
    },
})



export default UploadPage
import { TextInput, type TextInputProps, StyleSheet } from "react-native"

interface InputProps extends TextInputProps {
    style?: object
}

const  Input = ({ style, ...props }: InputProps) => {
    return <TextInput style={[styles.input, style]} placeholderTextColor="#666" {...props} />
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "white",
        fontSize: 16,
    },
})

export default Input;
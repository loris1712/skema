import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = (key: string) => {

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
        }catch (e) {
            return null;
        }
    }

    const getData = async (key: string) => {
        return await AsyncStorage.getItem(key);
    }

    return {storeData, getData};
}
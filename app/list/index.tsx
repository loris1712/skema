import {useQuery} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import shared from "@/styles/shared";
import {View} from "@/components/Themed";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import React from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {normalize} from "@/utils/normalize";
import {getUserMapList} from "@/services/supabase";
import PrimaryButton from "@/atoms/PrimaryButton";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import DashedLine from "@/atoms/DashedLine";


const MyList = () => {

    const router = useRouter();
    const {getItem} = useAsyncStorage('user-id');


    const {data: list, isLoading} = useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const userId = await getItem();
            console.log({userId})
            return await getUserMapList(userId ?? "");
        },
        refetchOnMount: true
    });

    return (
        <View style={{...shared.pageContainer}}>
            <View style={styles.headerContainer}>
                <PageLogoHeading title="My List"/>
            </View>
            <DashedLine />
            <View style={{flex: 1, gap: normalize(16)}}>
                {
                    isLoading && <ActivityIndicator size="large"/>
                }
                <FlatList
                    contentContainerStyle={{
                        height:'100%',
                    }}
                    data={list}
                    keyExtractor={(it: any) => it.id}
                    renderItem={({item, index}: any) => {
                        return (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                router.push(`/mindmap?file=${item.fileHash}`);
                            }} style={styles.fileListItemWrapper}>
                                <Text style={styles.listName}>{index + 1} - </Text> <Text style={styles.listName}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
            </View>
            <View style={{
                paddingHorizontal: normalize(8)
            }}>
                <PrimaryButton text={"New Upload"} onPress={() => {
                    router.push('/upload')
                }}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        marginVertical: normalize(16),
    },
    uploadButtonsWrapper: {
        flex: 1,
    },
    fileListItemWrapper: {
        paddingVertical: normalize(16),
        flexDirection: 'row',
        gap: normalize(8),
    },
    listName: {
        color: 'white',
        fontSize: normalize(24),
        fontWeight: 'bold',
    }
});


export default MyList;
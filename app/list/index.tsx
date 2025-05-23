import {useQuery} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import shared from "@/styles/shared";
import {View} from "@/components/Themed";
import PageLogoHeading from "@/atoms/PageLogoHeading";
import React, {useEffect} from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, Linking, Alert} from "react-native";
import {normalize} from "@/utils/normalize";
import {getUserMapList} from "@/services/supabase";
import PrimaryButton from "@/atoms/PrimaryButton";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import DashedLine from "@/atoms/DashedLine";
import dayjs from 'dayjs';

const MyList = () => {

    const router = useRouter();
    const {getItem} = useAsyncStorage('user-id');


    const {data: list, isLoading, isFetching, refetch} = useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const userId = await getItem();
            return await getUserMapList(userId ?? "");
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        refetch().then().catch()
    }, []);

    return (
        <View style={{...shared.pageContainer}}>
            <PageLogoHeading title="I miei caricamenti"/>
            <View style={{flex: 1, gap: normalize(0), marginTop: normalize(10)}}>
                <DashedLine/>
                <FlatList
                    refreshing={isFetching || isLoading}
                    onRefresh={()=> refetch()}
                    data={list}
                    keyExtractor={(it: any) => it.id}
                    ItemSeparatorComponent={() => <DashedLine/>}
                    renderItem={({item}: any) => {
                        return (
                            <>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    router.push(`/upload/completed?file=${item.fileHash}`);
                                }} style={styles.fileListItemWrapper}>
                                    <Text numberOfLines={1} style={styles.listName}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: normalize(12),
                                        fontWeight: '500',
                                        flex: 1,
                                        color: '#fff'
                                    }}>{dayjs(item?.createdAt).format("DD-MM-YYYY")}</Text>
                                </TouchableOpacity>
                                <DashedLine/>
                            </>
                        )
                    }}/>

            </View>
            <View style={{
                paddingHorizontal: normalize(8)
            }}>
                <PrimaryButton text={"Carica"} onPress={() => {
                    router.push('/upload')
                }}/>
                <TouchableOpacity
  onPress={async () => {
    const url = 'mailto:skeema.app@gmail.com';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Scrivici", "skeema.app@gmail.com");
    }
  }}
>
  <View style={{ width: '100%', padding: 20 }}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Richiedi supporto</Text>
  </View>
</TouchableOpacity>

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
        flexDirection: 'row',
        gap: normalize(8),
        height: normalize(74),
        alignItems: 'center'
    },
    listName: {
        color: 'white',
        fontSize: normalize(20),
        fontWeight: 'bold',
        flex: 1,
    }
});


export default MyList;
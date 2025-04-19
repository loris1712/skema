import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';

import {View} from '@/components/Themed';
import shared from '@/styles/shared';
import PageLogoHeading from '@/atoms/PageLogoHeading';
import {normalize} from '@/utils/normalize';
import PrimaryButton from '@/atoms/PrimaryButton';
import DashedLine from '@/atoms/DashedLine';
import SecondaryButton from '@/atoms/SecondaryButton';
import {useQuery} from "@tanstack/react-query";
import {getFileMindMap} from "@/services/supabase";

const CompletedPage = () => {
    const router = useRouter();
    const {file} = useLocalSearchParams();

    const {data, isLoading} = useQuery({
        queryKey: ['uploadedFile', file],
        enabled: !!file.length,
        queryFn: async () => {
            const existingMindMap = await getFileMindMap(file?.toString());
            return existingMindMap?.[0] ?? null;
        }
    });

    const isAudio = data?.extension === "audio";

    console.log({isAudio});

    return (
        <View style={{...shared.pageContainer}}>
            <PageLogoHeading asHeader title="Completato"/>
            <DashedLine/>
            {
                isLoading && <ActivityIndicator/>
            }

<View style={styles.containerText}>
            <Text style={styles.title}>File pronto!</Text>
            <Text style={styles.message}>
                Il tuo file è pronto per essere visualizzato o scaricato.
            </Text>
        </View>

            <View style={styles.uploadButtonsWrapper}>
                {isAudio && <Text style={{
                    color: "#fff",
                    fontSize: normalize(18)
                }}>{data?.mindMap?.text}</Text>}
            </View>

            {!isLoading && (
                <View style={styles.buttonWrapper}>
                    <PrimaryButton
                        isWhite
                        text="Cancella"
                        onPress={() => {
                            router.replace('/upload');
                        }}
                    />

                    {!isAudio && (
                        <View style={styles.gridButtonsWrapper}>
                            <View style={styles.gridButton}>
                                <SecondaryButton
                                    text="Visualizza"
                                    onPress={() => {
                                        router.push(`/mindmap?file=${file}`);
                                    }}
                                />
                            </View>
                            <View style={styles.gridButton}>
                                <PrimaryButton
                                    text="Scarica"
                                    onPress={() => {
                                        router.push(`/mindmap?file=${file}`);
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: normalize(120),
        justifyContent: 'center',
        marginVertical: normalize(16),
    },
    uploadButtonsWrapper: {
        flex: 1,
    },
    buttonWrapper: {
        gap: normalize(16),
    },
    gridButtonsWrapper: {
        flexDirection: 'row',
        gap: normalize(8),
        marginInline: normalize(-8),
    },
    gridButton: {
        flex: 1,
        paddingInline: normalize(-8),
    },
    containerText: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#007AFF',
        fontSize: normalize(28),
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        color: 'white',
        fontSize: normalize(16),
        textAlign: 'center',
    },
});

export default CompletedPage;

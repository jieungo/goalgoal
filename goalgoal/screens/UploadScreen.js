import { useRoute } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, TextInput, Image, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import UseCamera from '../components/UseCamera';

function UploadScreen() {
    const route = useRoute();
    const {res} = route.params || {};
    const {width} = useWindowDimensions();

    return (
        <View style={styles.block}>
            {res ? (
                <Image
                    source={{uri: res.assets[0]?.uri}}
                    style={[styles.image, {height: width}]}
                    resizeMode="cover"
                />
            ):(
                <UseCamera />
            )}
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder="오늘의 소감을 적어주세요 :)"
                textAlignVertical='top'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16,
    }
})

export default UploadScreen;
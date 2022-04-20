import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function DateHead({date}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const {top} = useSafeAreaInsets();

    const formatted = `${year}년 ${month}월 ${day}일`;

    return (
        <>
            <View style={{height: top}} />
            <StatusBar />
            <View style={styles.block}>
                <Text style={styles.dateText}>{formatted}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    dateText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    block: {
        padding: 16,
    }
})

export default DateHead;
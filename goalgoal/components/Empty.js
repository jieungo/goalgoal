import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Empty() {
    return (
        <View style={styles.block}>
            <Text style={styles.description}>할일을 추가해주세요.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 24,
        color: '#FF7C44',
    }
})

export default Empty;
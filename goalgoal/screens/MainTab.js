import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useUserContext } from '../contexts/UserContext';

function MainTab() {
    const {user} = useUserContext();
    return (
        <View style={styles.block}>
            {user.photoURL && (
                <Image
                    source={{uri: user.photoURL}}
                    style={{width: 130, height: 130, marginBottom: 20}}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.text}>Hello, {user.displayName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default MainTab;
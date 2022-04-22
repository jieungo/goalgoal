import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import { signOut } from '../lib/auth';

function LogoutButton() {
    const {setUser} = useUserContext();

    const onLogout = async () => {
        await signOut();
        setUser(null);
    }

    return (
        <Pressable
            onPress={onLogout}
            style={({pressed}) => [
                styles.item,
                pressed && Platform.select({ios: {opacity: 0.5}}),
            ]}
            android_ripple={{color: '#eee'}}>
                <Text style={styles.text}>로그아웃</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    item: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7C44',
        marginHorizontal: 30,
        borderRadius: 20,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default LogoutButton;
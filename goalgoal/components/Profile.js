import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUser } from '../lib/users';
import Avatar from './Avatar';
import { useUserContext } from '../contexts/UserContext';
import LogoutButton from './LogoutButton';
import CalendarView from './CalendarView';

function Profile({userId}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(userId).then(setUser);
        console.log(userId)
    }, []);


    return (
        <View style={styles.block} >
            {user && (
                <>
                    <View style={styles.userInfo}>
                        <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
                        <Text style={styles.username}>{user.displayName}</Text>
                    </View>
                    <CalendarView />
                    <LogoutButton />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
    },
    block: {
        flex: 1,
    },
    userInfo: {
        paddingTop: 80,
        paddingBottom: 64,
        alignItems: 'center',
    },
    username: {
        marginTop: 8,
        fontSize: 24,
        color: '#424242',
    }
})

export default Profile;
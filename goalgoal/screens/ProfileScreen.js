import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import { useUserContext } from '../contexts/UserContext';
import {View, Text, StyleSheet} from 'react-native'

function ProfileScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const {user} = useUserContext();

    useEffect(() => {
        navigation.setOptions({
            title: user.displayName,
        })
        console.log(`user:${user}`)
    },[navigation, user]);

    return (
        <Profile userId={user.id} style={styles.firstWrapper} />
    )
}

const styles = StyleSheet.create({

})

export default ProfileScreen;
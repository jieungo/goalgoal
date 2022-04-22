import React from 'react';
import {ActivityIndicator, View, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';

function SignButtons({isSignUp, onSubmit, loading}) {
    const navigation = useNavigation();

    const primaryTitle = isSignUp ? '회원가입' : '로그인';
    const secondaryTitle = isSignUp ? '로그인' : '회원가입';

    const onSecondaryButtonPress = () => {
        if (isSignUp) {
            navigation.goBack();
        } else {
            navigation.push('SignIn', {isSignUp:true});
        }
    }

    if (loading) {
        return (
                <ActivityIndicator size={32} color="#FF7C44" style={styles.spinner} />
        )
    }

    return (
        <View style={styles.button}>
            <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
            <CustomButton title={secondaryTitle} theme="secondary" onPress={onSecondaryButtonPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 60,
    },
    spinner: {
        marginTop: 60,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SignButtons;
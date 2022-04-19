import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';

const Buttons = styled.View`
    margin-top: 60;
`;

const Spinner = styled.View`
    margin-top: 60;
    height: 100;
    justify-content: center;
    align-items: center;
`;

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
            <Spinner>
                <ActivityIndicator size={32} color="#FF7C44" />
            </Spinner>
        )
    }

    return (
        <Buttons>
            <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
            <CustomButton title={secondaryTitle} theme="secondary" onPress={onSecondaryButtonPress}
            />
        </Buttons>
    )
}

export default SignButtons;
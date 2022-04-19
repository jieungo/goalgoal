import React, {useState} from 'react';
import {View, Image, Keyboard, KeyboardAvoidingView, Platform, Alert, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import { signIn, signUp } from '../lib/auth';
import {getUser} from '../lib/users';


function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params || {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState();
    const changeInputHandler = (input) => (value) => {
        setForm({...form, [input]: value});
    };
    const onSubmit = async () => {
        Keyboard.dismiss();
        const {email, password, confirmPassword} = form;
        if (isSignUp && password !== confirmPassword) {
            Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
            return;
        }
        const info = {email, password};
        setLoading(true);
        try {
            const {user} = isSignUp ? await signUp(info) : await signIn(info);
            const profile = await getUser(user.uid);
            if (!profile) {
                navigation.navigate('Welcome', {uid: user.uid});
            } else {
                // 구현 예정
            }
        } catch (e) {
            const message = {
                'auth/email-already-in-use': '이미 가입된 이메일입니다.',
                'auth/wrong-password': '잘못된 비밀번호입니다.',
                'auth/user-not-found': '존재하지 않는 계정입니다.',
                'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
            };
            const msg = message[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
            Alert.alert('실패', msg);
        } finally {
            setLoading(false);
        }
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <KeyboardAvoidingView style={styles.avoidWrapper} behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullScreen}>
            <Image style={styles.logo}
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
            />
            <View style={styles.form}>
                <SignForm
                    isSignUp={isSignUp}
                    onSubmit={onSubmit}
                    form={form}
                    changeInputHandler={changeInputHandler}
                    />
                <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} loading={loading} />
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    avoidWrapper: {
        flex: 1,
    },
    fullScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginTop: 50,
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    logo: {
        height: '30%',
        width: '80%',
    }

})

export default SignInScreen;
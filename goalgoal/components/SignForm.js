
import React, {useRef} from 'react';
import BorderInput from '../components/BorderInput';

function SignForm({isSignUp, onSubmit, form, changeInputHandler}) {
    
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    return (
    <>
        <BorderInput 
        hasMarginBottom placeholder="이메일" 
        value={form.email} 
        onChangeText={changeInputHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        />
        <BorderInput 
            placeholder="비밀번호"
            hasMarginBottom={isSignUp} 
            value={form.password} 
            onChangeText={changeInputHandler('password')}
            ref={passwordRef}
            returnKeyType={isSignUp ? 'next' : 'done'}
            blurOnSubmit={false}
            secureTextEntry={true}
            textContentType="oneTimeCode"
            clearButtonMode="while-editing"
            onSubmitEditing={() => {
                if (isSignUp) {
                    confirmPasswordRef.current?.focus();
                } else {
                    onSubmit();
                }
            }}
            />
        {isSignUp && 
        <BorderInput 
        placeholder="비밀번호 확인" 
        value={form.confirmPassword}
        onChangeText={changeInputHandler('confirmPassword')}
        ref={confirmPasswordRef}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        secureTextEntry={true}
        textContentType="oneTimeCode"
        clearButtonMode="while-editing"
        />}
    </>
    )
}

export default SignForm;


import React from 'react';
import {View, Pressable, Text, Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';


function CustomButton({onPress, title, hasMarginBottom, theme}) {
    const isPrimary = theme === 'primary';
    return(
        <View style={[styles.block, hasMarginBottom && styles.margin]}>
            <Pressable 
                onPress={onPress}
                style={({pressed}) => [
                    styles.wrapper,
                    isPrimary && styles.primaryWrapper,
                    Platform.OS === 'ios' && pressed && {opacity: 0.5}
                ]}
                android_ripple={{color: isPrimary ? '#ffffff' : '#FF7C44'}}>
            <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
            </Pressable>
        </View>
    )
}

CustomButton.defaultProps = {
    theme: 'primary',
}

const styles = StyleSheet.create({
    block: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    wrapper: {
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    margin: {
        marginBottom: 20,
    },
    primaryWrapper: {
        backgroundColor: '#FF7C44',
    },
    primaryText: {
        color: 'white',
    },
    secondaryText: {
        color: '#FF7C44',
    }
})

export default CustomButton;
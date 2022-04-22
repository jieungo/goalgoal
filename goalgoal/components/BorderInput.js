import React from 'react';
import { TextInput,StyleSheet } from 'react-native';

function BorderInput({hasMarginBottom, ...rest}, ref) {
    return (
        <TextInput style={[styles.input, hasMarginBottom && styles.margin]}
        ref={ref}
        {...rest}
        />       
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 16,
        borderRadius: 20,
        height: 50,
        backgroundColor: 'white',
        fontSize: 16,
    },
    margin: {
        marginBottom: 20,
    }
})

export default React.forwardRef(BorderInput);
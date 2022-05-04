import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

function AddTodo({onInsert, active}) {
    const [text, setText] = useState('');
    const inputRef = useRef();
    const onPress = () => {
        onInsert(text);
        setText('');
        Keyboard.dismiss();
        inputRef.current.focus();  
    };

    return (
        <View style={styles.block}>
            {!active && (
                <>
                <TextInput 
                    placeholder='할일을 입력하세요.' 
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={onPress}
                    returnKeyType="done"
                    ref={inputRef}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                        <View style={styles.addIcon}>
                            <Icon name="add" size={30}/>
                        </View>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        height: 60,
        paddingHorizontal: 16,
        borderColor: '#bdbdbd',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        fontSize: 16,
        paddingVertical: 8,
    },
    addIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
    }
})

export default AddTodo;
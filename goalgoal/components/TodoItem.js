import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

function TodoItem({id, text, done, onToggle, onRemove}) {
    return (
        <View style={[styles.item, done && styles.doneItem]}>
            <TouchableOpacity onPress={() => onToggle(id)} style={styles.todoWrapper}>
                { done ? (
                    <Icon name="check-circle" size={24} color={'white'} /> 
                    )
                    : (
                    <Icon name="circle" size={24} color={'white'} />
                    )
                }
                    <Text style={[styles.text, done && styles.doneText]}>{text}</Text>
            </TouchableOpacity>
                { !done ?
                    <TouchableOpacity onPress={() => onRemove(id)}>
                        <Icon name="delete" size={24} color={'red'} />
                    </TouchableOpacity>
                    :
                    <View style={styles.removePlaceholder} />
                }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        margin: 20,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#E7E7EA'
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        paddingLeft: 16,
    },
    doneText: {
        color: 'white',
        paddingLeft: 16,
    },
    doneItem: {
        backgroundColor: '#FF7C44'
    },
    todoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removePlaceholder: {
        width: 24,
        height: 24,
    }
})

export default TodoItem;
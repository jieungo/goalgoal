import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Text, Pressable, TouchableOpacity } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import DateHead from '../components/DateHead';
import AddTodo from '../components/AddTodo';
import Empty from '../components/Empty';
import TodoList from '../components/TodoList';
import { useNavigation } from '@react-navigation/native';
import { createTodo, getTodos } from '../lib/todos';
import { useUserContext } from '../contexts/UserContext';

function TodoScreen() {
    const today = new Date();
    const [todos, setTodos] = useState([]);
    const [active, setActive] = useState(false);
    const navigation = useNavigation();
    const {user} = useUserContext();

    useEffect(() => {
        getTodos().then(setTodos);
    }, [todos]);
    


    const onInsert = text => {
        const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        const todo = {
            id: nextId,
            text,
            done: false,
            date: new Date().toISOString(),
        }
        setTodos(todos.concat(todo));
    }

    const onRemove = id => {
        const nextTodos = todos.filter(todo => todo.id !== id);
        setTodos(nextTodos);
    }

    const onToggle = id => {
        const nextTodos = todos.map(todo =>
            todo.id === id ? {...todo, done: !todo.done} : todo, )
        setTodos(nextTodos);
    }
    
    useEffect(() => {
        function isEverythingDone() {
            const todoArray = [];
            const newTodo = todos.filter(todo => todo.done === true);
            todoArray.push(newTodo);
            const newTodoLength = todoArray[0].length;
            const todoLength = todos.length;
            if (newTodoLength === todoLength && todos.length !== 0) {
                setActive(true);
            }
        }
        isEverythingDone();
    },[todos])

    const onMoveToFeed = useCallback(async() => {

        navigation.navigate('Upload');
        await createTodo({todos, user})
        setTodos([]);
        setActive(false);
    },[todos, user, navigation])

    return (
        <SafeAreaView edges={['bottom']} style={styles.block}>
            <KeyboardAvoidingView
                behavior={Platform.select({ios: 'padding'})}
                style={styles.avoid}>
                <DateHead date={today}/>
                {todos.length === 0 ? <Empty /> : <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} active={active}/>}
                {active && (
                    <>
                        <View style={styles.fullScreen}/>
                        <TouchableOpacity style={styles.fullScreenButton} onPress={onMoveToFeed}>
                            <Text style={styles.fullScreenText}>?????? ??????????????????</Text>
                        </TouchableOpacity>
                    </>
                )}
                <AddTodo onInsert={onInsert} active={active} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    avoid: {
        flex: 1,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.6,
    },
    fullScreenButton: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        top: '50%',
        left: '5%',
        width: '90%',
        height: 60,
        justifyContent: 'center',
    },
    fullScreenText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FF7C44',
    }
})

export default TodoScreen;
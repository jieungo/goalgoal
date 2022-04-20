import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Text, Pressable, TouchableOpacity } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import DateHead from '../components/DateHead';
import AddTodo from '../components/AddTodo';
import Empty from '../components/Empty';
import TodoList from '../components/TodoList';
import todosStorage from '../storages/todosStorage';
import { useNavigation } from '@react-navigation/native';

function TodoScreen() {
    const today = new Date();
    const [todos, setTodos] = useState([]);
    const [active, setActive] = useState(false);
    const navigation = useNavigation();
    

    useEffect(() => {
        todosStorage
            .get()
            .then(setTodos)
            .catch(console.error);
    }, []);

    useEffect(() => {
        todosStorage.set(todos).catch(console.error)
    },[todos]);


    
    const onInsert = text => {
        const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        const todo = {
            id: nextId,
            text,
            done: false,
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

    const onMoveToFeed = () => {
        setTodos([]);
        setActive(false);
        navigation.navigate('Upload');
    }

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
                            <Text style={styles.fullScreenText}>피드 작성하러가기</Text>
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
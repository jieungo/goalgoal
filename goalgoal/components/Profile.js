import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getUser } from '../lib/users';
import Avatar from './Avatar';
import LogoutButton from './LogoutButton';
import CalendarView from './CalendarView';
import { getTodos } from '../lib/todos';
import {format} from 'date-fns';
import TodoList from './TodoList';

function Profile({userId}) {
    const [user, setUser] = useState(null);
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    )

    useEffect(() => {
        getUser(userId).then(setUser);
        console.log(userId)
    }, []);

    useEffect(() => {
        getTodos(userId).then(setTodos);
    }, [todos]);

    useEffect(() => {
        console.log(todos)
    },[todos])

    const markedDates = todos.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
    }, {});

    const filterTodos = todos.filter(
        (todo) => format(new Date(todo.date), 'yyyy-MM-dd') === selectedDate,
    )

    return (
        <View style={styles.block} >
            {user && (
                <>
                    <View style={styles.userInfo}>
                        <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
                        <Text style={styles.username}>{user.displayName}</Text>
                    </View>
                    <TodoList
                        todos={filterTodos}
                        ListHeaderComponent={
                            <CalendarView 
                                style={styles.calendar} 
                                markedDates={markedDates}
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                            />
                        }
                    />
                    <LogoutButton />
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
    },
    block: {
        flex: 1,
    },
    userInfo: {
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    username: {
        marginTop: 15,
        fontSize: 24,
        color: '#424242',
    },
    calendar: {
        flex: 2,
    }
})

export default Profile;
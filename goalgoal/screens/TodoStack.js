import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from './TodoScreen';

const Stack = createNativeStackNavigator();

function TodoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Todo" component={TodoScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default TodoStack;
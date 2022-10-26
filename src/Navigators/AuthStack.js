import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PreloadScreen from '../Page/PreloadScreen/index'
import Login from '../Page/LoginScreen';
const Stack = createStackNavigator();

export default () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PreloadScreen"
                component={PreloadScreen}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="LoginScreen"
                component={Login}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
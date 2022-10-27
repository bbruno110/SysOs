import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PreloadScreen from '../Page/PreloadScreen/index'
import Login from '../Page/LoginScreen';
import AboutScreen from '../Page/AboutScreen'
import MainDrawer from './MainDrawer';
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
            <Stack.Screen
                name="MainDrawer"
                component={MainDrawer}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
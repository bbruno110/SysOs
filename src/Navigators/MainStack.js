import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Page/LoginScreen'
import AboutScreen from '../Page/AboutScreen'


const MainStack = createStackNavigator();

export default () =>{
    return(
        <MainStack.Navigator screenOptions={{headerShown: false}}>
            <MainStack.Screen name="Login" component={Login} />
            <MainStack.Screen name="About" component={AboutScreen}/> 
        </MainStack.Navigator>
    );
}
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PreloadScreen from '../Page/PreloadScreen/index'
import Login from '../Page/LoginScreen';
import AboutScreen from '../Page/AboutScreen'
import ListarChamadosDesenvolvimento from '../Page/ChamadosDesen';
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
                name="AboutScreen"
                component={AboutScreen}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="ListarChamadosDesenvolvimento"
                component={ListarChamadosDesenvolvimento}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
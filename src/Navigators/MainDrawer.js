import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Page/Home';
import DrawerCustom from '../components/DrawerCustom';
import TasyTIScreen from '../Page/TasyTIScreen';
import TasyCadScreen from '../Page/TasyCadScreen';
import AboutScreen from '../Page/AboutScreen';
import Chamados_Desen from '../Page/Chamados_Desen';
import Ramais from '../Page/Ramais';

const Drawer = createDrawerNavigator();

export default () =>{
    return(
        <Drawer.Navigator
            drawerContent={(props)=><DrawerCustom {...props}/>}
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle:{ 
                    backgroundColor: '#F5F5FB', 
                    shadowOpacity: 0, 
                    elevation: 0,
                },
                headerTitleStyle:{
                    width: 500
                }
            }}
        >
            <Drawer.Screen 
                name="Home"
                component={Home}
            />
            <Drawer.Screen 
                name="Chamados_Desen"
                component={Chamados_Desen}
            />
            <Drawer.Screen 
                name="TasyTIScreen"
                component={TasyTIScreen}
            />
            <Drawer.Screen 
                name="TasyCadScreen"
                component={TasyCadScreen}
            />
            <Drawer.Screen 
                name="Ramais"
                component={Ramais}
            />
            <Drawer.Screen 
                name="AboutScreen"
                component={AboutScreen}
            />
        </Drawer.Navigator>
    );
}
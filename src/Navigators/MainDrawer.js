import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WallScreen from '../Page/WallScreen/';
import DrawerCustom from '../components/DrawerCustom';
import TasyTIScreen from '../Page/TasyTIScreen';
import TasyCadScreen from '../Page/TasyCadScreen';
import AboutScreen from '../Page/AboutScreen';
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
                name="WallScreen"
                component={WallScreen}
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
                name="AboutScreen"
                component={AboutScreen}
            />
        </Drawer.Navigator>
    );
}
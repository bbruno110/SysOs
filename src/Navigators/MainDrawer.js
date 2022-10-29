import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WallScreen from '../Page/WallScreen/';
import DrawerCustom from '../components/DrawerCustom';

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
        </Drawer.Navigator>
    );
}
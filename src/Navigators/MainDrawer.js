import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Page/Home';
import DrawerCustom from '../components/DrawerCustom';
import TasyTIScreen from '../Page/TasyTIScreen';
import TasyCadScreen from '../Page/TasyCadScreen';
import AboutScreen from '../Page/AboutScreen';
import Chamados_Desen from '../Page/Chamados_Desen';
import Ramais from '../Page/Ramais';
import Tasy_Manut from '../Page/Tasy_Manut';
import Historicos from '../Page/Historicos';
import novoHistorico from '../Page/novoHistorico';
import Os_end from '../Page/OS_END/Os_end';

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
                name="Tasy_Manut"
                component={Tasy_Manut}
            />
            <Drawer.Screen 
                name="Ramais"
                component={Ramais}
            />
            <Drawer.Screen 
                name="AboutScreen"
                component={AboutScreen}
            />
            <Drawer.Screen 
                name="Historicos"
                component={Historicos}
            />
            <Drawer.Screen 
                name="novoHistorico"
                component={novoHistorico}
            />
            <Drawer.Screen 
                name='OS_END'
                component={Os_end}
            />
        </Drawer.Navigator>
    );
}
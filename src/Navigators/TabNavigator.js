import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ramais from '../Page/Ramais';
import HomeUser from '../Page/HomeUser';

const tab = createBottomTabNavigator();

export default () =>{
    return(
        <tab.Navigator
            screenOptions={({route})=>({
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle :{
                    fontSize: 10,
                    fontWeight: 'bold'
                },
                tabBarIcon:  ({ }) =>{
                    let icone = null;
                    switch(route.name){
                        case 'Inicial':
                            icone = 'file-text-o'
                        break;
                        case 'Ramais':
                            icone = 'phone'
                        break;
                    }
                    return <Icon 
                        name={icone} 
                        size={28}
                        color={'#666E78'}
                    />
                }
            })}
        >
            <tab.Screen name="Inicial" component={HomeUser} />
            <tab.Screen name="Ramais" component={Ramais} />
        </tab.Navigator>
    );
}
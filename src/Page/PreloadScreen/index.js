import React from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import C from './style';
import api from '../../services/api'
import { useStateValue } from '../../Context/StateContext';

export default () =>{

    const navigation = useNavigation();
    const [context, dispatch] =useStateValue();

    useEffect(()=>{
        const checkLogin = async()=>{
            let token = await api.getToken();
            if(token){
                let result = await api.validateToken();
                if(result.status === ''){
                    dispatch({type: 'SET_NAME', payload:{user: result.nmUser}});
                    navigation.reset({index:2, routes:[{name:'AboutScreen'}]})
                }else{
                    dispatch({type:'SET_TOKEN', payload: {token: ''}});
                    navigation.reset({index:1, routes:[{name:'LoginScreen'}]});
                }
            } 
            else{
                navigation.reset({index:1, routes:[{name:'LoginScreen'}]});
            }
        }
        checkLogin();
    }, []);
    return(
        <C.Container>
            <C.LoadingIcon color ="#8863E6" size="large"/>
        </C.Container>
    )
}
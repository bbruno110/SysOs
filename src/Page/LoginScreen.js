import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../services/api';
import AboutScreen from '../Page/AboutScreen'


function Login(){
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [nmUser, setName] = useState('');
    const [dsSenha, setPassword] =useState('');
    const HandleLoginBtn = async () =>{
        if(nmUser && dsSenha)
        {
            let result = await api.login(nmUser, dsSenha);
            if(result.error === "")
            {
                dispatch({type: 'SET_TOKEN', payload:{token: result.token}});
                dispatch({type: 'SET_NAME', payload:{user: result.user}});

                navigation.reset({index:2, routes:[{name:'MainDrawer'}]})
            }
            else
            {
                alert(result.error);
            }
        }
        else
        {
            alert("Preencha os campos!")
        }
    }

    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <Image 
                source={require('../asset/Logot.png')} 
                style={styles.imagem}
            />
            <Text style={{fontSize:24, fontWeight:'bold', marginBottom:60, color:'#b3b7b4'}}>Gestão de Ordens de Serviço</Text>
            <TextInput 
                placeholder='Digite o nome de usuário' 
                placeholderTextColor="#9EB8D9"  
                style={styles.txtInput} 
                value={nmUser} 
                onChangeText={t=>setName(t)}
            />
            <TextInput 
                placeholder='Digite a sua senha'
                placeholderTextColor="#9EB8D9" 
                style={styles.txtInput} 
                secureTextEntry={true} 
                value={dsSenha} 
                onChangeText={t=>setPassword(t)}
            />
            <TouchableOpacity style={styles.button} onPress={HandleLoginBtn}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Entrar</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#67D4D1'
    },
    imagem:{
        width:80,
        height:100,
        resizeMode:'stretch',
        marginTop: 20,
        marginBottom:50
    },
    txtInput:{
        width:250,
        padding:10,
        fontSize:16,
        color: '#000',
        backgroundColor:'#FFFFFF',
        placeholderTextColor:"#433001", 
        marginBottom:10,
        borderRadius: 20
    },
    button:{
        backgroundColor: "#1B6E2A",
        width:150,
        marginTop:15,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        marginBottom:50,
        padding: 10,
        borderRadius: 20
    }
});

export default Login;
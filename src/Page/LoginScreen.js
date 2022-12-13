import React, {useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, View, KeyboardAvoidingView} from 'react-native';
import TouchID from 'react-native-touch-id';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api';


function Login(){
    const navigation = useNavigation();
    const password = useRef();
    const [context, dispatch] = useStateValue();
    const [nmUser, setName] = useState('');
    const [dsSenha, setPassword] =useState('');
    const [suported, setSuported] = useState(null);
    /*useEffect(()=>{
        TouchID.isSupported().then(sucesso=>{
            setSuported(true);
        }).catch((error)=>{
            console.log("Error: "+ error)
        })
    },[]);
    const loginTouch = async () =>{
        const config ={
            title: 'Autenticação Requerida',
            imageColor: '#FFF',
            ImageErrorColor: '#ff0000',
            sensorDescription: 'Toque a Biometria',
            sensorErrorDescription: "Falhou",
            cancelText: 'Cancelar',
            fallbackLabel: 'Show Passcode',
            unifiedErrors: false,
            passcodeFallback: false,
        };
        const result = await TouchID.authenticate('', config);
    }*/
    const HandleLoginBtn = async () =>{
        if(nmUser && dsSenha)
        {
            let result = await api.login(nmUser, dsSenha);

            if(result.error === "")
            {
                dispatch({type: 'SET_TOKEN', payload:{token: result.token}});
                dispatch({type: 'SET_NAME', payload:{user: result.user}});
                dispatch({type:'SET_PAGE', payload: {screen: 'Home'}})
                dispatch({type: 'SET_GROUP', payload:{nrGrupo: result.nrGrupo}});
                
                if(result.nrGrupo === 3)
                {
                    navigation.reset({index:3, routes:[{name:'TabNavigator'}]})
                }
                else{
                    navigation.reset({index:2, routes:[{name:'MainDrawer'}]})
                }
            }
            else
            {
                Alert.alert(result.error, '');
            }
        }
        else
        {
            Alert.alert("Preencha os campos!",'')
        }
    }
    const prox = (e)=>{
        let key = e.key
        alert(key)
    }
    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
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
                    onSubmitEditing={()=>{password.current.focus()}} //funcao para ir para proxima etapa
                    keyboardType='default'
                    returnKeyType='next'
                />
                <KeyboardAvoidingView behavior={Platform.OS=='ios'?'padding':null}>
                    <TextInput 
                        placeholder='Digite a sua senha'
                        placeholderTextColor="#9EB8D9" 
                        style={styles.txtInput} 
                        secureTextEntry={true} 
                        value={dsSenha} 
                        onChangeText={t=>setPassword(t)}
                        onSubmitEditing={HandleLoginBtn}
                        ref={password}
                        returnKeyType='done'
                        keyboardType='default'
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button} onPress={HandleLoginBtn}>
                    <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Entrar</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.txtfin}>Criado por Bruno.Santos</Text>
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
    },
    txtfin:{
        color: '#b4b7ba',
        justifyContent: 'flex-end',
        fontSize:16,
        position: 'relative',
        bottom: 0
    }
});

export default Login;
import React, {useState, useEffect, useRef } from 'react';
import { Text, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView,View, Switch} from 'react-native';
import TouchID from 'react-native-touch-id';
import { Platform } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login(){
    const navigation = useNavigation();
    const password = useRef();
    const [context, dispatch] = useStateValue();
    const [nmUser, setName] = useState('');
    const [dsSenha, setPassword] =useState('');
    const [suported, setSuported] = useState(null);
    const [remember, setRemember] = useState();
    const IsFocused = useIsFocused();
    const widthScreen = Dimensions.get("screen").width;
    useEffect(()=>{
        if(IsFocused)
        {
            lembrarname();
            lembrarpass();
            if(nmUser !== ''){
                setRemember(false)
            }
            else{
                setRemember(true)
            }
            /*switch(rememberME){
                case 'true':
                    setPassword(senha);
                    setName(login);
                    setRemember(true);
                break;
                case 'false':
                    setPassword('');
                    setName('');
                    setRemember(false);
            }*/
        }
        /*TouchID.isSupported().then(sucesso=>{
            setSuported(true);
        }).catch((error)=>{
            console.log("Error: "+ error)
        })*/
    },[IsFocused]);
    /*
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
                switch(remember){
                    case false:
                        dispatch({type: 'SET_TOKEN', payload:{token: result.token}});
                        dispatch({type: 'SET_NAME', payload:{user: result.user}});
                        dispatch({type:'SET_PAGE', payload: {screen: 'Home'}})
                        dispatch({type: 'SET_GROUP', payload:{nrGrupo: result.nrGrupo}});
                        esquecer();
                        if(result.nrGrupo === 3)
                        {
                            navigation.reset({index:3, routes:[{name:'TabNavigator'}]})
                        }
                        else{
                            navigation.reset({index:2, routes:[{name:'MainDrawer'}]})
                        }
                    break;
                    case true:
                        dispatch({type: 'SET_TOKEN', payload:{token: result.token}});
                        dispatch({type: 'SET_NAME', payload:{user: result.user}});
                        dispatch({type:'SET_PAGE', payload: {screen: 'Home'}})
                        dispatch({type: 'SET_GROUP', payload:{nrGrupo: result.nrGrupo}});
                        salvar();
                        if(result.nrGrupo === 3)
                        {
                            navigation.reset({index:3, routes:[{name:'TabNavigator'}]})
                        }
                        else{
                            navigation.reset({index:2, routes:[{name:'MainDrawer'}]})
                        }
                    break;
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
    const togglechange = (value) =>{
        setRemember(value)
        switch(value){
            case true:
                salvar();
            break;
            case false:
                esquecer();
            break;
        }

    }
    const salvar = async () =>{
        try{
            await AsyncStorage.setItem('YOUR-KEY', nmUser)
            await AsyncStorage.setItem('YOUR-PASS', dsSenha)
        }
        catch(error)
        {
            alert(JSON.stringify(error))
        }
    }

    const lembrarname = async () =>{
        const username = await AsyncStorage.getItem('YOUR-KEY');
        if(username !==null)
        {
            setName(username)
        }
        else{
            setName('')
        }
    }
    const lembrarpass = async () =>{
        const pass = await AsyncStorage.getItem('YOUR-PASS')
        if(pass !==null)
        {
            setPassword(pass)
        }
        else{
            setPassword('')
        }
    }
    const esquecer = async()=>{
        await AsyncStorage.removeItem('YOUR-KEY')
        await AsyncStorage.removeItem('YOUR-PASS')
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txtfin}>Lembrar-me</Text>
                    <Switch
                        value={remember}
                        onValueChange={(value) => togglechange(value)}
                    >
                    </Switch>
                </View>
                <TouchableOpacity style={styles.button} onPress={HandleLoginBtn}>
                    <Text style={{fontSize: widthScreen * 0.051, fontWeight:'bold', color:'#FFF'}}>Entrar</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={{
                color: '#b4b7ba',
                justifyContent: 'flex-end',
                fontSize: widthScreen * 0.045,
                position: 'relative',
                bottom: 0
            }}>Criado por Bruno.Santos</Text>
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
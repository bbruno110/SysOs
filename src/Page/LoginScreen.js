import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


function Login(){
    const navigation = useNavigation();
    const HandleSobreClick = () =>{
        navigation.navigate('About');
    }

    return(
        <View style={styles.container}>
            <Image 
                source={require('../asset/logo100.png')} 
                style={styles.imagem}
            />
            <Text style={{fontSize:24, fontWeight:'bold', marginBottom:50}}>Gestao Ordem de Servico</Text>
            <TextInput placeholder='Digite o nome de usuário' style={styles.txtInput}/>
            <TextInput placeholder='Digite a sua senha' style={styles.txtInput} secureTextEntry={true}/>
            <TouchableOpacity style={styles.button} onPress={HandleSobreClick}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Login</Text>
            </TouchableOpacity>
        </View>
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
        width:160,
        height:160,
        resizeMode:'stretch',
        marginTop: 20,
        marginBottom:140
    },
    txtInput:{
        width:250,
        padding:10,
        fontSize:16,
        backgroundColor:'#DDD',
        marginBottom:10,
        borderRadius: 20
    },
    button:{
        backgroundColor: "#037672",
        width:150,
        marginTop:15,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        padding: 10,
        borderRadius: 20
    }
});

export default Login;
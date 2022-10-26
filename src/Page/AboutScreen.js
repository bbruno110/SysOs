import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';


function AboutScreen(){
    const navigation = useNavigation();

    const [context, dispatch] = useStateValue();

    const HandleLogoutBtn = async () =>{
        dispatch({type:'SET_TOKEN', payload: {token: ''}});
        navigation.reset({index:1, routes:[{name:'PreloadScreen'}]});
    };
    const HandleDesenvolvimento = () =>{
        navigation.navigate('ListarChamadosDesenvolvimento')
    }
    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <Text style={{fontSize: 24, fontWeight:'bold', marginTop: 15, marginBottom: 5}}>  Menu de Seleção</Text>

            <TouchableOpacity  style={styles.txtBt} onPress={HandleLogoutBtn}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.txtBtTelas}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}} onPress={HandleDesenvolvimento}>Tasy - Desenvolvimento</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.txtBtTelas}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Tasy - Cadastros</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.txtBtTelas}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Chamados TI</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 26, fontWeight:'bold', color:'#FFF',  position: 'absolute', bottom:0}} >{context.user.user}</Text>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        alignItems:'center',
    },
    txtBt:{
        backgroundColor: "#1B6E2A",
        width:150,
        marginTop:15,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        marginBottom:80,
        padding: 10,
        borderRadius: 20
    },
    txtBtTelas:{
        backgroundColor: "#1B6E2A",
        width:250,
        marginTop:15,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        padding: 10,
        borderRadius: 20
    }
});

export default AboutScreen;
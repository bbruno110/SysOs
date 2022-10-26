import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function ListarChamadosDesenvolvimento(){
    const navigation = useNavigation();
    const handleVoltar = () =>{
        navigation.goBack();
    }

    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <TouchableOpacity  style={styles.txtBtTelas} onPress={handleVoltar}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Voltar</Text>
            </TouchableOpacity>
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

export default ListarChamadosDesenvolvimento;
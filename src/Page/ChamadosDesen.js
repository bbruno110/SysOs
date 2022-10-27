import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

function ListarChamadosDesenvolvimento(){
    const navigation = useNavigation();
    const [chamadosList, setChamadosList] = useState([]);
    const handleVoltar = () =>{
        navigation.goBack();
    }

    useEffect(()=>{
        navigation.setOptions({headerTitle: 'Chamados Tasy - Ti Desenvolvimento'});
        Chamados_Desenvolvimento();
    },[]);
    
    const Chamados_Desenvolvimento = async () =>{
        const result = await api.Chamados_Desenvolvimento();
        setChamadosList(result.chamados);
    }

    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <TouchableOpacity  style={styles.txtBtTelas} onPress={handleVoltar}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Voltar</Text>
            </TouchableOpacity>
            <FlatList data={setChamadosList} renderItem={({item})=><WallItem data={item}/>} keyExtractor={(item)=>item.nrSequency.toString()}/>
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
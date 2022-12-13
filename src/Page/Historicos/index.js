import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Alert, Image, Button } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useStateValue } from "../../Context/StateContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import C from './style';
import WallHist from "../../components/WallHist";


export default (props) =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const nrSequency = context.user.nrSequency;
    const [ListHistorico, setListHistorico] = useState([]);
    const IsFocused = useIsFocused();
    useEffect(()=>{
        if(IsFocused){
            histList();
        }
        navigation.setOptions({
            headerStyle:{ 
                backgroundColor: '#005A97', 
                shadowOpacity: 0, 
                elevation: 0,
                height: 40,
            },
            headerLeft: () =>  <TouchableOpacity style={{
                width:100,
                marginLeft: 5,
                flexDirection: 'row',
                alignItems: 'center'
            }}
            onPress={()=>navigation.navigate('AboutScreen')}
            >
            <Icon name="chevron-left" size={18} color="#cbd1d8"/>
            <Text style={{marginLeft:5 ,fontSize: 16, fontWeight: 'bold', color:"#cbd1d8"}}>Voltar</Text>
            </TouchableOpacity>,
            headerTitle: 'Historicos',
            headerTitleStyle:{
                width: 500,
                fontWeight: 'bold',
                fontSize: 24,
                color: '#cbd1d8'
            },
            headerRight: () =>  <TouchableOpacity style={{
                width:85,
                marginRight: 5,
                flexDirection: 'row',
                alignItems: 'center'
            }}
            onPress={proximo}
            >
            <Text style={{marginRight:5 ,fontSize: 16, fontWeight: 'bold', color:"#cbd1d8"}}>Adicionar</Text>
            <Icon name="plus" size={18} color="#cbd1d8"/>
            </TouchableOpacity>,
            headerTitle: 'Historicos',
            headerTitleStyle:{
                width: 500,
                fontWeight: 'bold',
                fontSize: 24,
                color: '#cbd1d8'
            },
        });
       
    },[ IsFocused]);
    const proximo = async () =>{
        navigation.navigate('novoHistorico')
    };
    const histList = async () =>{
        setListHistorico([]);
        setLoading(true);
        const result = await api.Listhit(nrSequency);
        setLoading(false);
        setListHistorico(result)
    };

    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <FlashMessage position={"top"}></FlashMessage>
            <C.Container>  
                {!loading && ListHistorico.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não Há Chamados</C.NoListText>
                    </C.NoListArea>
                }
                
                <C.List 
                    
                    data={ListHistorico} 
                    onRefresh={histList}
                    refreshing={loading}
                    renderItem={({item})=><WallHist data={item}/>} 
                />
            </C.Container>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems:'center',
    },
    t:{
        flexDirection: 'row'
    },
    imagem:{
        width:80,
        height:100,
        resizeMode:'stretch',
        opacity: 0.05
    },
    txtInput1:{
        width:250,
        height: 100,
        padding:10,
        fontSize:15,
        color: '#000',
        marginBottom: 15,
        backgroundColor:'#647884',
        borderRadius: 5
    },
    txtInput:{
        width:250,
        height: 175,
        padding:10,
        fontSize:16,
        color: '#000',
        backgroundColor:'#cbd1d8',
        borderRadius: 10
    },
    txts:{
        fontSize: 24,
        fontWeight:'bold',
        color:'#cbd1d8'
    },
    button:{
        backgroundColor: "#1B6E2A",
        width:120,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        marginRight: 5,
        padding: 10,
        borderRadius: 10
    },
    buttonCancel:{
        backgroundColor: "#a0bcb5",
        width:120,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        marginRight: 5,
        padding: 10,
        borderRadius: 10
    },
    nt:{
        color: '#b4b7ba',
        justifyContent: 'flex-start',
        fontSize:24,
        position: 'absolute',
        top: 0
    },
    headerButton:{
        backgroundColor: "#07142E",
        width:120,
        alignItems:'flex-end',
        height: 50,
        fontSize: 20,
        marginRight: 5,
        padding: 10,
        borderRadius: 10
    }
});
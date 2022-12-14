import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Alert, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import Historicos from './Historicos';
import Chamados_Desen from '../Page/Chamados_Desen';
import TasyTIScreen from '../Page/TasyTIScreen';
import api from '../services/api';

export default (props) =>{
    const navigation = useNavigation();
    const route = useRoute();
    const [dsTecnico, onChangeText] = React.useState('');
    const [context, dispatch] = useStateValue();
    const nrSequency = context.user.nrSequency;
    const Descricao = context.user.Descricao;
    const page = context.user.screen;
    useEffect(()=>{

        navigation.setOptions({
            headerShown: true,
            headerRight: () =>  <TouchableOpacity style={styles.headerButton} onPress={next} ><Text style={{fontSize: 18, color:'#FFF', marginLeft: 10}}>Históricos </Text><Icon name="chevron-right" size={24} color="#cbd1d8" /></TouchableOpacity>,
            headerTitle: '',
            headerTitleStyle:{
                width: 500,
                color: '#cbd1d8'
            },
            headerStyle:{ 
                backgroundColor: '#07142E', 
                shadowOpacity: 0, 
                elevation: 0,
            },
        });
    },[]);
    const next = async () =>{
        navigation.navigate('Historicos')
    };
    const back = async () =>{
        navigation.navigate(page)
        dispatch({type: 'SET_nrSequency', payload:{nrSequency: ''}});
        dispatch({type: 'SET_Descricao', payload:{Descricao: ''}});
        onChangeText('');
        
    };
    const update = async () =>{
        if(dsTecnico)
        {
            const result = await api.FinalizarChamado(nrSequency, dsTecnico);
            onChangeText('');
            Alert.alert('Chamado encerrado!','')
            /*navigation.navigate(props.route.params.screen)*/
            navigation.navigate(page)
           
        }
        else{
            Alert.alert('Preencha os campos', 'Por favor preencha a solução!')
        }
    }
    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <Image 
                source={require('../asset/Logot.png')} 
                style={styles.imagem}
            />
            <Text style={styles.txts }>Descrição do dano</Text>
            
            <TextInput 
                style={styles.txtInput1} 
                value={Descricao} 
                textAlignVertical= 'top'
                editable={false}
                multiline
                selectTextOnFocus={false}
            ></TextInput>
            <Text style={styles.txts }>OS n°{nrSequency}</Text>
            <TextInput 
                style={styles.txtInput} 
                multiline 
                numberOfLines={4} 
                onChangeText={text => onChangeText(text)}
                value={dsTecnico}
                textAlignVertical= 'top'
                maxLength={350}
                editable
                placeholder="Descreva a solução para esta OS!" 
                placeholderTextColor="#161b22"
            >
            </TextInput>
        
            <Text style={{color: '#b8bfc6', left: -54}}>
                Maximo de {350 - dsTecnico.length} caracteres.
            </Text>
            <View  style={styles.t} >
                <TouchableOpacity style={styles.button} onPress={update}>
                    <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Finalizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={back} >
                    <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    )
}

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
        backgroundColor:'rgba(203,209,216, 0.5)',
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
        flexDirection: 'row',
        alignItems:'center',
        height: 50,
        fontSize: 20,
        marginRight: 5,
        padding: 10,
        borderRadius: 10
    }
});
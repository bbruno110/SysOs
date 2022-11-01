import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import WallScreen from '../Page/WallScreen/';
import TasyTIScreen from '../Page/TasyTIScreen';
import api from '../services/api';

export default (props) =>{
    const navigation = useNavigation();
    const route = useRoute();
    const nrSequency = props.route.params.nrSequency;
    const [dsTecnico, onChangeText] = React.useState('');
    const [context, dispatch] = useStateValue();
    useEffect(()=>{
        navigation.setOptions({
            headerShown: false,
            headerTitle: 'Finalizar OS',
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
    const back = async () =>{
        navigation.navigate(props.route.params.screen)
    };
    const update = async () =>{
        if(dsTecnico)
        {
            const result = await api.FinalizarChamado(nrSequency, dsTecnico);
            onChangeText('');
            navigation.navigate(props.route.params.screen)
           
        }
        else{
            Alert.alert('Preencha os campos', 'Por favor preencha a solução!')
        }
    }
    return(
        <LinearGradient colors={['#07142E', '#003478', '#005688']} style={styles.container}>
            <Text style={styles.txts }>Descrição do dano</Text>
            <TextInput 
                style={styles.txtInput1} 
                value={props.route.params.dano} 
                textAlignVertical= 'top'
                editable={false} 
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
            <TouchableOpacity style={styles.button} onPress={update}>
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Finalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={back} >
                <Text style={{fontSize: 24, fontWeight:'bold', color:'#FFF'}}>Cancelar</Text>
            </TouchableOpacity>
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
    txtInput1:{
        width:250,
        height: 200,
        padding:10,
        fontSize:15,
        color: '#000',
        marginBottom: 15,
        backgroundColor:'#647884',
        borderRadius: 20
    },
    txtInput:{
        width:250,
        height: 200,
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
        backgroundColor: "#007566",
        width:150,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        padding: 10,
        marginTop: 10,
        borderRadius: 20
    },
    buttonCancel:{
        backgroundColor: "#8FC1B5",
        width:150,
        marginTop: 3,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        padding: 10,
        borderRadius: 20
    }
});
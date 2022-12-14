import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { useStateValue } from "../../Context/StateContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { FloatingAction } from "react-native-floating-action";
import C from './style';
import { SelectList } from 'react-native-dropdown-select-list'
import { Alert } from "react-native";

export default (props) =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const nrSequency = context.user.nrSequency;
    const [dsdano, onChangeDano] = React.useState('');
    const [dsDescrib, onChangeText] = React.useState('');
    const [ClassSel, setClassSel] = useState("");
    const [PrioSel, setPrioSel] = useState("");
    const [ParadSel, setParadSel] = useState("");
    const [modaTilVisible, setModaTilVisible] = useState(false);
    const [ListHistorico, setListHistorico] = useState([]);
    const IsFocused = useIsFocused();
    useEffect(()=>{
        if(IsFocused){
        }
        navigation.setOptions({
            headerStyle:{ 
                backgroundColor: '#091c42', 
                shadowOpacity: 0, 
                elevation: 0,
                height: 55,
            },
            headerTitleAlign: "center",
            headerTitle: 'Página Inicial',
            headerTitleStyle:{
                //width: 500,
                //fontWeight: 'bold',
                fontSize: 22,
                color: '#CCC'
            }
        });
       
    },[ IsFocused]);
    const actions = [
        {
            text: 'LogOut',
            icon: <Icon 
                name={'arrow-circle-right'} 
                size={18}
                color={'#CCC'}
            />,
            name: "bt_logOut",
            position: 20,
        },
        {
            text: 'Chamados TI',
            icon: <Icon 
                name={'windows'} 
                size={18}
                color={'#CCC'}
            />,
            name: "bt_osTI",
            position: 1,
        },
        {
            text: 'Chamados Tasy',
            icon: <Icon 
                name={'gears'} 
                size={18}
                color={'#CCC'}
            />,
            name: "bt_osDesen",
            position: 2,
        },
        {
            text: 'Chamados Cadastro (Tasy)',
            icon: <Icon 
                name={'user'} 
                size={18}
                color={'#CCC'}
            />,
            name: "bt_osCad",
            position: 3,
        },
        {
            text: 'Chamados Manutenção',
            icon: <Icon 
                name={'wrench'} 
                size={18}
                color={'#CCC'}
            />,
            name: "bt_osManut",
            position: 4,
        }
    ]
    const data = [
        {key:'E', value:'Defeito'},
        {key:'D', value:'Dúvida'},
        {key:'S', value:'Solicitação'},
        {key:'T', value:'Sugestão'}
    ]
    const Situacao = [
        {key:'N', value:'Não'},
        {key:'P', value:'Parcialmente'},
        {key:'S', value:'Sim'}
    ]
    const Prioridade = [
        {key:'E', value:'Emergência'},
        {key:'U', value:'Urgente'},
        {key:'A', value:'Alta'},
        {key:'M', value:'Média'},
        {key:'B', value:'Baixa'},
        {key:'S', value:'Sem prioridade'}
    ]
    const back = async () =>{
        setClassSel("");
        setPrioSel("");
        setParadSel("");
        onChangeDano("");
        onChangeText("");
        setModaTilVisible(false)
    }
    const send = async () =>{
        if(!ClassSel || !PrioSel || !ParadSel || !dsDescrib || !dsdano)
        {
            alert("Por favor preencha os campos!")
        }
        else{
            back();
        }

    }
    return(
        <LinearGradient colors={['#0d2556', '#003478', '#005688']} style={styles.container}>
            <FlashMessage position={"top"}></FlashMessage>
            <C.Container>  
                <C.TiModal
                    animationType="slide"
                    transparent={true}
                    visible={modaTilVisible}
                    onRequestClose={() => {
                        setModaTilVisible(!modaTilVisible);
                        }}
                >
                    <C.tiAreafull>
                        <C.tiArea>
                            <C.caixa>
                                <C.textoCaixa>Classificação</C.textoCaixa>
                                <SelectList  
                                    setSelected={(val) => setClassSel(val)}
                                    data={data} 
                                    placeholder="Selecione a Classificação"
                                    maxHeight={120}
                                    search={false}
                                    inputStyles={{color:'black', width:100, fontSize: 14}}
                                    dropdownItemStyles={{marginHorizontal:10}}
                                    dropdownTextStyles={{color: 'black', fontSize: 14}}
                                    save="value"
                                />
                            </C.caixa>
                            <C.caixa>
                                <C.textoCaixa>Parado</C.textoCaixa>
                                <SelectList  
                                    setSelected={(val) => setParadSel(val)}
                                    data={Situacao} 
                                    placeholder="Selecione a Situação"
                                    maxHeight={120}
                                    search={false}
                                    inputStyles={{color:'black', width:100, fontSize: 14}}
                                    dropdownItemStyles={{marginHorizontal:10}}
                                    dropdownTextStyles={{color: 'black', fontSize: 14}}
                                    save="value"
                                />
                            </C.caixa>
                        </C.tiArea>
                        <C.tiArea>
                            <C.caixa>
                                <C.textoCaixa>Prioridade</C.textoCaixa>
                                <SelectList  
                                    setSelected={(val) => setPrioSel(val)}
                                    data={Prioridade} 
                                    placeholder="Prioridade"
                                    maxHeight={120}
                                    search={false}
                                    inputStyles={{color:'black', width:100, fontSize: 14}}
                                    dropdownItemStyles={{marginHorizontal:10}}
                                    dropdownTextStyles={{color: 'black', fontSize: 14}}
                                    save="value"
                                />
                            </C.caixa>
                            <C.txtUser editable={false}>{context.user.user}</C.txtUser>
                        </C.tiArea>
                        <C.caixa>
                            <C.txtGeral>Dano</C.txtGeral>
                            <C.txtDano maxLength={42} value={dsdano} onChangeText={text => onChangeDano(text)}></C.txtDano>
                        </C.caixa>
                        <C.caixa>
                            <C.txtGeral>Descrição</C.txtGeral>
                            <C.txtDano 
                                multiline 
                                numberOfLines={4} 
                                onChangeText={text => onChangeText(text)}
                                value={dsDescrib}
                                textAlignVertical= 'top'
                                maxLength={350}
                                editable
                            ></C.txtDano>
                            <Text style={{color: '#b8bfc6'}}>
                                Maximo de {350 - dsDescrib.length} caracteres.
                            </Text>
                        </C.caixa>
                    </C.tiAreafull>
                    <C.caixar>
                        <C.goBack
                            onPress={back}
                        ><C.Textb>Voltar</C.Textb></C.goBack>
                        <C.goBack
                            onPress={send}
                        ><C.Textb>Enviar</C.Textb></C.goBack>
                    </C.caixar>
                </C.TiModal>
                                
            </C.Container>
            <FloatingAction
                actions={actions}
                position={"left"}
                onPressItem={name => {
                    switch(name){
                            case 'bt_logOut' :
                                dispatch({type:'SET_TOKEN', payload: {token: ''}});
                                dispatch({type:'SET_PAGE', payload: {screen: ''}});
                                navigation.reset({index:1, routes:[{name:'PreloadScreen'}]});
                            break;
                            case 'bt_osTI':
                                setModaTilVisible(true);
                            break;
                            default: Alert.alert(`selected button: ${name}`);
                        }
                    }}
            />
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
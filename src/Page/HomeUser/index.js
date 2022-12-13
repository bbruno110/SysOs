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
    const [selected, setSelected] = useState("");
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
        {key:'1', value:'Defeito'},
        {key:'2', value:'Dúvida'},
        {key:'3', value:'Solicitação'},
        {key:'4', value:'Sugestão'}
    ]
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
                    <C.tiArea>
                        <C.NoListText>testete</C.NoListText>
                        <SelectList  
                            setSelected={(val) => setSelected(val)}
                            data={data} 
                            placeholder="Selecione a Classificação"
                            maxHeight={120}
                            search={false}
                            inputStyles={{color:'black', width:150}}
                            dropdownItemStyles={{marginHorizontal:10}}
                            dropdownTextStyles={{color: 'black'}}
                            save="value"
                        />
                    </C.tiArea>
                    <C.goBack
                        onPress={() => setModaTilVisible(false)}
                    ><C.Textb>Voltar</C.Textb></C.goBack>
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
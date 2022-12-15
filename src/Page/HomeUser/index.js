import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
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
import api from "../../services/api";
import WallUser from "../../components/WallUser";
import { View } from "react-native";

export default (props) =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const nrSequency = context.user.nrSequency;
    const [dsdano, onChangeDano] = React.useState('');
    const [dsDescrib, onChangeText] = React.useState('');
    const [ClassSel, setClassSel] = useState("");
    const [PrioSel, setPrioSel] = useState("");
    const [ieOS, setIeOs] = useState("");
    const [ParadSel, setParadSel] = useState("");
    const [modaTilVisible, setModaTilVisible] = useState(false);
    const [modaCadlVisible, setModaCadlVisible] = useState(false);
    const [modaDesenlVisible, setModaDesenlVisible] = useState(false);
    const [modaManVisible, setModManVisible] = useState(false);
    const [ListOs, setListOS] = useState([]);
    const [Listwa, setListWa] = useState([]);
    const IsFocused = useIsFocused();
    useEffect(()=>{
        if(IsFocused){
            os();     
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
    const os = async () =>{
        setListOS([]);
        setLoading(true);
        const results = await api.osOpenUser();
        const wa = await api.osOpenUserwa();
        setListOS(results.chamados);
        setListWa(wa);
        filter();
        setLoading(false);
    }
    const filter = async()=>{
        /*const res = ListOs.find(obj =>{
            return obj.status === '3';
        })
        */
       alert(JSON.stringify(Listwa))
        if(Listwa === '3'){
            Alert.alert('Avaliação', 'Existe um chamado finalizado, que precisa ser avaliado!')
        }
    /*  let unique =[];
        ie.forEach(el =>{
            if(!unique.includes(el)){
                unique.push(el)
            }
        })
        return unique;
    */
    }
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
        os();
        setClassSel("");
        setPrioSel("");
        setParadSel("");
        onChangeDano("");
        setIeOs("");
        onChangeText("");
        setModaTilVisible(false);
        setModaCadlVisible(false);
        setModaDesenlVisible(false);
        setModManVisible(false);
    }
    const send = async () =>{
        if(!ClassSel || !PrioSel || !ParadSel || !dsDescrib || !dsdano)
        {
            alert("Por favor preencha os campos!")
        }
        else{
            switch(ieOS){
                case 'des':
                    const result = await api.osDesen(ClassSel,ParadSel,PrioSel,dsdano,dsDescrib);
                    if(result.error)
                    {
                        alert(JSON.stringify(result.error))
                    }
                    else{
                        Alert.alert(`Chamado Aberto`, `Chamado Aberto para a Central de Desenvolvimento Tasy. n°${result.seq}`)
                        back();
                    }
                break;
                case 'cad':
                    const resultCad = await api.osCad(ClassSel,ParadSel,PrioSel,dsdano,dsDescrib);
                    if(resultCad.error)
                    {
                        alert(JSON.stringify(resultCad.error))
                    }
                    else{
                        Alert.alert(`Chamado Aberto`, `Chamado Aberto para a Central de Desenvolvimento Tasy. n°${resultCad.seq}`)
                        back();
                    }
                break;
            }
        }

    }
    return(
        <LinearGradient colors={['#0d2556', '#003478', '#005688']} style={styles.container}>
            <FlashMessage position={"top"}></FlashMessage>
            <C.Container>  
                <C.List
                        data={ListOs}
                        onRefresh={os}
                        refreshing={loading}
                        renderItem={({item})=><WallUser data={item}/>} 
                />
                <C.TiModal
                    animationType="slide"
                    transparent={true}
                    visible={modaTilVisible}
                    onRequestClose={() => {
                        setModaTilVisible(!modaTilVisible);
                        }}
                >
                    <C.tiAreafull>
                        <C.caixar>
                            <Icon 
                                name={'windows'} 
                                size={22}
                                color={'black'}
                            />
                            <Text style={{marginLeft: 15 ,color: 'black', fontSize: 22}} >Chamados - TI</Text>
                        </C.caixar>
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
                                    save="key"
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
                                    save="key"
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
                                    save="key"
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
                <C.TiModal
                    animationType="slide"
                    transparent={true}
                    visible={modaManVisible}
                    onRequestClose={() => {
                        setModaTilVisible(!modaManVisible);
                        }}
                >
                    <C.tiAreafull>
                        <C.caixar>
                            <Icon 
                                name={'wrench'} 
                                size={22}
                                color={'black'}
                            />
                            <Text style={{marginLeft: 15 ,color: 'black', fontSize: 22}} >Chamados - Manutenção</Text>
                        </C.caixar>
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
                                    save="key"
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
                                    save="key"
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
                                    save="key"
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
                <C.TiModal
                    animationType="slide"
                    transparent={true}
                    visible={modaDesenlVisible}
                    onRequestClose={() => {
                        setModaTilVisible(!modaDesenlVisible);
                        }}
                >
                    <C.tiAreafull>
                        <C.caixar>
                            <Icon 
                                name={'gears'} 
                                size={22}
                                color={'black'}
                            />
                            <Text style={{marginLeft: 15 ,color: 'black', fontSize: 22}} >Chamados - Tasy</Text>
                        </C.caixar>
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
                                    save="key"
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
                                    save="key"
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
                                    save="key"
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
                <C.TiModal
                    animationType="slide"
                    transparent={true}
                    visible={modaCadlVisible}
                    onRequestClose={() => {
                        setModaTilVisible(!modaCadlVisible);
                        }}
                >
                    <C.tiAreafull>
                        <C.caixar>
                            <Icon 
                                name={'user'} 
                                size={22}
                                color={'black'}
                            />
                            <Text style={{marginLeft: 15 ,color: 'black', fontSize: 22}} >Chamados - Cadastro</Text>
                        </C.caixar>
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
                                    save="key"
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
                                    save="key"
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
                                    save="key"
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
                    <View style={styles.cont}>
                        <C.caixat>
                            <C.Aberto/><C.textoCaixa> Aberto  </C.textoCaixa>
                            <C.Atendimento/><C.textoCaixa> Em Atendimento  </C.textoCaixa>
                            <C.Fechado/><C.textoCaixa> Necessidade de Avaliação</C.textoCaixa>
                        </C.caixat> 
                        <C.caixat>
                            <Icon name={'wrench'} size={20} color={'#67D4D1'}/>
                            <C.textoCaixa> Manutenção</C.textoCaixa>
                            <C.textoCaixa>                    </C.textoCaixa>
                            <Icon name={'gears'} size={20} color={'#67D4D1'}/>
                            <C.textoCaixa> Desenvolvimento</C.textoCaixa>
                        </C.caixat>
                        <C.caixat>
                            <Icon name={'user'} size={20} color={'#67D4D1'}/>
                            <C.textoCaixa> Cadastros</C.textoCaixa>
                            <C.textoCaixa>                          </C.textoCaixa>
                            <Icon name={'windows'} size={20} color={'#67D4D1'}/>
                            <C.textoCaixa> Infra</C.textoCaixa>
                        </C.caixat>
                    </View>                           
            </C.Container>
            <FloatingAction
                actions={actions}
                position={"right"}
                onPressMain={filter}
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
                            case 'bt_osDesen':
                                setModaDesenlVisible(true);
                                setIeOs('des');
                            break;
                            case 'bt_osCad':
                                setModaCadlVisible(true);
                                setIeOs('cad');
                            break;
                            case 'bt_osManut':
                                setModManVisible(true);
                            break;
                            default: Alert.alert(`selected button: ${name}`);
                        }
                    }}
            />
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    cont:{
        padding: 30,
        width: '100%',
    },
    container:{
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
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
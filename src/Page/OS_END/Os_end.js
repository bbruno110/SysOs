import React, { useState, useEffect } from 'react';
import C from './style';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import {BarChart} from "react-native-chart-kit";

import WallFimOS from '../../components/wallFimOS';


export default () =>{
    const navigation = useNavigation();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [bgColor, setBgColor] = useState('');
    const dateInitial = (selectedStartDate ? selectedStartDate.format('DD/MM/YYYY') : '');
    const dateEnd = (selectedEndDate ? selectedEndDate.format('DD/MM/YYYY') : '');
    const [listChamados, setListChamados] = useState([]);
    const [ti, setTI]= useState(false);
    const [cad, setCad] = useState(false);
    const [desen, setDesen] = useState(false);
    const [man, setMAN] = useState(false);
    const widthScreen = Dimensions.get("screen").width;
    const [modalVisible, setModalVisible] = useState(true);
    const [countMy, setCountMY] = useState('');
    const [countAll, setCountAll] = useState('');
    const [loading, setLoading] = useState(false);
    const IsFocused = useIsFocused();
    const setcheck = [];

    useEffect(()=>{
        if(IsFocused)
        {
            setModalVisible(true);
            setcheck.length = 0;
            setBgColor('transparent');
            setListChamados([]);
            setCountMY('');
            setSelectedStartDate('');
            setSelectedEndDate('');
            setCountAll('');
            setTI(false);
            setCad(false);
            setDesen(false);
            setMAN(false);
            {ti ? setcheck.push(22) : setcheck.shift(22)}
            {cad ? setcheck.push(30) : setcheck.shift(30)}
            {desen ? setcheck.push(29) : setcheck.shift(29)}
            {man ? setcheck.push(21) : setcheck.shift(21)}
        }
        navigation.setOptions({
            headerTintColor: '#CCC',
            headerTitle: 'OS Finalizadas',
            headerTitleStyle:{
                width: 500,
                color: '#CCC'
            },
            headerStyle:{ 
                backgroundColor: '#07142E', 
                shadowOpacity: 0, 
                elevation: 0,
            }
        });
    },[IsFocused, Dimensions.get("screen").height, Dimensions.get("screen").width])

    const OS_fim = async () =>{
        {ti ? setcheck.push(22) : setcheck.indexOf(22)}
        {cad ? setcheck.push(30) : setcheck.indexOf(30)}
        {desen ? setcheck.push(29) : setcheck.indexOf(29)}
        {man ? setcheck.push(21) : setcheck.indexOf(21)}
        setListChamados([]);
        setLoading(true);
        const result = await api.osFinished(dateInitial, dateEnd, setcheck);
        if(result.error == "")
        {
            if(result.chamados.count == 0)
            {
                Alert.alert("Sem registros","",
                    [
                        {
                            text: "Ok",
                            onPress:async()=>
                            {
                                setBgColor('transparent');
                                setListChamados([]);
                                setCountMY('');
                                setModalVisible(true);
                                setSelectedStartDate('');
                                setSelectedEndDate('');
                                setCountAll('');
                                setTI(false);
                                setCad(false);
                                setDesen(false);
                                setMAN(false);
                                setcheck.length = 0;
                                setLoading(false);
                                setModalVisible(true);
                            }
                        }
                    ]
                )
    
            }else
            {
                setLoading(false);
                setBgColor('#FFF');
                setListChamados(result.chamados.rows)
                setCountMY(result.chamados.count);
                setCountAll(result.conta);
            }
        }
        else{
            Alert.alert("Sem registros","",
                    [
                        {
                            text: "Ok",
                            onPress:async()=>
                            {
                                setBgColor('transparent');
                                setListChamados([]);
                                setCountMY('');
                                setModalVisible(true);
                                setSelectedStartDate('');
                                setSelectedEndDate('');
                                setCountAll('');
                                setTI(false);
                                setCad(false);
                                setDesen(false);
                                setMAN(false);
                                setcheck.length = 0;
                                setLoading(false);
                                setModalVisible(true);
                            }
                        }
                    ]
            )
        }

    };

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
          setSelectedEndDate(date);
        } else {
          setSelectedEndDate(null);
          setSelectedStartDate(date);
        }
    };

    const back = async () =>{
        setBgColor('transparent');
        setListChamados([]);
        setCountMY('');
        setModalVisible(true);
        setSelectedStartDate('');
        setSelectedEndDate('');
        setCountAll('');
        setTI(false);
        setCad(false);
        setDesen(false);
        setMAN(false);
        setcheck.length = 0;
    }
    const pres = async () =>{
        if(dateInitial && dateEnd){
        setModalVisible(false);
            OS_fim();
        }
        else{
            alert('Necessário informar as datas!')
        }
    }

    const data = { labels: ['',`Meus Chamados ${countMy}`, `Total Chamados ${countAll}`], datasets: [ { data:[0, countMy, countAll] } ]}
    return (
        <LinearGradient colors={['#07142E', '#003478', '#005688']}  style={styles.container}>
                <C.Quadrado></C.Quadrado>
                <C.CalendarModal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                >
                    <C.CalendarArea>
                        <CalendarPicker
                            allowRangeSelection={true}
                            weekdays={['Seg','Ter','Qua','Qui','Sex','Sab','Dom']}
                            months={['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']}
                            previousTitle='Anterior'
                            nextTitle='Próximo'
                            todayBackgroundColor="#e8fff3"
                            selectedDayColor="#bacbff"
                            selectedDayTextColor="#000000"
                            scaleFactor={widthScreen * 0.9}
                            textStyle={{
                            fontFamily: 'Cochin',
                            color: '#CCC',
                            }}
                            onDateChange={onDateChange}
                        />
                        <View  style={{flexDirection: 'row' , padding: 3}}>
                            <TouchableOpacity style={{flexDirection: 'row' }}>
                                <CheckBox
                                    disabled={false}
                                    value={ti}
                                    onValueChange={(newValue) => setTI(newValue)}

                                />
                                <Text
                                    style={{ marginTop: 7, color: '#FFF' }}
                                >Chamados - TI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row' }}>
                                <CheckBox
                                    disabled={false}
                                    value={cad}
                                    onValueChange={(newValue) => setCad(newValue)}
                                />
                                <Text
                                    style={{ marginTop: 7 , color: '#FFF' }}
                                >Chamados - CAD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row' }}>
                                <CheckBox
                                    disabled={false}
                                    value={desen}
                                    onValueChange={(newValue) => setDesen(newValue)}
                                />
                                <Text
                                    style={{ marginTop: 7, color: '#FFF'  }}
                                >Chamados - DES</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                                <CheckBox
                                    disabled={false}
                                    value={man}
                                    onValueChange={(newValue) => setMAN(newValue)}
                                />
                                <Text
                                    style={{ marginTop: 7, color: '#FFF'  }}
                                >Chamados - MAN</Text>
                        </TouchableOpacity>
                        <C.dat>De: {dateInitial}</C.dat>
                        <C.dat>Até: {dateEnd}</C.dat>
                    </C.CalendarArea>
                    <C.Botao
                    underlayColor="transparent"
                    onPress={pres}
                    ><C.Text>Carregar</C.Text></C.Botao>
                </C.CalendarModal>

                <View 
                    style={{ display: countMy ? 'flex' : 'none' }}
                >
                    <BarChart 
                        data={data}
                        width={420}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: "#004F8E",
                            backgroundGradientFrom: "#07142E",
                            backgroundGradientTo: "#005688",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        hideLegend={false}
                    />
                     <C.Botao onPress={back}><C.Text>Filtrar</C.Text></C.Botao>
                </View>
                <FlatList style={{ flex:1, backgroundColor:bgColor }}
                    data={listChamados} 
                    onRefresh={back}
                    refreshing={loading}
                    renderItem={({item})=><WallFimOS data={item}/>} 
                    //keyExtractor={(item)=>item.nrSequency.toString()}
                />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button:{
        backgroundColor: "#1B6E2A",
        width:150,
        marginTop:15,
        alignItems:'center',
        height: 50,
        fontSize: 24,
        marginBottom:50,
        padding: 10,
        borderRadius: 20
    },
});
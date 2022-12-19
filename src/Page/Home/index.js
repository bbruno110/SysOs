import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Dimensions } from 'react-native';
import { useStateValue } from "../../Context/StateContext";
import api from '../../services/api';
import C from './style';
import WallItem from '../../components/WallItem';


export default () =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChamados, setListChamados] = useState([]);
    const IsFocused = useIsFocused();
    useEffect(()=>{
        if(IsFocused){
            MYOS();

            dispatch({type:'SET_PAGE', payload: {screen: 'Home'}})
        }
        navigation.setOptions({
            headerTitle: 'Página Inicial - Minhas OS'
        });
    },[IsFocused, Dimensions.get("screen").height, Dimensions.get("screen").width]);

    const MYOS = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = await api.MYOS();
        setLoading(false);
        setListChamados(result.chamados)
    };
    const findMYOS = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = await api.findMyOs(descricao);
        setLoading(false);
        setListChamados(result.chamados)
    }
    return(
        <C.Container>
            <C.inpt
                placeholder="Digite para pesquisar" 
                placeholderTextColor="#161b22"
                value={descricao}
                onChangeText={t=>setDescricao(t)}
                onEndEditing={findMYOS}
                returnKeyType="search"
                selectTextOnFocus
            ></C.inpt>
            {!loading && listChamados.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não Há Chamados</C.NoListText>
                </C.NoListArea>
            }
            <C.List 
                data={listChamados} 
                onRefresh={findMYOS}
                refreshing={loading}
                renderItem={({item})=><WallItem data={item}/>} 
                keyExtractor={(item)=>item.nrSequency.toString()}
            />
        </C.Container>
    );
};
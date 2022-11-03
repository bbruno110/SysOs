import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../Context/StateContext";
import api from '../../services/api';
import C from './style';
import WallItem from '../../components/WallItem';


export default () =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [listChamados, setListChamados] = useState([]);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Chamados Tasy - Desenvolvimento'
        });
        Chamados_Desenv();
    },[]);

    const Chamados_Desenv = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = await api.Chamados_Desenvolvimento();
        setLoading(false);
        setListChamados(result.chamados)
    };
    return(
        <C.Container>
            {!loading && listChamados.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não Há Chamados</C.NoListText>
                </C.NoListArea>
            }
            <C.List 
                data={listChamados} 
                onRefresh={Chamados_Desenv}
                refreshing={loading}
                renderItem={({item})=><WallItem data={item}/>} 
                keyExtractor={(item)=>item.nrSequency.toString()}
            />
        </C.Container>
    );
};
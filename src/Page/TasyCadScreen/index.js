import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../Context/StateContext";
import api from '../../services/api';
import WallItem from '../../components/WallItem';
import C from './style';



export default () =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [listChamados, setListChamados] = useState([]);
    
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Chamados Tasy - Cadastros'
        });
        Cham_cad();
    },[]);

    const Cham_cad = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = await api.Chamados_CAD();
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
                onRefresh={Cham_cad}
                refreshing={loading}
                renderItem={({item})=><WallItem data={item}/>} 
                keyExtractor={(item)=>item.nrSequency.toString()}
            />
        </C.Container>
    );
};
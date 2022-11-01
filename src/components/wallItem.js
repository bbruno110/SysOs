import React, {useState} from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native'; 
import { useStateValue } from '../Context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api'
import TasyTIScreen from '../Page/TasyTIScreen';
import AboutScreen from '../Page/AboutScreen';
import WallScreen from '../Page/WallScreen';

const Box = styled.TouchableOpacity `
    backgroun-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 20px;
    padding: 15px;
    margin-bottom: 10px;
`;
const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const InfoArea = styled.View`
    margin-left: 15px;
    flex: 1;
`;
const Title = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
`;
const Body = styled.Text`
    font-size: 15px;
    color: #000;
    margin: 15px 0;
`;

const FooterArea = styled.View`
    flex-direction: row;
    align-items: center;
`; 
const LikeButton = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
`;
const LikeText = styled.Text`
    margin-left: 5px;
    font-size: 13px;
    color: #9C9DB9;
`;
const UserText = styled.Text`
    font-size: 13px;
    color: #9C9DB9;
`;

export default ({data}) =>{
    const [context, dispatch] = useStateValue();
    const navigation = useNavigation();
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const route = useRoute();
    const [nm_user, setnm_user] = useState(data.usuarioCham);
    
    const Atend = async () => {
        if(nm_user == null)
        {
            Alert.alert('Deseja atender este chamado?',"",
            [
                {
                    text:"Sim",
                    onPress:async()=>
                    {
                        setnm_user(context.user.user);
                        const result = await api.AtenderChamado(data.nrSequency);
                        setnm_user(result.nm_user)
                    },
                },
                {
                    text:"Não"
                },
            ]
            )
        }
        else
        {
            Alert.alert('Deseja finalizar este chamado?',"",
            [
                {
                    text:"Sim",
                    onPress:async()=>
                    {
                        navigation.navigate('AboutScreen',{ nrSequency:data.nrSequency, dano: data.dsDanoObs, screen: routeName})
                    },
                },
                {
                    text:"Não"
                },
            ]
            )
        }
    };
    return(
        <Box onPress={Atend}>
            <HeaderArea>
                {nm_user == null ? 
                    <Icon name="user" size={30} color="#67D4D1" />
                    :  <Icon name="user" size={30} color="#F68080" />
                }
                <InfoArea>
                    <Title >{data.nrSequency} - {data.dsDano}</Title>
                    <Date>{data.dtServico}</Date>
                    <UserText>
                        Atendido por : {nm_user}
                    </UserText>
                </InfoArea>
            </HeaderArea>
            <Body>
                {data.dsDanoObs}
            </Body>
            <LikeText>{data.setoUsuario}</LikeText>
            <FooterArea>
                <LikeButton >
                    {nm_user == null ? 
                        <Icon name="tag" size={17} color="#67D4D1" /> 
                        :  <Icon name="tag" size={17} color="#F68080" />
                    }
                </LikeButton>
                <LikeText>{data.Prioridade} - {data.solicitante}</LikeText>
            </FooterArea>
        </Box>
    );
}
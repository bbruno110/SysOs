import React, {useState} from 'react';
import { Alert, Linking } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native'; 
import { useStateValue } from '../Context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

const Box = styled.View `
    backgroun-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 20px;
    padding: 15px;
    margin-bottom: 10px;
`;
const HeaderArea = styled.TouchableOpacity`
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
    font-size: 15px;

    color: #000;
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
    const state = useNavigationState(state => state);
    const [nm_user, setnm_user] = useState(data.usuarioCham);
    
    return(
        <Box>
            <HeaderArea  onPress={()=>{ Linking.openURL(`tel:${'0772102'+data.ramal}`)}}>
                    <Icon name="volume-control-phone" size={30} color="#67D4D1" />
                <InfoArea>
                    <Title >{data.setor}</Title>
                    <Date>{data.ramal}</Date>
                </InfoArea>
            </HeaderArea>
        </Box>
    );
}
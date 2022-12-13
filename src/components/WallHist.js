import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Clipboard from '@react-native-community/clipboard';

const Box = styled.TouchableOpacity `
    background-color: #F2F2F2;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 20px;
    padding: 15px;
    width: 500px;
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
const UserText = styled.Text`
    font-size: 13px;
    color: #9C9DB9;
`;

export default ({data}) =>{

    const copyToClipboard = () => {
        Clipboard.setString(data.TESTE)
        showMessage({
            message: "Texto Copiado!",
            type: 'info',
            duration: 200,
            backgroundColor:  "#418ad3"
        })
    }

    return(
        <Box onPress={copyToClipboard}>
            
            <HeaderArea>
                <Icon name="archive" size={30} color="#BFBFBF" />               
                <InfoArea>
                    <Title >{data.NR_SEQUENCIA}</Title>
                    <Date>{data.DT_HISTORICO}</Date>
                    <UserText>
                        Criado por : {data.NM_USUARIO}
                    </UserText>
                </InfoArea>
            </HeaderArea>
            <Body>
                {data.TESTE}
            </Body>
        </Box>
    );
}
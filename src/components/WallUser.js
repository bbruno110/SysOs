import React, {useState} from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity, Image, StyleSheet, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute, useNavigationState, useIsFocused } from '@react-navigation/native'; 
import { useStateValue } from '../Context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import api from '../services/api';
import { useEffect } from 'react';

const Box = styled.TouchableOpacity `
    background-color: #FFF;
    border-width: 4px;
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
    const [defaultRating, setDefaultRating] = useState(0);
    //'N','P','R','B','O'
    const [maxRating, setMaxRating] = useState([1,2,3,4,5])
    const [input, setInput] = useState(false);
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const route = useRoute();
    const [mod, setmod] = useState(false);
    const [nm_user, setnm_user] = useState(data.usuarioCham);
    const page = context.user.screen;
    const [dsTecnico, onChangeText] = React.useState('');
    const Atend = async () => {
        switch(data.status){
            case "1":
                Alert.alert("Chamado Aberto",`O chamado nº: ${data.nrSequency} já está aberto!`);
            break;
            case "2":
                Alert.alert("Chamado em Atendimento",`O chamado nº: ${data.nrSequency} foi atendido por: ${data.usuarioCham}`);
            break;
            case "3":
                setmod(true);
            break;
        }
    };

    const tipoIcon = (params) =>{
        switch(params){
            case 22:
                return 'windows';
            case 29:
                return 'gears';
            case 30:
                return 'user';
            case 21:
                return 'wrench';
        }
    }
    const color = (params) =>{
        switch(params){
            case '1':
                return '#E8E9ED';
            case '2':
                return '#d3d89c';
            case '3':
                return '#ffadad';
        }
    }
    const star_corner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
    const star_filled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const send = async() =>{
        if(defaultRating === 0)
        {
            Alert('É necessário informar uma nota!')
        }
        else{
            if(input)
            {
                if(dsTecnico === '')
                {
                    alert('Necessário informar um motivo')
                }else{
                    const ratt = defaultRating.toString();
                    const result = await api.RatingOS(data.nrSequency, ratt)
                    const hist = await api.Novohit(data.nrSequency, dsTecnico, 9);
                    if(result.message === '')
                    {
                        setDefaultRating(0);
                        setmod(false);
                        setInput(false);
                        onChangeText('');
                        alert('Chamado finalizado com sucesso!')
                        navigation.navigate({index:3, routes:[{name:'TabNavigator'}]})
                    }
                    else{
                        alert('Ocorreu um erro contate o Administrador!')
                    }
                }
            }
            else
            {
                setInput(false)
                const ratt = defaultRating.toString();
                const result = await api.RatingOS(data.nrSequency, ratt)
                if(result.message === '')
                {
                    setDefaultRating(0);
                    setmod(false);
                    alert('Chamado finalizado com sucesso!')
                    navigation.reset({index:3, routes:[{name:'TabNavigator'}]})
                }
                else{
                    alert('Ocorreu um erro contate o Administrador!')
                }
            }
        }
    }

    const CustomRatingBar = () =>{
        return(
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key)=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={()=>{
                                    setDefaultRating(item)
                                    switch(item){
                                        case 1:
                                            setInput(true);
                                        break;
                                        case 2:
                                            setInput(true);
                                        break;
                                        case 3:
                                            setInput(false);
                                        break;
                                        case 4:
                                            setInput(false);
                                        break;
                                        case 5:
                                            setInput(false);
                                        break;
                                    }
                                }}
                            >
                                <Image
                                    style={styles.starImageStyle}
                                    source={
                                        item <= defaultRating 
                                        ? {uri:star_filled}
                                        : {uri:star_corner}
                                    }
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return(
        <View>
            {!mod ?
                <TouchableOpacity 
                style={{
                    backgroundColor: '#FFF',
                    borderWidth: 4,
                    borderRadius: 20,
                    padding: 15,
                    marginBottom: 10,
                    borderColor: `${color(data.status)}`,
                }}
                onPress={Atend}
                >
                    <HeaderArea>
                        {nm_user == null ? 
                            <Icon 
                            name={
                                tipoIcon(data.nrGrupoPlanj)
                            } 
                            size={30} color="#67D4D1" 
                            />
                            :  <Icon name={ tipoIcon(data.nrGrupoPlanj)} size={30} color={ `${color(data.status)}`} />
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
                                :  <Icon name="tag" size={17} color={ `${color(data.status)}`} />
                            }
                        </LikeButton>
                        <LikeText>{data.Prioridade} - {data.solicitante}</LikeText>
                    </FooterArea>
                </TouchableOpacity>
                :
                <View 
                style={{
                    backgroundColor: '#FFF',
                    borderWidth: 4,
                    borderRadius: 20,
                    padding: 15,
                    marginBottom: 10,
                    borderColor: `${color(data.status)}`,
                }}>
                    <InfoArea>
                        <Title >Avalie a Resolução do chamado</Title>
                    </InfoArea>
                    <CustomRatingBar/>
                    {input ? 
                        <TextInput 
                            style={styles.txtInput1} 
                            textAlignVertical= 'top'
                            numberOfLines={3}
                            onChangeText={text => onChangeText(text)}
                            value={dsTecnico}
                            placeholder="Descreva um motivo" 
                            placeholderTextColor="#161b22"
                            keyboardType='default'
                            returnKeyType='done'
                            onSubmitEditing={send}
                            multiline
                            selectTextOnFocus={false}
                        />
                        : ''
                    }
                    <TouchableOpacity style={{
                        backgroundColor: "#1B6E2A",
                        width:100,
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: 25,
                        borderRadius: 10
                    }}
                    onPress={send}
                    ><Text style={{
                        color: "#FFF",
                        fontWeight: 'bold',
                        fontSize: 12,
                        marginLeft: 32
                        }}>Enviar</Text></TouchableOpacity>
                </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    customRatingBarStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    starImageStyle:{
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    txtInput1:{
        padding:10,
        fontSize:15,
        color: '#000',
        marginBottom: 15,
        backgroundColor:'#FFF',
        borderColor: '#CCC',
        borderWidth: 2,
        borderRadius: 5
    }
})
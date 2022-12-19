import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../Context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerArea = styled.View`
    flex:1;
    background-color: #eafcf7;
`;
const DrawerLogoArea = styled.Pressable`
    padding: 10px 20px;
    marginTop: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #cee0db;
`;
const DrawerTextLogo = styled.Text`
    color: #037672;
    marginLeft: 90px;
    marginTop: -50px;
    font-weight: bold;
    font-size: 24px;
`;
const Drawerspace = styled.Text`
marginTop: 20px;
`;
const DrawerLogo = styled.Image``;
const DrawerScroller = styled.ScrollView`
    flex:1;
    margin: 20px 0;
`;
const FooterArea = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const FooterInfo = styled.View``;
const FooterProfile = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;
const FooterUnitButton = styled.TouchableOpacity``;
const MenuButton = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 5px;
    border-radius: 5px;
    align-items: center;
`;
const MenuSquare = styled.View`
    width: 5px;
    height:35px;
    margin-right:20px;
    background-color: transparent;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
`;
const MenuButtonText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color: #666E78;
`;

export default (props) =>{
    const [context, dispatch] = useStateValue();
    const navigation = useNavigation();
    const grupo = context.user.nrGrupo ;
    let menus;
    switch(grupo){
        case 2:
            menus = [
                {title: 'Chamados Tasy - Manuteção', icon: 'wrench', screen: 'Tasy_Manut'},
                {title: 'Abrir Chamado', icon: 'file-text-o', screen: 'HomeUser'},
                {title: 'Lista de Ramais', icon: 'phone-square', screen: 'Ramais'}
            ];
        break;
        case 1:
            menus = [
                {title: 'Chamados Tasy - Desenvolvimento', icon: 'gears', screen: 'Chamados_Desen'},
                {title: 'Chamados Tasy - Cadastros', icon: 'user', screen: 'TasyCadScreen'},
                {title: 'Chamados Tasy - TI', icon: 'windows', screen: 'TasyTIScreen'},
                {title: 'Lista de Ramais', icon: 'phone-square', screen: 'Ramais'},
                {title: 'Abrir Chamado', icon: 'file-text-o', screen: 'HomeUser'},
                {title: 'Meus Chamados - Atendidos', icon: 'bar-chart', screen: 'OS_END'}
            ];
        break;
        case 4:
            menus = [
                {title: 'Chamados Tasy - Desenvolvimento', icon: 'gears', screen: 'Chamados_Desen'},
                {title: 'Chamados Tasy - Cadastros', icon: 'user', screen: 'TasyCadScreen'},
                {title: 'Chamados Tasy - TI', icon: 'windows', screen: 'TasyTIScreen'},
                {title: 'Lista de Ramais', icon: 'phone-square', screen: 'Ramais'},
                {title: 'Abrir Chamado', icon: 'file-text-o', screen: 'HomeUser'},
                {title: 'Chamados Tasy - Manuteção', icon: 'wrench', screen: 'Tasy_Manut'},
                {title: 'Meus Chamados - Atendidos', icon: 'bar-chart', screen: 'OS_END'}
            ];
        break;
    }


    const HandleLogoutBtn = async () =>{
        dispatch({type:'SET_TOKEN', payload: {token: ''}});
        dispatch({type:'SET_PAGE', payload: {screen: ''}});
        navigation.reset({index:1, routes:[{name:'PreloadScreen'}]});

    };
    const init = async () =>{
        navigation.reset({index:2, routes:[{name:'Home'}]});
        dispatch({type:'SET_PAGE', payload: {screen: 'Home'}})
    }
    return (
        <LinearGradient colors={['#FFF','#8FC1B5']} style={{flex:1}}>
            <DrawerLogoArea onPress={init}>
                <DrawerLogo 
                    source={require('../asset/logo100.png')} resizeMode="contain"/>
                    <DrawerTextLogo>Hospital Samur</DrawerTextLogo>
                    <Drawerspace></Drawerspace>
            </DrawerLogoArea>
            <ScrollView
                width={350}
                style={{
                    width: '100%',
                    flexGrow:1,
                    margin: 10,
                    marginLeft: 0
                }}
            >
                {menus.map((item, index)=>(
                    <MenuButton key={index} onPress={()=>navigation.navigate(item.screen, dispatch({type:'SET_PAGE', payload: {screen: item.screen}}))}>
                        <MenuSquare></MenuSquare>

                        <Icon 
                        name={item.icon} 
                        size={20}
                        color={'#666E78'}
                        />
                        <MenuButtonText>{item.title}</MenuButtonText>
                    </MenuButton>
                ))}
            </ScrollView>
            <FooterArea>
                <FooterInfo>
                    <FooterProfile>
                        Olá {context.user.user}
                    </FooterProfile>
                </FooterInfo>
                <FooterUnitButton>
                    <Icon name="arrow-circle-o-left" size={24} color="#666E78" onPress={HandleLogoutBtn}/>
                </FooterUnitButton>
            </FooterArea>
        </LinearGradient>
    );
}
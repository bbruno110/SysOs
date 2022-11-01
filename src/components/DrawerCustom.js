import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import WallScreen from '../Page/WallScreen';
import { useNavigation } from '@react-navigation/native'
import TasyTIScreen from '../Page/TasyTIScreen';
import AboutScreen from '../Page/AboutScreen';
import { useStateValue } from '../Context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerArea = styled.View`
    flex:1;
    background-color: #eafcf7;
`;
const DrawerLogoArea = styled.View`
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
const ChangeUnitArea = styled.View`
    margin: 10px;
`;
const ChangeUnitButton = styled.TouchableOpacity`
    background-color: #1B6E2A;
    padding:12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
const ChangeUnitButtonText = styled.Text`
    color: #FFF;
    font-size: 15px;
    font-weight: bold;
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
    const menus = [
        {title: 'Chamados Tasy - Desenvolvimento', icon: 'gears', screen: 'WallScreen'},
        {title: 'Chamados Tasy - Cadastros', icon: 'user', screen: 'TasyCadScreen'},
        {title: 'Chamados Tasy - TI', icon: 'windows', screen: 'TasyTIScreen'}
    ];
    const HandleLogoutBtn = async () =>{
        dispatch({type:'SET_TOKEN', payload: {token: ''}});
        navigation.reset({index:1, routes:[{name:'PreloadScreen'}]});
    };

    return (
        <DrawerArea>
            <DrawerLogoArea>
                <DrawerLogo 
                    source={require('../asset/logo100.png')} resizeMode="contain"/>
                    <DrawerTextLogo>Hospital Samur</DrawerTextLogo>
                    <Drawerspace></Drawerspace>
            </DrawerLogoArea>
            <DrawerScroller>
                {menus.map((item, index)=>(
                    <MenuButton key={index} onPress={()=>navigation.navigate(item.screen, {screen: item.screen})}>
                        <MenuSquare></MenuSquare>
                        <Icon name={item.icon} size={20} color={'#666E78'} />
                        <MenuButtonText>{item.title}</MenuButtonText>
                    </MenuButton>
                ))}
            </DrawerScroller>
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
        </DrawerArea>
    );
}
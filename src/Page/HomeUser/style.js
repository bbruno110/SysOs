import styled from "styled-components/native";
import { Dimensions } from 'react-native';

const widthScreen = Dimensions.get("screen").width;
const heightScreen =  Dimensions.get("screen").height;

export default {
    Container: styled.View`
        flex:1;
        background-color: #FFF;
        pading: 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    Scroller: styled.ScrollView``,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    Textb: styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
`,
    NoListText: styled.Text`
        font-size: 18px;
        color: #000;
    `,
    List: styled.FlatList`
        paddingTop: 10px;
        flex: 1;
    `,
    TiModal: styled.Modal`
    `,
    tiAreafull: styled.View`
    margin: 5px;
    align-items: center;   
    border: 3px solid;
    backgroundColor: #FFF;
    borderRadius: 20px;
    padding: 25px;
    marginTop: 10px;
    `,
    tiArea: styled.View`
    flex-direction: row;
    `,
    goBack : styled.TouchableOpacity`
    align-items: center;    
    justify-content: center;
    background-color: #1E782E;  
    padding: 10px; 
    border: 2px solid;
    width: 150px;
    margin-left: 10px;
    marginTop: 10px;
    borderRadius: 5px;
    `,
    caixar: styled.View`
    flex-direction: row;
    align-items: center;    
    justify-content: center;
    `,
    caixat: styled.View`
    flex-direction: row;   
    align-content: space-around;
    marginBottom: 5px;
    `,
    caixa: styled.View`
    align-items: flex-start;
    marginTop: 10px;
    margin-left: 10px;
    `,
    textoCaixa : styled.Text`
    font-size: 14px;
    color: #4f4f4f;
    `,
    txtUser : styled.TextInput`
    width:150px;
    align-items: center;    
    justify-content: center;
    height:47px;
    color: black;
    borderRadius: 10px;
    marginTop: 27px;
    font-size: 14px;
    border: 1px solid;
    background-color: #f2f2f2;
    margin-left: 10px;
    `,
    txtDano:  styled.TextInput`
    width:320px;
    borderRadius: 5px;
    font-size: 18px;
    font-weight: bold;
    color: black;
    border: 1px solid;
    background-color: #f2f2f2;
    `,
    txtGeral : styled.Text`
    font-size: 16px;
    color: #4f4f4f;
    `,
    Aberto: styled.View`
    flex-direction: row;  
    width:15px;
    height:15px;
    borderRadius: 10px;
    border: 10px solid;
    border-color: #E8E9ED;
    `,
    Atendimento: styled.View`
    flex-direction: row;   
    width:15px;
    height:10px;
    borderRadius: 15px;
    border: 10px solid;
    border-color: #d3d89c;
    `,
    Fechado: styled.View`
    flex-direction: row;   
    width:15px;
    height:15px;
    borderRadius: 15px;
    border: 10px solid;
    border-color: #ffadad;
    `,
};
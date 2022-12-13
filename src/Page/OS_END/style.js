import styled from "styled-components/native";

export default {
    Container: styled.View`
        background-color: #F5F5FB;
    `,
    CalendarArea: styled.View`
        margin: 20px;
        backgroundColor: "white";
        borderRadius: 20px;
        padding: 35px;
        align-items: center;
        marginTop: 60px;
    `,
    CalendarModal: styled.Modal`

    `,
    Text : styled.Text`
        font-size: 20px;
        color: #FFF;
        font-weight: bold;
    `,
    dat : styled.Text`
        font-size: 16px;
        color: #CCC;
    `,
    Botao : styled.TouchableOpacity`
        align-items: center;    
        justify-content: center;
        background-color: #1E782E;  
        padding: 10px; 
    `,
    Quadrado : styled.View`
    align-items: center;    
    justify-content: center;
    background-color: #bacbff;
    height: 1px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    Scroller: styled.ScrollView``,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
}
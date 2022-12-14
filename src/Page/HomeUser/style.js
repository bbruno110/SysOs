import styled from "styled-components/native";

export default {
    Container: styled.View`
        flex:1;
        background-color: #BFBFBF;
        width: 350px;
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
};
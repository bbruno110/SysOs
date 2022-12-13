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
    tiArea: styled.View`
        margin: 5px;
        backgroundColor: #FFF;
        borderRadius: 20px;
        padding: 35px;
        align-items: center;
        marginTop: 60px;
    `,
    goBack : styled.TouchableOpacity`
    align-items: center;    
    justify-content: center;
    background-color: #1E782E;  
    padding: 10px; 
    marginTop: 10px;
    borderRadius: 5px;
    margin-left: 120px;
    margin-right: 120px;
`,
};
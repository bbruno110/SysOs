import styled from "styled-components/native";

export default {
    Container: styled.View`
        flex:1;
        background-color: #F5F5FB;
        pading: 20px;
    `,
    Text: styled.Text`
        paddingLeft: 120px;
        font-size: 15px;
        color: #000;
        fontWeight: bold;
    `,
    inpt: styled.TextInput`
    font-size: 15px;
    color: #000;
    background-color: #E8E8E8;
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
    List: styled.FlatList`
        flex: 1;
    `
}
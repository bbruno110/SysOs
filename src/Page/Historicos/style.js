import styled from "styled-components/native";

export default {
    Container: styled.View`
        flex:1;
        background-color: #F5F5FB;
        pading: 20px;
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
        paddingTop: 10px;
        flex: 1;
    `
};
import AsyncStorage from "@react-native-async-storage/async-storage";

const initalState = {
    token:'',
    user:{}
};
export default(state= initalState, action = {}) =>{

    switch(action.type){
        case 'SET_TOKEN':
            AsyncStorage.setItem('token', action.payload.token);
            return {...state,token:action.payload.token};
        break;
        case 'SET_NAME':
            return {...state,user:action.payload.user};
        break;
    }

    return state;
};
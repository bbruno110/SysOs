import AsyncStorage from "@react-native-async-storage/async-storage";

const initalState = {
    token:'',
    name:'',
    password:''
};
export default(state= initalState, action = {}) =>{

    switch(action.type){
        case 'SET_TOKEN':
            AsyncStorage.setItem('token', action.payload.token);
            return {...state,token:action.payload.token};
        break;
        case 'SET_NAME':
            return {...state,name:action.payload.name};
        break;
        case 'SET_PASSWORD':
            return {...state,password:action.payload.password};
        break;
    }

    return state;
};
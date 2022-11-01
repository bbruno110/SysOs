import AsyncStorage from "@react-native-async-storage/async-storage";

const initalState = {
    token:'',
    user:{},
    nrSequency: ''
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
        case 'SET_nrSequency':
            return {...state,nrSequency:action.payload.nrSequency};
        break;
    }

    return state;
};
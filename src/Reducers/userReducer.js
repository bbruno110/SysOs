import AsyncStorage from "@react-native-async-storage/async-storage";

const initalState = {
    token:'',
    user:{},
    nrGrupo:'',
    nrSequency: '',
    Descricao:'',
    screen: 'Home',
    login: '',
    password: '',
    remember: 'false'
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
        case 'SET_GROUP':
            return {...state,nrGrupo:action.payload.nrGrupo};
        break;
        case 'SET_Descricao':
            return {...state,Descricao:action.payload.Descricao};
        break;
        case 'SET_PAGE':
            return {...state,screen:action.payload.screen};
        break;
        case 'SET_LOGIN':
            AsyncStorage.setItem('login', action.payload.login);
            return {...state,login:action.payload.login};
        break;
        case 'SET_PASSWORD':
            AsyncStorage.setItem('password', action.payload.password);
            return {...state,password:action.payload.password};
        break;
        case 'SET_REMEMBER':
            AsyncStorage.setItem('remember', action.payload.remember);
            return {...state,remember:action.payload.remember};
        break;
    }

    return state;
};
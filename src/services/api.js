import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'http://192.168.1.22:3000';

const request = async(method, endpoint, params, token)=>{
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch(method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'put':
        case 'delete':
        case 'post':
            body = JSON.stringify(params);
        break;
    }
    let headers = {'Content-type':'application/json'};
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }
    let req = await fetch(fullUrl, {
        method,
        headers,
        body
    })
    let json = await req.json();
    return json;
}

export default {
    getToken: async()=>{
        return await AsyncStorage.getItem('token');
    },
    validateToken: async ()=>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/validade', {}, token);
        return json;
    },
    login: async(nmUser,dsSenha) =>{
        let json = await request('post','/login', {nmUser, dsSenha});
        return json;
    },
    Chamados_Desenvolvimento: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/list', {}, token);
        return json;
    }
};
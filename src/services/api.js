import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'http://192.168.1.22:80';

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
    Chamados_TI: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/list-ti', {}, token);
        return json;
    },
    MYOS: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get',`/home`, {}, token);
        return json;
    },
    Chamados_CAD: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/list-cad', {}, token);
        return json;
    },
    Chamados_Desenvolvimento: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/list', {}, token);
        return json;
    },
    AtenderChamado: async(nrSequency) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('put',`/atend?nrSequency=${nrSequency}`,{}, token);
        return json; 
    },
    FinalizarChamado: async(nrSequency, dsTecnico) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('put',`/endOs?nrSequency=${nrSequency}`,{dsTecnico}, token);
        return json; 
    },
    findMyOs: async(descricao) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get',`/find?descricao=${descricao}`,{}, token);
        return json; 
    },
    Chamados_Manut: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/List-Manut', {}, token);
        return json;
    },
    Listhit: async(nrSequency) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get',`/listhist?nrSequency=${nrSequency}`, {}, token);
        return json;
    },
    Novohit: async(nrSequency, dsTecnico, tipo) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post',`/hist?nrSequency=${nrSequency}`, {dsTecnico,tipo}, token);
        return json;
    },
    osFinished: async(dateInitial, dateEnd, nrGrupo) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post',`/os_finished`,{dateInitial,dateEnd, nrGrupo},token);
        return json;
    },
    osDesen: async(ClassSel, ParadSel, PrioSel, dsdano, dsDescrib) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post','/os-desen',{ClassSel,ParadSel,PrioSel,dsdano,dsDescrib},token);
        return json;
    },
    osCad: async(ClassSel, ParadSel, PrioSel, dsdano, dsDescrib) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post','/os-cad',{ClassSel,ParadSel,PrioSel,dsdano,dsDescrib},token);
        return json;
    },
    osOpenUser: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/homeUser',{}, token);
        return json; 
    },
    osOpenUserwa: async() =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get','/wa',{}, token);
        return json; 
    },
    RatingOS: async(nrSequency, rating) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('put',`/rating?nrSequency=${nrSequency}&rating=${rating}`,{}, token);
        return json; 
    },
    Equip: async(nrSequency)=>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/equip?nrSequency=${nrSequency}`,{}, token)
        return json;
    },
    localizacao: async()=>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/localizacao`,{}, token)
        return json;
    },
    osTI: async(ClassSel, ParadSel, PrioSel, dsdano, dsDescrib,dsLocalizacao,dsEquipamento) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post','/os-ti',{ClassSel,ParadSel,PrioSel,dsdano,dsDescrib,dsLocalizacao,dsEquipamento},token);
        return json;
    },
    osMat: async(ClassSel, ParadSel, PrioSel, dsdano, dsDescrib,dsLocalizacao,dsEquipamento) =>{
        let token = await AsyncStorage.getItem('token');
        let json = await request('post','/os-manut',{ClassSel,ParadSel,PrioSel,dsdano,dsDescrib,dsLocalizacao,dsEquipamento},token);
        return json;
    },
};
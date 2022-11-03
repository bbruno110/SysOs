import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../Context/StateContext";
import WallRamais from '../../components/WallRamais';
import C from './style';


export default () =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(true);
    const [listChamados, setListChamados] = useState([]);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Lista de Ramais'
        });
        MYOS();
    },[]);

    const MYOS = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = [
            {setor:'ALMOX. ',ramal:'8455'},
            {setor:'ALMOX. Coordenação',ramal:'8446'},
            {setor:'AMBULAT. UNACON',ramal:'8318'},
            {setor:'ARQUIVO',ramal:'8472'},
            {setor:'ATEND. PARTICULAR',ramal:'8492'},
            {setor:'AUDITORIA',ramal:'8490 / 8445'},
            {setor:'C. MÉDICAS (REPASSE)',ramal:'8431'},
            {setor:'CALL CENTER',ramal:'8367'},
            {setor:'CALL CENTER (whatsapp)',ramal:'8304'},
            {setor:'CARDIO – Coordenação ',ramal:'8351'},
            {setor:'CARDIO – RECEPÇÃO',ramal:'8336 / 8325'},
            {setor:'CCIH',ramal:'8447'},
            {setor:'CENTRO CIRÚRGICO',ramal:'8452'},
            {setor:'CENTRO CIRÚRGICO CONFORTO',ramal:'8432'},
            {setor:'CICATRIMED',ramal:'8487'},
            {setor:'CME',ramal:'8471'},
            {setor:'COMUNICAÇÃO',ramal:'8349'},
            {setor:'CONTABILIDADE ',ramal:'8453'},
            {setor:'DIRETORIA FINANCEIRA',ramal:'8468'},
            {setor:'DIRETORIA TÉCNICA',ramal:'8464'},
            {setor:'DR. JÓ LUIS',ramal:'8499'},
            {setor:'EDUCAÇÃO',ramal:'8399'},
            {setor:'ENDOSCOPIA INTERNO',ramal:'8413'},
            {setor:'ENDOSCOPIA RECEPÇÃO',ramal:'8463'},
            {setor:'FARMÁCIA CENTRAL',ramal:'8494'},
            {setor:'FARMÁCIA COORDEN.',ramal:'8395'},
            {setor:'FATURAMENTO',ramal:'8422 / 8561'},
            {setor:'FATURAMENTO  - Gerência',ramal:'8470'},
            {setor:'FINANCEIRO ',ramal:'8496'},
            {setor:'G. CUSTOS',ramal:'8453'},
            {setor:'G. DE PESSOAS',ramal:'8457'},
            {setor:'G. QUALIDADE',ramal:'8349'},
            {setor:'GER. ENFERMAGEM',ramal:'8462'},
            {setor:'GER. LEITOS',ramal:'8380'},
            {setor:'GERENCIA HOTELARIA',ramal:'8580'},
            {setor:'HEMOD. – DR. FÁBIO',ramal:'8314'},
            {setor:'HEMOD. – ENF.',ramal:'8332'},
            {setor:'HEMOD. – RECEPÇÃO',ramal:'8339'},
            {setor:'HOSPITAL DAY',ramal:'8548'},
            {setor:'IMAGEM - AUTORIZAÇÃO',ramal:'8385'},
            {setor:'IMAGEM – DRA. JULIANA',ramal:'8354'},
            {setor:'IMAGEM - ENFERMAGEM',ramal:'8384'},
            {setor:'IMAGEM – FATURAMENTO',ramal:'8333'},
            {setor:'IMAGEM – LAUDOS',ramal:'8374'},
            {setor:'IMAGEM – MAMOGRAFIA',ramal:'8352'},
            {setor:'IMAGEM – RAIO X',ramal:'8352'},
            {setor:'IMAGEM – RECEPÇÃO',ramal:'8327 / 8329'},
            {setor:'IMAGEM – RESULTADOS',ramal:'8355'},
            {setor:'IMAGEM – RNM ',ramal:'8357'},
            {setor:'IMAGEM -RADIOPROT.',ramal:'8384'},
            {setor:'IMAGEM TOMOGRAFIA',ramal:'8482'},
            {setor:'LABORATÓRIO PROLAB',ramal:'8382 / 8449'},
            {setor:'LAVANDERIA',ramal:'8448'},
            {setor:'LGPD / GESTÃO DE CONTRATOS',ramal:'8570'},
            {setor:'MANUTENÇÃO',ramal:'8458'},
            {setor:'MARC. CIRURGIAS',ramal:'8375'},
            {setor:'N. ATENÇÃO RESPIRATÓRIA',ramal:'8350'},
            {setor:'N. SEGURANÇA PACIENTE',ramal:'8541'},
            {setor:'ONCO. - FARMÁCIA',ramal:'8377'},
            {setor:'ONCO. - FAT',ramal:'8388'},
            {setor:'ONCO. –ENFERMAGEM',ramal:'8467'},
            {setor:'ONCO.- RECEP. ',ramal:'8442'},
            {setor:'OPME – CONTROLE',ramal:'8483'},
            {setor:'ORTO – CONSULT. ',ramal:'8330'},
            {setor:'ORTO – DR. LEONARDO',ramal:'8362'},
            {setor:'ORTO. –  CONSULT. ',ramal:'8338'},
            {setor:'PA – CONF. MÉDICO',ramal:'8444'},
            {setor:'PA - INTERNO',ramal:'8361 / 8575'},
            {setor:'PA - RECEPÇÃO',ramal:'8450'},
            {setor:'PORTARIA PRINCIPAL',ramal:'8421'},
            {setor:'POST0 1',ramal:'8454'},
            {setor:'POSTO 2',ramal:'8308 / 8443'},
            {setor:'POSTO 3',ramal:'8424 / 8363'},
            {setor:'RADIOT. –FÍSICO MÉDICO',ramal:'8398'},
            {setor:'RADIOTERAPIA – COORD.',ramal:'8585'},
            {setor:'RADIOTERAPIA – RECEP ',ramal:'8386'},
            {setor:'RECEP 2º ANDAR',ramal:'8520 / 8521'},
            {setor:'RECEP. 3º ANDAR',ramal:'8551'},
            {setor:'RECEPÇÃO 3ª AND',ramal:'8501'},
            {setor:'RECEPÇÃO UTI NEO',ramal:'8581 / 8582'},
            {setor:'RECURSO DE GLOSAS',ramal:'8345'},
            {setor:'RELAC. COM CLIENTES ',ramal:'8302'},
            {setor:'S. CONVÊNIOS ',ramal:'8426 / 8416'},
            {setor:'SERVIÇO DE ANESTESIA',ramal:'8469'},
            {setor:'SERVIÇO SOCIAL',ramal:'8475'},
            {setor:'SETOR DE AUTORIZAÇÃO',ramal:'8324'},
            {setor:'SHL (Higieniz.) / PGRSS',ramal:'8348'},
            {setor:'SND',ramal:'8465'},
            {setor:'SND – Coordenação',ramal:'8378'},
            {setor:'STI',ramal:'8479'},
            {setor:'TELEFONISTA (PABX)',ramal:'9'},
            {setor:'TESOURARIA',ramal:'8429'},
            {setor:'ULTRASSONOGRAFIA',ramal:'8371 / 8474'},
            {setor:'UNACON (FATURAMENTO)',ramal:'8461'},
            {setor:'UNACON AUDITORIA ',ramal:'8484'},
            {setor:'UTI - AUDITORIA',ramal:'8383'},
            {setor:'UTI – SECRETÁRIA',ramal:'8488'},
            {setor:'UTI 1',ramal:'8486 / 8495'},
            {setor:'UTI 2',ramal:'8456'},
            {setor:'UTI COORDENAÇÃO',ramal:'8379'}            
        ]
        setLoading(false);
        setDescricao('');
        setListChamados(result)
    };
    const findRamais = async () =>{
        setListChamados([]);
        setLoading(true);
        const result = [
            {setor:'ALMOX. ',ramal:'8455'},
            {setor:'ALMOX. Coordenação',ramal:'8446'},
            {setor:'AMBULAT. UNACON',ramal:'8318'},
            {setor:'ARQUIVO',ramal:'8472'},
            {setor:'ATEND. PARTICULAR',ramal:'8492'},
            {setor:'AUDITORIA',ramal:'8490 / 8445'},
            {setor:'C. MÉDICAS (REPASSE)',ramal:'8431'},
            {setor:'CALL CENTER',ramal:'8367'},
            {setor:'CALL CENTER (whatsapp)',ramal:'8304'},
            {setor:'CARDIO – Coordenação ',ramal:'8351'},
            {setor:'CARDIO – RECEPÇÃO',ramal:'8336 / 8325'},
            {setor:'CCIH',ramal:'8447'},
            {setor:'CENTRO CIRÚRGICO',ramal:'8452'},
            {setor:'CENTRO CIRÚRGICO CONFORTO',ramal:'8432'},
            {setor:'CICATRIMED',ramal:'8487'},
            {setor:'CME',ramal:'8471'},
            {setor:'COMUNICAÇÃO',ramal:'8349'},
            {setor:'CONTABILIDADE ',ramal:'8453'},
            {setor:'DIRETORIA FINANCEIRA',ramal:'8468'},
            {setor:'DIRETORIA TÉCNICA',ramal:'8464'},
            {setor:'DR. JÓ LUIS',ramal:'8499'},
            {setor:'EDUCAÇÃO',ramal:'8399'},
            {setor:'ENDOSCOPIA INTERNO',ramal:'8413'},
            {setor:'ENDOSCOPIA RECEPÇÃO',ramal:'8463'},
            {setor:'FARMÁCIA CENTRAL',ramal:'8494'},
            {setor:'FARMÁCIA COORDEN.',ramal:'8395'},
            {setor:'FATURAMENTO',ramal:'8422 / 8561'},
            {setor:'FATURAMENTO  - Gerência',ramal:'8470'},
            {setor:'FINANCEIRO ',ramal:'8496'},
            {setor:'G. CUSTOS',ramal:'8453'},
            {setor:'G. DE PESSOAS',ramal:'8457'},
            {setor:'G. QUALIDADE',ramal:'8349'},
            {setor:'GER. ENFERMAGEM',ramal:'8462'},
            {setor:'GER. LEITOS',ramal:'8380'},
            {setor:'GERENCIA HOTELARIA',ramal:'8580'},
            {setor:'HEMOD. – DR. FÁBIO',ramal:'8314'},
            {setor:'HEMOD. – ENF.',ramal:'8332'},
            {setor:'HEMOD. – RECEPÇÃO',ramal:'8339'},
            {setor:'HOSPITAL DAY',ramal:'8548'},
            {setor:'IMAGEM - AUTORIZAÇÃO',ramal:'8385'},
            {setor:'IMAGEM – DRA. JULIANA',ramal:'8354'},
            {setor:'IMAGEM - ENFERMAGEM',ramal:'8384'},
            {setor:'IMAGEM – FATURAMENTO',ramal:'8333'},
            {setor:'IMAGEM – LAUDOS',ramal:'8374'},
            {setor:'IMAGEM – MAMOGRAFIA',ramal:'8352'},
            {setor:'IMAGEM – RAIO X',ramal:'8352'},
            {setor:'IMAGEM – RECEPÇÃO',ramal:'8327 / 8329'},
            {setor:'IMAGEM – RESULTADOS',ramal:'8355'},
            {setor:'IMAGEM – RNM ',ramal:'8357'},
            {setor:'IMAGEM -RADIOPROT.',ramal:'8384'},
            {setor:'IMAGEM TOMOGRAFIA',ramal:'8482'},
            {setor:'LABORATÓRIO PROLAB',ramal:'8382 / 8449'},
            {setor:'LAVANDERIA',ramal:'8448'},
            {setor:'LGPD / GESTÃO DE CONTRATOS',ramal:'8570'},
            {setor:'MANUTENÇÃO',ramal:'8458'},
            {setor:'MARC. CIRURGIAS',ramal:'8375'},
            {setor:'N. ATENÇÃO RESPIRATÓRIA',ramal:'8350'},
            {setor:'N. SEGURANÇA PACIENTE',ramal:'8541'},
            {setor:'ONCO. - FARMÁCIA',ramal:'8377'},
            {setor:'ONCO. - FAT',ramal:'8388'},
            {setor:'ONCO. –ENFERMAGEM',ramal:'8467'},
            {setor:'ONCO.- RECEP. ',ramal:'8442'},
            {setor:'OPME – CONTROLE',ramal:'8483'},
            {setor:'ORTO – CONSULT. ',ramal:'8330'},
            {setor:'ORTO – DR. LEONARDO',ramal:'8362'},
            {setor:'ORTO. –  CONSULT. ',ramal:'8338'},
            {setor:'PA – CONF. MÉDICO',ramal:'8444'},
            {setor:'PA - INTERNO',ramal:'8361 / 8575'},
            {setor:'PA - RECEPÇÃO',ramal:'8450'},
            {setor:'PORTARIA PRINCIPAL',ramal:'8421'},
            {setor:'POST0 1',ramal:'8454'},
            {setor:'POSTO 2',ramal:'8308 / 8443'},
            {setor:'POSTO 3',ramal:'8424 / 8363'},
            {setor:'RADIOT. –FÍSICO MÉDICO',ramal:'8398'},
            {setor:'RADIOTERAPIA – COORD.',ramal:'8585'},
            {setor:'RADIOTERAPIA – RECEP ',ramal:'8386'},
            {setor:'RECEP 2º ANDAR',ramal:'8520 / 8521'},
            {setor:'RECEP. 3º ANDAR',ramal:'8551'},
            {setor:'RECEPÇÃO 3ª AND',ramal:'8501'},
            {setor:'RECEPÇÃO UTI NEO',ramal:'8581 / 8582'},
            {setor:'RECURSO DE GLOSAS',ramal:'8345'},
            {setor:'RELAC. COM CLIENTES ',ramal:'8302'},
            {setor:'S. CONVÊNIOS ',ramal:'8426 / 8416'},
            {setor:'SERVIÇO DE ANESTESIA',ramal:'8469'},
            {setor:'SERVIÇO SOCIAL',ramal:'8475'},
            {setor:'SETOR DE AUTORIZAÇÃO',ramal:'8324'},
            {setor:'SHL (Higieniz.) / PGRSS',ramal:'8348'},
            {setor:'SND',ramal:'8465'},
            {setor:'SND – Coordenação',ramal:'8378'},
            {setor:'STI',ramal:'8479'},
            {setor:'TELEFONISTA (PABX)',ramal:'9'},
            {setor:'TESOURARIA',ramal:'8429'},
            {setor:'ULTRASSONOGRAFIA',ramal:'8371 / 8474'},
            {setor:'UNACON (FATURAMENTO)',ramal:'8461'},
            {setor:'UNACON AUDITORIA ',ramal:'8484'},
            {setor:'UTI - AUDITORIA',ramal:'8383'},
            {setor:'UTI – SECRETÁRIA',ramal:'8488'},
            {setor:'UTI 1',ramal:'8486 / 8495'},
            {setor:'UTI 2',ramal:'8456'},
            {setor:'UTI COORDENAÇÃO',ramal:'8379'}            
        ]
        setLoading(false);
        const res = result.filter((item =>item.setor.indexOf(descricao.toUpperCase()) > -1))/* essa função serve como um 'like' para buscar no array*/
        setListChamados(res)
    }
    return(
        <C.Container>
            <C.inpt
                placeholder="Digite para pesquisar" 
                placeholderTextColor="#161b22"
                value={descricao}
                onChangeText={t=>setDescricao(t)}
                onEndEditing={findRamais}
                returnKeyType="search"
                selectTextOnFocus
            ></C.inpt>

            <C.List 
                data={listChamados} 
                onRefresh={MYOS}
                refreshing={loading}
                renderItem={({item})=><WallRamais data={item}/>} 
            />
        </C.Container>
    );
};
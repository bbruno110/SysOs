import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useStateValue } from "../../Context/StateContext";

import C from './style';

export default () =>{
    const navigation = useNavigation();
    const [context,dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    return(
        <C.Container>  
                <C.Scroller>
                    { loading &&
                        <C.LoadingIcon  color ="#0AB4AF" size="large"/>
                    }
                </C.Scroller>
        </C.Container>
    );
}
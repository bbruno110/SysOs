import React, {useContext, createContext, useReducer} from 'react';
import UserReducer from '../Reducers/UserReducer';

const initalState = {
    user: UserReducer()
};
const MainReducer = (state, action )=>({
    user: UserReducer(state.user, action)
});
export const StateContext = createContext();
export const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(MainReducer, initalState);
    return(
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);
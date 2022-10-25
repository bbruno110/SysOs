import { legacy_createStore as createStore } from "redux"; 
import Reducers from './Reducers/index';


const Store = createStore(Reducers);

export default Store;
import { createStore, combineReducers } from 'redux';
import {isAdmin} from '../Reducers/AdminReducer'
import { isLogin } from "../Reducers/LoginReducer";
import {UserData} from "../Reducers/UserReducer";
import {searchData} from "../Reducers/SearchReducer";

var rootReducer = combineReducers({isAdmin,isLogin,UserData,searchData});

var Store = createStore(rootReducer);

export default Store;
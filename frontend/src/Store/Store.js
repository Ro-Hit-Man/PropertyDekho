import { createStore, combineReducers } from 'redux';
import {canPostProperty} from '../Reducers/PostPropertyReducer'
import { isLogin } from "../Reducers/LoginReducer";
import {UserData} from "../Reducers/UserReducer";
import {searchData} from "../Reducers/SearchReducer";

var rootReducer = combineReducers({canPostProperty,isLogin,UserData,searchData});

var Store = createStore(rootReducer);

export default Store;
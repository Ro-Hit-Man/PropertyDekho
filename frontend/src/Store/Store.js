import { createStore, combineReducers } from 'redux';
import {canPostProperty} from '../Reducers/PostPropertyReducer'
import { isLogin } from "../Reducers/LoginReducer";
import {UserData} from "../Reducers/UserReducer";

var rootReducer = combineReducers({canPostProperty,isLogin,UserData});

var Store = createStore(rootReducer);

export default Store;
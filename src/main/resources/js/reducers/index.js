import { combineReducers } from 'redux';
import {userAuthorized, userInfo, userRegistered} from "./verification";

const reducer =  combineReducers({
    userRegistered,
    userAuthorized,
    userInfo
});

export default reducer;
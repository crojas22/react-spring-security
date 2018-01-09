import { combineReducers } from 'redux';
import {userAuthorized, userInfo, userRegistered} from "./verification";
import {userEvents} from "./events";

const reducer =  combineReducers({
    userRegistered,
    userAuthorized,
    userInfo,
    userEvents
});

export default reducer;
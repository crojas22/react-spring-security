import { combineReducers } from 'redux';
import { userAuthorized, userInfo, userRegistered } from "./verification";
import { userEvents } from "./events";
import { alertMessage } from "./alert";

const reducer =  combineReducers({
    userRegistered,
    userAuthorized,
    userInfo,
    userEvents,
    alertMessage
});

export default reducer;
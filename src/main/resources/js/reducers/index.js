import { combineReducers } from 'redux';
import { userAuthorized, userInfo, userRegistered } from "./verification";
import { userEvents } from "./events";
import { alertMessage } from "./alert";
import { userContacts } from "./contacts";

const reducer =  combineReducers({
    userRegistered,
    userAuthorized,
    userInfo,
    userEvents,
    alertMessage,
    userContacts
});

export default reducer;
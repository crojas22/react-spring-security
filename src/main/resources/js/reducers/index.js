import { combineReducers } from 'redux';
import { userAuthorized, userRegistered } from "./verification";

const reducer =  combineReducers({
    userRegistered,
    userAuthorized
});

export default reducer;
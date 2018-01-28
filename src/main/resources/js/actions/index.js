import Cookies from 'universal-cookie';
import {
    loginApi, registerApi, getUserInfoApi, axiosBodyApi, axiosPathApi
} from "../api";
import { getMessageAction } from "./alert";

const cookie = new Cookies();

export const didRegister = bool => {
    return {
        type: "REGISTRATION_SUCCESS",
        registered: bool
    }
};

export const isAuthorized = bool => {
    return {
        type: "AUTHORIZED_USER",
        authorized: bool
    }
};

export const getUserInfo = payload => {
    return {
        type: "USER_INFO",
        payload
    }
};

export const getUserEvents = payload => {
    return {
        type: "USER_EVENTS",
        payload
    }
};

export const getUserContacts = payload => {
    return {
        type: "USER_CONTACTS",
        payload
    }
};

export const removeUserInfo = () => {
    return {
        type: "REMOVE_USER_INFO"
    }
};

export const registerAction = (newUser, history) => {
    return(dispatch) => {
        registerApi(newUser).then(resp => {
            if (resp.status === 201) {
                dispatch(didRegister(true));
                history.push('/login');
            }
        })
            .catch(error => dispatch(getMessageAction(error.response.data.errorMessage, true, "danger")))
    }
};

export const loginAction = (user, history) => {
    return(dispatch) => {
        loginApi(user).then(resp => {
            if (resp.status === 200) {
                cookie.set("token", resp.headers.authorization);
                dispatch(isAuthorized(true));
                history.push("/calendar");
            }
        })
            .catch(error => dispatch(getMessageAction(error.response.data.message, true, "danger")))
    }
};

export const logoutAction = history => {
    return (dispatch) => {
        dispatch(isAuthorized(false));
        dispatch(removeUserInfo());
        cookie.remove('token', { path: '/' });
        history.push('/login');
    }
};

export const getUserInfoAction = history => {
    return(dispatch) => {
        const token = cookie.get('token');
        if (token) {
            getUserInfoApi(token).then(resp => {
                if (resp.status === 202) {
                    dispatch(isAuthorized(true));
                    dispatch(getUserInfo(resp.data.user));
                    dispatch(getUserEvents(resp.data.events));
                    dispatch(getUserContacts(resp.data.contacts))
                } else {
                    dispatch(isAuthorized(false));
                    dispatch(removeUserInfo());
                    history.push("/login");
                }
            })
                .catch(error => console.log(error))
        } else {
            history.push("/login")
        }
    }
};

// Crud Events

// Post
export const axiosBodyAction = (body, url, method, func) => {
    return (dispatch) => {
        const token = cookie.get("token");
        axiosBodyApi(body, url, method, token).then(resp => {
            dispatch(func(resp.data));
        })
            .catch(error => console.log(error.message))
    }
};

// Remove , Complete, Edit
export const axiosPathAction = (url, method, func) => {
    return (dispatch) => {
        const token = cookie.get('token');
        axiosPathApi(url, method, token).then(resp => {
            dispatch(func(resp.data));
        })
            .catch(error => console.log(error.message))
    }
};
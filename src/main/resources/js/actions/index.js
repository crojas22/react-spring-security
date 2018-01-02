import Cookies from 'universal-cookie';
import {loginApi, registerApi, verificationTestApi} from "../api";

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
            .catch(error => console.log(error.response))
    }
};

export const loginAction = user => {
    return(dispatch) => {
        loginApi(user).then(resp => {
            if (resp.status === 200) {
                cookie.set("token", resp.headers.authorization);
                dispatch(isAuthorized(true));
                window.location.href = `${window.location.origin}`;
            }
        })
            .catch(error => console.log(error.response))
    }
};

export const verificationTest = history => {
    return(dispatch) => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        if (token) {
            verificationTestApi(token).then(resp => {
                if (resp.status === 202) {
                    dispatch(isAuthorized(true));
                    dispatch(getUserInfo(resp.data))
                } else {
                    dispatch(isAuthorized(false));
                    dispatch(removeUserInfo());
                    history.push("/login");
                }
            })
                .catch(error => console.log(error.response))
        } else {
            history.push("/login")
        }
    }
};
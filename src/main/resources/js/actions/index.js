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

export const registerAction = (newUser, history) => {
    return(dispatch) => {
        registerApi(newUser).then(resp => {
            if (resp.status === 201) {
                dispatch(didRegister(true));
                history.push('/login');
            }
        })
            .catch(error => alert(error.response))
    }
};

export const loginAction = (user, history) => {
    return(dispatch) => {
        loginApi(user).then(resp => {
            if (resp.status === 200) {
                cookie.set("token", resp.headers.authorization);
                dispatch(isAuthorized(true));
                history.push("/");
            }
        })
            .catch(error => alert(error.response))
    }
};

export const verificationTest = () => {
    return(dispatch) => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        console.log(token)
        token ? verificationTestApi(token).then(resp => {
            console.log(resp);
            console.log(token);
        }) : console.log(token)
    }
};
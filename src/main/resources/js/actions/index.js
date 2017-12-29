import {loginApi, registerApi} from "../api";

export const didRegister = bool => {
    return {
        type: "REGISTRATION_SUCCESS",
        registered: bool
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

export const loginAction = (user, history) => {
    return(dispatch) => {
        loginApi(user).then(resp => {
            console.log(resp);
        })
            .catch(error => console.log(error.response))
    }
};
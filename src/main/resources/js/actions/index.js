import { registerApi } from "../api";

export const didRegister = bool => {
    return {
        type: "REGISTRATION_SUCCESS",
        registered: bool
    }
};

export const registerAction = newUser => {
    return(dispatch) => {
        registerApi(newUser).then(resp => {
            console.log(resp);
            dispatch(didRegister(true));
        })
            .catch(error => console.log(error.response))
    }
};
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
            dispatch(didRegister(true));
            console.log(resp);
        })
    }
};
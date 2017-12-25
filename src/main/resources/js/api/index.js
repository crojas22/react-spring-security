import axios from 'axios';

const apiUrl = rest => `/${rest}`;

export const registerApi = newUser => {
    return axios({
        url: apiUrl("register"),
        method: "post",
        data: newUser
    })
};
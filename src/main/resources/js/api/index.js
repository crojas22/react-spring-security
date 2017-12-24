import axios from 'axios';

const apiUrl = rest => `/api/v1/${rest}`;

export const registerApi = newUser => {
    return axios({
        url: apiUrl("register"),
        method: "post",
        data: newUser
    })
};
import axios from 'axios';

const apiUrl = rest => `/${rest}`;

export const registerApi = newUser => {
    return axios({
        url: apiUrl("register"),
        method: "post",
        data: newUser
    })
};

export const loginApi = user => {
    return axios({
        url: apiUrl("login"),
        method: "post",
        data: user
    })
};

export const getUserInfoApi = token => {
    return axios({
        url: "/verification",
        method: "get",
        headers: { Authorization: `Bearer ${token}` }
    })
};
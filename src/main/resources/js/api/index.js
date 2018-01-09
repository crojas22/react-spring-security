import axios from 'axios';

const apiUrl = rest => `/api/${rest}`;

export const registerApi = newUser => {
    return axios({
        url: "/register",
        method: "post",
        data: newUser
    })
};

export const loginApi = user => {
    return axios({
        url: "/login",
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

// Crud Event

// Post
export const createEventApi = (event, token) => {
    return axios({
        url: apiUrl("create"),
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: event
    })
};
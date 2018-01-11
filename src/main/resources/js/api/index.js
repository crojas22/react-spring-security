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

// Crud EventList

// Post
export const axiosBodyApi = (body, url, method, token) => {
    return axios({
        url: apiUrl(url),
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        data: body
    })
};

// Remove, Complete, Edit
export const axiosPathApi = (url, method, token) => {
    return axios({
        url: apiUrl(url),
        method: method,
        headers: { Authorization: `Bearer ${token}` }
    })
};
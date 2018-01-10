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
export const createEventApi = (event, token) => {
    return axios({
        url: apiUrl("create"),
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: event
    })
};

// Remove
export const removeEventApi = (token, item_id) => {
    return axios({
        url: apiUrl(`delete/${item_id}`),
        method: "delete",
        headers: { Authorization: `Bearer ${token}` }
    })
};
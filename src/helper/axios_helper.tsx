import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: any) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

export const request = (method: any, url: any, data: any) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};
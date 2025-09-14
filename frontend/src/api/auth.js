import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const register = (data)  => {
    return axios.post(`${apiUrl}/auth/register`, data, { headers: { 'Content-Type': 'application/json' }});
};

const login = (data) => {
    return axios.post(`${apiUrl}/auth/login`, data, { headers: { 'Content-Type': 'application/json' }});
};

export { register, login };
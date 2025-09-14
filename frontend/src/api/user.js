import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getCurrentUser = (token) => {
    return axios.get(`${apiUrl}/user`, { headers: { Authorization: `Bearer ${token}` }});
};

const editCurrentUser = ({ token, data }) => {
    return axios.put(`${apiUrl}/user/edit`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }});
};

export { getCurrentUser, editCurrentUser };
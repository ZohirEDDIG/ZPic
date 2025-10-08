import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getCurrentUser = (token) => {
    return axios.get(`${apiUrl}/user`, { headers: { Authorization: `Bearer ${token}` }});
};

const editCurrentUser = ({ token, data }) => {
    return axios.put(`${apiUrl}/user/edit`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }});
};

const getCurrentUserUploads = (token) => {
    return axios.get(`${apiUrl}/user/uploads`, { headers: { Authorization: `Bearer ${token}` }});
}

const getCurrentUserBookmarks = (token) => {
    return axios.get(`${apiUrl}/user/bookmarks`, { headers: { Authorization: `Bearer ${token}` }});
}

export { getCurrentUser, editCurrentUser, getCurrentUserUploads, getCurrentUserBookmarks };
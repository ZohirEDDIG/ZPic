import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadWallpaper = ({ data, token }) => {
    return axios.post(`${apiUrl}/wallpaper/upload`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }});
};
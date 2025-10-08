import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getWallpapers = () => {
    return axios.get(`${apiUrl}/wallpapers`);
};

const getWallpaper = (wallpaperId) => {
    return axios.get(`${apiUrl}/wallpapers/${wallpaperId}`);
};

const getSimilarWallpapers = (tags) => {
    return axios.post(`${apiUrl}/wallpapers/similar`, { tags });
};

const uploadWallpaper = ({ data, token }) => {
    return axios.post(`${apiUrl}/wallpapers/upload`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }});
};

export { getWallpapers, getWallpaper, getSimilarWallpapers,  uploadWallpaper }
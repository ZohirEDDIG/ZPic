import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getWallpapers = (currrentPage, limit) => {
    return axios.get(`${apiUrl}/wallpapers?page=${currrentPage}&limit=${limit}`);
};

export{ getWallpapers };
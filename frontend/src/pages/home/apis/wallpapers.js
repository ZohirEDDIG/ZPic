import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getWallpapers = (currentPage, limit) => {
    return axios.get(`${apiUrl}/wallpapers?page=${currentPage}&limit=${limit}`);
};

export{ getWallpapers };
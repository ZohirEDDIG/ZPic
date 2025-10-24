import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getWallpapers = (currrentPage, limit) => {
    return axios.get(`${apiUrl}/wallpapers?page=${currrentPage}&limit=${limit}`);
};

const getCategoryWallpapers = (category, CategoryWallpaperCurrentPage, limit) => {
    return axios.get(`${apiUrl}/wallpapers/category/${category}?page=${CategoryWallpaperCurrentPage}&limit=${limit}`);
};

export{ getWallpapers, getCategoryWallpapers };
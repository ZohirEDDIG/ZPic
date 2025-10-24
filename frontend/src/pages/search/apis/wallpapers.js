import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getSearchWallpapers = (query) => {
    return axios.get(`${apiUrl}/wallpapers/search/${query}`);
};
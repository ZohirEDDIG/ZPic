import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const getCategoryWallpapers = (category, currentPage, limit) => {
    console.log(category, currentPage, limit);
    return axios.get(`${apiUrl}/wallpapers/category/${category}?page=${currentPage}&limit=${limit}`);
};

export{ getCategoryWallpapers };
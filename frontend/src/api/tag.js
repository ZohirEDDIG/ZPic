import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCategoryTags = (categoryId) => {
    return axios.get(`${apiUrl}/tags/categoryId=${categoryId}`);
};
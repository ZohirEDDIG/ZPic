import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCategories = () => {
    return axios.get(`${apiUrl}/categories`);
};
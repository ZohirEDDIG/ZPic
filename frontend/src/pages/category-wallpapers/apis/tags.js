import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getCategoryTags = (category) => {
    return axios.get(`${apiUrl}/tags/category/${category}`);
};

export { getCategoryTags }; 
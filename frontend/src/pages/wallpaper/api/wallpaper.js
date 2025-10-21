import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getWallpaper = (wallpaperId) => {
    return axios.get(`${apiUrl}/wallpapers/${wallpaperId}`);
};

const getSimilarWallpapers = (tags) => {
    return axios.post(`${apiUrl}/wallpapers/similar`, { tags });
};

const likeWallpaper = ({ wallpaperId, token }) => {
    return axios.post(`${apiUrl}/wallpapers/like/${wallpaperId}`, {}, { headers: { Authorization: `Bearer ${token}` }});
};

const bookmarkWallpaper = ({ wallpaperId, token }) => {
    console.log({ wallpaperId, token });
    return axios.post(`${apiUrl}/wallpapers/bookmark/${wallpaperId}`, {}, { headers: { Authorization: `Bearer ${token}` }});
};



export { getWallpaper, getSimilarWallpapers, likeWallpaper, bookmarkWallpaper }
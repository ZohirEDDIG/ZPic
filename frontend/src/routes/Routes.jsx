import { Routes as RRRoutes, Route, Navigate } from 'react-router-dom';
import { Home, Wallpaper, Login, Account, Register, Upload, Profile, CategoryWallpapers } from '../pages';
import { AccountProvider, UploadProvider, ProfileProvider, WallpapersProvider } from '../contexts'; 
import  WallpaperProvider from '../pages/wallpaper/context/WallpaperProvider'; 
import { WallpaperNotFound } from '../pages/wallpaper/components'; 


const Routes = () => {
    const localStorageLanguage = localStorage.getItem('i18nextLng');

    return (
        <RRRoutes>
            <Route path='/:language' element={<Home />} />
            <Route path='/:language/category/:category' element={<CategoryWallpapers />} />
            <Route path='/:language/image/:wallpaperId' element={<WallpaperProvider><Wallpaper /></WallpaperProvider>} />
            <Route path='/:language/account/login' element={<Login />} />
            <Route path='/:language/account/register' element={<Register />} />
            <Route path='/:language/account' element={<AccountProvider><Account /></AccountProvider>} />
            <Route path='/:language/upload' element={<UploadProvider><Upload /></UploadProvider>} />
            <Route path='/:language/profile/:username' element={<ProfileProvider><Profile /></ProfileProvider>} />
            <Route path='/' element={<Navigate to={`/${localStorageLanguage ? localStorageLanguage : 'en'}`} replace /> } />
            <Route path='/:language/wallpaper-not-found' element={<WallpaperNotFound />} />
        </RRRoutes>
    );
};

export default Routes;
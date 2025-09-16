import { Routes as RRRoutes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Account, Register, Upload } from '../pages';

const Routes = () => {
    const localStorageLanguage = localStorage.getItem('i18nextLng');

    return (
        <RRRoutes>
            <Route path='/:language' element={<Home />} />
            <Route path='/:language/account/login' element={<Login />} />
            <Route path='/:language/account/register' element={<Register />} />
            <Route path='/:language/account' element={<Account />} />
            <Route path='/:language/upload' element={<Upload />} />
            <Route path='/' element={<Navigate to={`/${localStorageLanguage ? localStorageLanguage : 'en'}`} replace /> } />
        </RRRoutes>
    );
};

export default Routes;
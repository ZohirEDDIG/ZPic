import { Routes as RRRoutes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Account, Register, Upload } from '../pages';
import { GuestRoute, ProtectedRoute } from '../components/auth';

const Routes = () => {
    const localStorageLanguage = localStorage.getItem('i18nextLng');

    return (
        <RRRoutes>
            <Route path='/:language' element={<Home />} />
            <Route path='/:language/account/login' element={<GuestRoute><Login /></GuestRoute>} />
            <Route path='/:language/account/register' element={<GuestRoute><Register /></GuestRoute>} />
            <Route path='/:language/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path='/:language/upload' element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path='/' element={<Navigate to={`/${localStorageLanguage ? localStorageLanguage : 'en'}`} replace /> } />
        </RRRoutes>
    );
};

export default Routes;
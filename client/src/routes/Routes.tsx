import {  Routes as RRRoutes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Register } from '../pages';

const Routes = () => {
  const localStorageLanguage: string | null = localStorage.getItem('i18nextLng');

  return (
      <RRRoutes>
        <Route path='/:language' element={<Home />} />
        <Route path='/:language/login' element={<Login />} />
        <Route path='/:language/register' element={<Register />} />
        <Route path='/' element={<Navigate to={`/${localStorageLanguage ? localStorageLanguage : 'en'}`} replace /> }/>
      </RRRoutes>
  );
};

export default Routes;

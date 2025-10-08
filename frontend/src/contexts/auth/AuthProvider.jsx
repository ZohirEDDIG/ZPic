import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import { login, register } from '../../api/auth';
import { getCurrentUser } from '../../api/user';
import { useDarkTheme } from '../index';
import { customToast } from '../../utils';


const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    
    const { t, i18n } = useTranslation();

    const { isDarkTheme } = useDarkTheme();

    const registerMutation = useMutation({ mutationFn:  (data) => register(data) });
    const loginMutation = useMutation({ mutationFn:  (data) => login(data) });

    useEffect(() => {
        if (registerMutation.isSuccess) {
            customToast(t(registerMutation.data.data.message),  '✅', isDarkTheme);
            navigate(`/${i18n.language}/account/login`, { replace: true });
        } 
    }, [registerMutation.isSuccess]);


    useEffect(() => {
        if (loginMutation.isSuccess) {
            customToast(t(loginMutation.data.data.message), '✅', isDarkTheme)
            setToken(loginMutation.data.data.token);
            localStorage.setItem('token', loginMutation.data.data.token);
            navigate(`/${i18n.language}`, { replace: true });
        } 
    }, [loginMutation.isSuccess]);

    const logout = (content, icon) => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        customToast(content, icon, isDarkTheme);
        navigate(`${i18n.language}/account/login`);
    };

    const getCurrentUserQuery = useQuery({ queryKey: ['user', token], queryFn: () => getCurrentUser(token), enabled: false });

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout(t('session_expired_please_login_again'), null);
                } else {
                    getCurrentUserQuery.refetch();
                }
            } catch {
                logout(t('session_expired_please_login_again'), null);
            } 
        }
    }, [token]);

    useEffect(() => {
        if (getCurrentUserQuery.isSuccess) {
            setUser(getCurrentUserQuery.data.data.user);
        }
        
        if(getCurrentUserQuery.isError) {
            logout(t(getCurrentUserQuery.error.response.data.error), null);
        }
    }, [getCurrentUserQuery.isSuccess, getCurrentUserQuery.isError, getCurrentUserQuery.data]);


    const value = {
        token, setToken, 
        user, setUser, 
        registerMutation, 
        loginMutation,
        logout,
        getCurrentUserQuery,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  );
};


export default AuthProvider;
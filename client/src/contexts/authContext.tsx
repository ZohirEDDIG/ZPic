import { createContext,  useState,useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDarkTheme } from './index';


type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

type User = {
    username: string;
    email: string;
    password: string;
    avatar: string;
    about: string;
    website: string;
    googleAuth: boolean;
};

type Decoded = {
    exp: number;
    iat: number;
    user: User;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(window.localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    const { isDarkTheme } = useDarkTheme();

    const { t, i18n } = useTranslation();

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        toast(t('user_logged_out_successfully'), { icon: '✅', style: { backgroundColor: isDarkTheme ? '#373737' : '#ffffff', color: isDarkTheme ? 'white' : 'black' } });
        navigate(`${i18n.language}/account/login`);
    };

    useEffect(() => {
        if(token) {
            try {
                const decoded: Decoded = jwtDecode(token);

                if(typeof decoded.exp === 'number' && decoded.exp * 1000 < Date.now()) {
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
                    toast(t('session_expired_please_login_again'));
                } else {
                    setUser(decoded.user);
                }
            } catch {
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                toast(t('session_expired_please_login_again'));
            }

        } else {
            setUser(null);
        }

    }, [token]);

    const value: AuthContextType = {
        token, setToken, user, setUser, logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
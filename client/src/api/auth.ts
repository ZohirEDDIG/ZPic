import axios, { type AxiosResponse } from 'axios';
import type { RegisterFormValues } from '../pages/Register';
import type { LoginFormValues } from '../pages/Login';

const apiUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type RegisterResponse = {
    message: string;
};

type LoginResponse = {
    message: string;
    token: string;
};

const register = (data: RegisterFormValues) : Promise<AxiosResponse<RegisterResponse>>  =>{
    return axios.post(`${apiUrl}/auth/register`, data, { headers: { 'Content-Type': 'application/json' } });
};

const login = (data: LoginFormValues) : Promise<AxiosResponse<LoginResponse>>  =>{
    return axios.post(`${apiUrl}/auth/login`, data, { headers: { 'Content-Type': 'application/json' } });
};

export { register, login };
import axios from 'axios';
import { refreshToken } from './authService';
import { deleteAllCookies, deleteCookieByName } from '../utils/cookie';

const API = axios.create({
    baseURL: 'https://student-consulting.onrender.com/api',
    timeout: 5000
});

API.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await refreshToken();
                console.log('rf', response);
                const token = response.data?.token;
                deleteCookieByName('accessToken')
                document.cookie = `accessToken=${token}`;
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                deleteAllCookies();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;

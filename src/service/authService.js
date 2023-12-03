import { authHeaders, commonHeaders } from "../constant.js";
import { getCookieByName } from "../utils/cookie";
import API from "./api";


// Service
export const loginService = async (data) => {
    try {
        const response = await API.post('/auth/login', data, {
            headers: commonHeaders,
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.log(error.response);
        return error.response.data
    }
}

export const regsiterService = async (data) => {
    try {
        const response = await API.post('/auth/register', data, {
            headers: commonHeaders
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const logoutService = async () => {
    try {
        const response = await API.post('/auth/logout', {}, {
            headers: commonHeaders,
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getUserInfo = async () => {
    try {
        const response = await API.get('/auth/me', {
            headers: authHeaders(getCookieByName('accessToken'))
        })
        return response.data
    } catch (error) {
        console.log(error.response);
        return error.response.data
    }
}
export const refreshToken = async () => {
    try {
        const response = await API.post('/auth/refresh-token', {}, {
            headers: commonHeaders,
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error.response);
        return error.response.data
    }
}
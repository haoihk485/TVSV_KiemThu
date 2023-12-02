import { authHeaders } from "../../constant";
import { getCookieByName } from "../../utils/cookie";
import API from "../api";

export const depHGetUsers = async (params) => {
    try {
        const response = await API.get('/department-head/users', {
            headers: authHeaders(getCookieByName('accessToken')),
            params: params
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const DepHUpdateUserStatus = async (id) => {
    try {
        const response = await API.patch(`/department-head/users/${id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const DepHCreateCoun = async (data) => {
    try {
        const response = await API.post('/department-head/users', data, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const DepHGetCounDetail = async (id) => {
    try {
        const response = await API.get(`/department-head/users/${id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const DepHGetFieldUserDontHave = async(id) => {
    try {
        const response = await API.get(`/department-head/fields/users/${id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export const DepHAddUserField =  async(data) => {
    try {
        const response = await API.post(`/department-head/fields/users/${data.id}`, data.fieldIds,{
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
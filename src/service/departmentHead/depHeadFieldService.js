import { authHeaders } from "../../constant";
import { getCookieByName } from "../../utils/cookie";
import API from "../api";

export const depHGetFields = async (params) => {
    try {
        const response = await API.get('/departments/fields/my', {
            headers: authHeaders(getCookieByName('accessToken')),
            params: params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const depHGetFieldsNotInDep = async () => {
    try {
        const response = await API.get('/department-head/departments/fields', {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const depHAddDepField = async (data) => {
    try {
        const response = await API.post('/department-head/fields', data, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const depHDeleteField = async (id) => {
    try {
        const response = await API.delete(`/department-head/fields/${id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
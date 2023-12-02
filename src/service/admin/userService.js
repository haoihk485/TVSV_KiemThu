import { getCookieByName } from '../../utils/cookie'
import { authHeaders } from '../../constant.js'
import API from '../api'

export const adminGetUsers = async (params) => {
    try {
        const response = await API.get('/admin/users', {
            headers: authHeaders(getCookieByName('accessToken')),
            params: params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const userStatusUpdate = async (id) => {
    try {
        const response = await API.patch(`/admin/users/${id}`, {}, {
            headers: authHeaders(getCookieByName('accessToken'))
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addUser = async (data) => {
    try {
        const response = await API.post('/admin/users', data, {
            headers: authHeaders(getCookieByName('accessToken'))
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getUserDepIsNull = async (params) => {
    try {
        const response = await API.get('/admin/users/department-is-null', {
            headers: authHeaders(getCookieByName('accessToken')),
            params: params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const CoordinateUser = async (data) => {
    try {
        const response = await API.patch(`/admin/users/${data.userId}/departments/${data.depId}`, {}, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
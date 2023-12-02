import { data } from 'autoprefixer'
import { authHeaders, commonHeaders, authNoJsonHeaders } from '../../constant'
import { getCookieByName } from '../../utils/cookie.js'
import API from '../api.js'

export const getDepartments = async (params) => {
    try {
        const response = await API.get('/departments', {
            headers: commonHeaders,
            params: params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const updateUserStatus = async (id) => {
    try {
        const response = await API.patch(`/admin/departments/${id}`, {}, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const findDepById = async (id) => {
    try {
        const response = await API.get(`/departments/${id}`, {}, {
            headers: commonHeaders,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const updateDep = async (data, id) => {
    try {
        const response = await API.put(`/admin/departments/${id}`, data, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const createDep = async (data) => {
    try {
        const response = await API.post('/admin/departments', data, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getAllDepNameService = async (data) => {
    try {
        const response = await API.get('/departments/all')
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getDepUser = async (data) => {
    try {
        const response = await API.get(`/admin/users/departments/${data.id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
            params: data.params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const updateDepartmentHead = async (data) => {
    try {
        const response = await API.patch(`/admin/department-head/users/${data.userId}/departments/${data.depId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
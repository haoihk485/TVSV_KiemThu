import { authHeaders, commonHeaders } from "../../constant"
import { getCookieByName } from "../../utils/cookie"
import API from "../api"

export const UserGetDepList = async () => {
    try {
        const response = await API.get('/departments/all', {
            headers: commonHeaders,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const UserGetHome = async (params) => {
    try {
        const response = await API.get('/questions', {
            headers: commonHeaders,
            params: params
        })
        return response.data

    } catch (error) {
        return error.response.data
    }
}

export const UserGetDepFields = async (id) => {
    try {
        const response = await API.get(`/fields/departments/${id}`, {
            headers: authHeaders(getCookieByName('accessToken')),
        })
        return response.data

    } catch (error) {
        return error.response.data
    }
}
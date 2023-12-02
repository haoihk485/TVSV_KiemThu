import { authHeaders, commonHeaders } from "../../constant"
import API from "../api"
import { getCookieByName } from "../../utils/cookie"

export const getFields = async (params) => {
    try {
        const response = await API.get('/fields', {
            headers: commonHeaders,
            params: params
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const updateFieldStatus = async (id) => {
    try {
        const response = await API.patch(`admin/fields/${id}`, {},{
            headers: authHeaders(getCookieByName('accessToken'))
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addField = async (data) => {
    try {
        const response = await API.post('admin/fields', data, {
            headers: authHeaders(getCookieByName('accessToken'))
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
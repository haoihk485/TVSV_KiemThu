export const UserGetDepList = async () => {
    const response = await API.get('/department/all')
    return response.data
}
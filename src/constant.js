export const commonHeaders = {
    'Content-Type': 'application/json'
}

export const authHeaders = (token) => {
    return Object.assign({}, commonHeaders, { 'Authorization': `Bearer ${token}` })
}

export const authNoJsonHeaders = (token) => { return { 'Authorization': `Bearer ${token}` } }

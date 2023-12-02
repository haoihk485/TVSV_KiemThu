import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginService, regsiterService, logoutService, getUserInfo, refreshToken } from '../../service/authService.js'
import { addCookie, deleteAllCookies } from '../../utils/cookie.js'

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (data) => {
    const response = await loginService(data)
    return response
})

export const fetchRefreshToken = createAsyncThunk('auth/fetchRefreshToken', async () => {

    const response = await refreshToken()
    return response
})

export const fetchRegsiter = createAsyncThunk('auth/fetchRegister', async (data) => {
    const response = await regsiterService(data)
    return response
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
    const respone = await logoutService()
    return respone
})

export const fetchGetUserInfo = createAsyncThunk('auth/fetchGetUserInfo', async () => {
    const response = await getUserInfo()
    return response
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        error: null,
        isLoading: false,
        successRegister: false,
        user: null
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetSuccessRegister: (state) => {
            state.successRegister = false
        }
    },
    extraReducers: (builder) => {
        builder.
            // login case
            addCase(fetchLogin.pending, (state, action) => {
                state.error = null
                state.isLoading = true;
            }).
            addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                if (action.payload.success) {
                    document.cookie = `accessToken=${action.payload.data.token}`
                    state.isLoggedIn = true
                    state.user = action.payload.data
                } else {
                    state.error = action.payload.message
                }
            })
            //register case
            .addCase(fetchRegsiter.pending, (state, action) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(fetchRegsiter.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                    state.successRegister = true
                }
                else {
                    state.error = action.payload.message
                }
            })
            // logout case
            .addCase(fetchLogout.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(fetchLogout.fulfilled, (state) => {
                deleteAllCookies()
                state.isLoading = false
                state.isLoggedIn = false
            })
            .addCase(fetchLogout.rejected, (state) => {
                deleteAllCookies()
                state.isLoading = false
                state.isLoggedIn = false
            })
            //get user case
            .addCase(fetchGetUserInfo.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.isLoggedIn = true
                    state.user = action.payload.data
                }
                else {
                    state.error = action.payload.message
                }
            })
            //refreshToken case
            .addCase(fetchRefreshToken.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.isLoggedIn = true
                    state.user = action.payload.data
                    addCookie('accessToken', action.payload.data.token)
                } else {
                    deleteAllCookies()
                    state.isLoggedIn = false
                    state.error = action.payload.message
                }
            })
            .addCase(fetchGetUserInfo.rejected, (state, action) => {
                deleteAllCookies()
                state.isLoading = false
                state.isLoggedIn = false
                state.error = action.payload.message
            })
    }
})

export default authSlice.reducer
export const { resetError, resetSuccessRegister } = authSlice.actions



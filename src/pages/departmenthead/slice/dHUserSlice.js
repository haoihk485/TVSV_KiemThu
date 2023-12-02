import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DepHAddUserField, DepHCreateCoun, DepHGetCounDetail, DepHGetFieldUserDontHave, DepHUpdateUserStatus, depHGetUsers } from "../../../service/departmentHead/depHeadUserService";

export const fetchDHGetUsers = createAsyncThunk('dHUserSlice/fetchDHGetUsers', async (params) => {
    const response = await depHGetUsers(params)
    return response
})

export const fetchDHUpdateUserStatus = createAsyncThunk('dHUserSlice/fetchDHUpdateUserStatus', async (id) => {
    const response = await DepHUpdateUserStatus(id)
    return response
})

export const fetchDHCreateCoun = createAsyncThunk('dHUserSlice/fetchDHCreateCoun', async (data) => {
    const response = await DepHCreateCoun(data)
    return response
})

export const fetchDHGetCounDetail = createAsyncThunk('dHUserSlice/fetchDHGetCounDetail', async (id) => {
    const response = await DepHGetCounDetail(id)
    return response
})

export const fetchDHGetFieldCounDontHave = createAsyncThunk('dHUserSlice/fetchDHGetFieldCounDontHave', async (id) => {
    const response = await DepHGetFieldUserDontHave(id)
    return response
})

export const fetchDHAddUserField = createAsyncThunk('dHUserSlice/fetchDHAddUserField', async (data) => {
    const response = await DepHAddUserField(data)
    return response
})

const dHUserSlice = createSlice({
    name: 'dHUserSlice',
    initialState: {
        userList: null,
        message: { type: '', content: '' },
        user: null,
        fieldUserDontHave: [],
        totalPage: 0,
        isLoading: false
    },
    reducers: {
        resetMessage: state => {
            state.message = { type: '', content: '' }
        }
    },
    extraReducers: builder => {
        builder
            //getUsers case
            .addCase(fetchDHGetUsers.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHGetUsers.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.userList = action.payload.data.items
                    state.totalPage = action.payload.data.pages
                }
            })
            .addCase(fetchDHGetUsers.rejected, (state, action) => {
                state.isLoading = false
            })
            //updateUserStatus Case
            .addCase(fetchDHUpdateUserStatus.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHUpdateUserStatus.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.message = { type: 'success', content: 'Cập nhật trạng thái người dùng thành công' }
                } else {
                    state.message = { type: 'error', content: 'Cập nhật trạng thái người dùng thất bại' }
                }
            })
            .addCase(fetchDHUpdateUserStatus.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: 'Cập nhật trạng thái người dùng thất bại' }
            })
            //createCoun case
            .addCase(fetchDHCreateCoun.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDHCreateCoun.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload);
                if (action.payload.success) {
                    state.message = { type: 'success', content: 'Thêm tư vấn viên thành công' }
                } else {
                    state.message = { type: 'error', content: action.payload.message }
                }
            })
            .addCase(fetchDHCreateCoun.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload.message }
            })
            // getCounDetail
            .addCase(fetchDHGetCounDetail.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHGetCounDetail.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.user = action.payload.data
                }
            })
            .addCase(fetchDHGetCounDetail.rejected, (state, action) => {
                state.isLoading = false
            })
            // get field coun dont have case
            .addCase(fetchDHGetFieldCounDontHave.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHGetFieldCounDontHave.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.fieldUserDontHave = action.payload.data
                }
            })
            .addCase(fetchDHGetFieldCounDontHave.rejected, (state, action) => {
                state.isLoading = false
            })
            // DH add fields for user case
            .addCase(fetchDHAddUserField.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHAddUserField.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.message = { type: 'success', content: action.payload.message || 'Thêm lĩnh vực cho tư vấn viên thành công' }
                } else
                    state.message = { type: 'error', content: action.payload.message || 'Thêm lĩnh vực cho tư vấn viên không thành công' }
            })
            .addCase(fetchDHAddUserField.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload.message || 'Thêm lĩnh vực cho tư vấn viên không thành công' }
            })

    }
})

export default dHUserSlice.reducer
export const { resetMessage } = dHUserSlice.actions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoordinateUser, addUser, adminGetUsers, getUserDepIsNull, userStatusUpdate } from "../../../service/admin/userService";

export const fetchAdminGetUsers = createAsyncThunk('adminUser/fetchAdminGetUsers', async (params) => {
    const response = await adminGetUsers(params)
    return response
})

export const fetchUserStatusUpdate = createAsyncThunk('adminUser/fetchUserStatusUpdate', async (id) => {
    const response = await userStatusUpdate(id)
    return response
})

export const fetchCreateUser = createAsyncThunk('adminUser/fetchCreateUser', async (data) => {
    const response = await addUser(data)
    return response
})

export const fetchGetUserDepIsNull = createAsyncThunk('adminUser/fetchGetUserDepIsNull', async (params) => {
    const response = await getUserDepIsNull(params)
    return response
})

export const fetchCoordinateUser = createAsyncThunk('adminUser/fetchCoordinateUser', async(data)=> {
    const response = await CoordinateUser(data)
    return response
})

const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: {
        isLoading: false,
        userList: null,
        userDepIsNullList: null,
        userDepIsNullTotalPage: 0,
        page: 0,
        totalPage: 0,
        message: { type: '', content: '' }
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        resetMessage: (state) => {
            state.message = { type: '', content: '' }
        }
    },
    extraReducers: builder => {
        builder
            //getUsers case
            .addCase(fetchAdminGetUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminGetUsers.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload);
                if (action.payload.success) {
                    state.userList = action.payload?.data.items
                    state.page = action.payload?.data.page
                    state.totalPage = action.payload?.data.pages
                }
            })
            .addCase(fetchAdminGetUsers.rejected, (state) => {
                state.isLoading = false;
            })
            //updateUserStatus case
            .addCase(fetchUserStatusUpdate.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUserStatusUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.message = { type: 'success', content: 'Thay đổi trạng thái người dùng thành công' }
                } else {
                    state.message = { type: 'success', content: 'Thay đổi trạng thái người dùng không thành công' }
                }
            })
            .addCase(fetchUserStatusUpdate.rejected, state => {
                state.isLoading = false
                state.message = { type: 'success', content: 'Thay đổi trạng thái người dùng không thành công' }

            })
            //addUser case
            .addCase(fetchCreateUser.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchCreateUser.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload.success);
                if (action.payload.success) {
                    state.message = { type: 'success', content: 'Thêm nhân sự thành công' }
                } else {
                    state.message = { type: 'error', content: 'Thêm nhân sự không thành công' }
                }
            })
            .addCase(fetchCreateUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: 'Thêm nhân sự không thành công' }
            })
            //getUserDepIsNull case
            .addCase(fetchGetUserDepIsNull.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchGetUserDepIsNull.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success){
                    state.userDepIsNullList = action.payload.data.items
                    state.userDepIsNullTotalPage = action.payload.data.pages
                }
            })
            .addCase(fetchGetUserDepIsNull.rejected, (state, action) => {
                state.isLoading = false
            })
            //CoordinateUser case
            .addCase(fetchCoordinateUser.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(fetchCoordinateUser.fulfilled, (state, action) => {
                state.isLoading= false
                if (action.payload.success) {
                    state.message = {type:'success', content:'Nhân viên đã được thêm vào phòng ban'}
                } else {
                    state.message = {type:'error', content:'Nhân viên chưa được thêm vào phòng ban'}
                }
            })
            .addCase(fetchCoordinateUser.rejected,(state, action) => {
                state.isLoading= false
                state.message = {type:'error', content:'Nhân viên chưa được thêm vào phòng ban'}
            })
    }
})
export default adminUserSlice.reducer
export const { setPage, resetMessage } = adminUserSlice.actions
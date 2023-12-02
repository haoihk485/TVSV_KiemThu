import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserGetDepFields, UserGetDepList, UserGetHome } from "../../../service/user/userService";

export const fetchUserGetDeps = createAsyncThunk('userSlice/fetchUserGetDeps', async () => {
    const response = await UserGetDepList()
    return response
})

export const fetchUserGetHome = createAsyncThunk('userSlice/fetchUserGetHome', async (params) => {
    const response = await UserGetHome(params)
    return response
})

export const fetchUserGetDepFields = createAsyncThunk('userSlice/fetchUserGetDepFields', async (id) => {
    const response = await UserGetDepFields(id)
    return response
})

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLoading: false,
        depList: [],
        fieldList: [],
        topicList: [],
        message: { type: '', content: '' },
        totalPage: 0
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserGetDeps.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUserGetDeps.fulfilled, (state, action) => {
                state.isLoading = false

                if (action.payload.success) {
                    state.depList = action.payload.data
                }
            })
            .addCase(fetchUserGetDeps.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(fetchUserGetHome.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUserGetHome.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.topicList = action.payload.data.items
                    state.totalPage = action.payload.data.pages
                }
            })
            .addCase(fetchUserGetHome.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(fetchUserGetDepFields.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUserGetDepFields.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.fieldList = action.payload.data
                }
            })
            .addCase(fetchUserGetDepFields.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export default userSlice.reducer
export const { } = userSlice.actions
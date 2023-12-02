import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserGetDeps = createAsyncThunk('userSlice/fetchUserGetDeps', async () => {
    const response = await UserGetDepList()
    return response
})

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLoading: false,
        DepList: [],
        message: { type: '', content: '' }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserGetDeps.pending, state => {
            state.isLoading = true
        })
            .addCase(fetchUserGetDeps.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.DepList = action.payload.data
                }
            })
            .addCase(fetchUserGetDeps.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export default userSlice.reducer
export const { } = userSlice.actions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addField, getFields, updateFieldStatus } from "../../../service/admin/fieldService";
import { data } from "autoprefixer";

export const fetchGetFields = createAsyncThunk('adminField/fetchGetFields', async (params) => {
    const response = await getFields(params)
    return response
})

export const fetchUpdateFieldStatus = createAsyncThunk('adminField/fetchUpdateFieldStatus', async (id) => {
    const response = await updateFieldStatus(id)
    return response
})

export const fetchAddField = createAsyncThunk('adminField/fetchAddField', async (data) => {
    const response = await addField(data)
    return response
})

const adminFieldSlice = createSlice({
    name: 'adminField',
    initialState: {
        isLoading: false,
        fieldList: null,
        field: null,
        message: { type: '', content: '' },
        page: 0,
        pages: 0,
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
            //getFields case
            .addCase(fetchGetFields.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetFields.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.fieldList = action.payload.data.items
                    state.page = action.payload.data.page
                    state.totalPage = action.payload.data.pages
                }
            })
            .addCase(fetchGetFields.rejected, (state, action) => {
                state.isLoading = false
            })
            //updateFieldStatus case
            .addCase(fetchUpdateFieldStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateFieldStatus.fulfilled, (state, action) => {
                if (action.payload?.success) {
                    state.message = { type: 'success', content: 'Cập nhật trạng thái phòng ban thành công' }
                } else
                    state.message = { type: 'error', content: 'Cập nhật trạng thái phòng ban không thành công' }
            })
            .addCase(fetchUpdateFieldStatus.rejected, (state, action) => {
                state.message = { type: 'error', content: 'Cập nhật trạng thái phòng ban không thành công' }
            })
            //addField case
            .addCase(fetchAddField.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchAddField.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.message = { type: 'success', content: action.payload.message }
                } else
                    state.message = { type: 'error', content: action.payload.message }
            })
            .addCase(fetchAddField.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload.message }
            })
    }
})

export default adminFieldSlice.reducer
export const { setPage, resetMessage } = adminFieldSlice.actions
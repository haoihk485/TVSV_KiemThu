import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { depHAddDepField, depHDeleteField, depHGetFields, depHGetFieldsNotInDep } from "../../../service/departmentHead/depHeadFieldService";

export const fetchDHGetFields = createAsyncThunk('dHFieldSlice/fetchDHGetFields', async (params) => {
    const response = await depHGetFields(params)
    return response
})

export const fetchDHGetFieldsNotInDep = createAsyncThunk('dhFieldSlice/depHGetFieldsNotInDep', async () => {
    const response = await depHGetFieldsNotInDep()
    return response
})

export const fetchDHAddDepField = createAsyncThunk('dhFieldSlice/fetchDHAddDepField', async (data) => {
    const response = await depHAddDepField(data)
    return response
})

export const fetchDHDeleteField = createAsyncThunk('dhFieldSlice/fetchDHDeleteField', async (id) => {
    const response = await depHDeleteField(id)
    return response
})

const dHFieldSlice = createSlice({
    name: 'dHFieldSlice',
    initialState: {
        fieldList: null,
        message: { type: '', content: '' },
        totalPage: 0,
        fieldListDepNotHave: null,
        isLoading: false
    },
    reducers: {
        resetMessage: state => {
            state.message = { type: '', content: '' }
        }
    },
    extraReducers: builder => {
        builder
            //DHGetFields case
            .addCase(fetchDHGetFields.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHGetFields.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.fieldList = action.payload.data.items
                    state.totalPage = action.payload.data.pages
                }
            })
            .addCase(fetchDHGetFields.rejected, (state, action) => {
                state.isLoading = false
            })
            //DHGetFields not in Dep case
            .addCase(fetchDHGetFieldsNotInDep.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHGetFieldsNotInDep.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.fieldListDepNotHave = action.payload.data
                }
            })
            .addCase(fetchDHGetFieldsNotInDep.rejected, (state, action) => {
                state.isLoading = false
            })
            //DHAddDepField case
            .addCase(fetchDHAddDepField.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHAddDepField.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.success) {
                    state.message = { type: 'success', content: action.payload.message || 'Thêm lĩnh vực thành công' }
                } else
                    state.message = { type: 'error', content: action.payload.message || 'Thêm lĩnh vực không thành công' }
            })
            .addCase(fetchDHAddDepField.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload.message || 'Thêm lĩnh vực không thành công' }
            })
            //
            .addCase(fetchDHDeleteField.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchDHDeleteField.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload);
                if (action.payload?.success) {
                    state.message = { type: 'success', content: action.payload?.message || 'Xóa lĩnh vực thành công' }
                } else
                    state.message = { type: 'error', content: action.payload?.message || 'Xóa lĩnh vực không thành công' }
            })
            .addCase(fetchDHDeleteField.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload?.message || 'Xóa lĩnh vực không thành công' }
            })
    }
})

export default dHFieldSlice.reducer
export const { resetMessage } = dHFieldSlice.actions
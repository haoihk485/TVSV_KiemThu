import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDep, findDepById, getAllDepNameService, getDepUser, getDepartments, updateDep, updateDepartmentHead, updateUserStatus } from "../../../service/admin/departmentService";
import { data } from "autoprefixer";

export const fetchGetDepartments = createAsyncThunk('adminDepartment/fetchGetDepartments', async (params) => {
    const response = await getDepartments(params)
    return response
})

export const fetchUpdateUserStatus = createAsyncThunk('adminDepartment/fetchUpdateUserStatus', async (id) => {
    const response = await updateUserStatus(id)
    return response
})

export const fetchGetDepById = createAsyncThunk('adminDepartment/fetchGetDepById', async (id) => {
    const response = await findDepById(id)
    return response
})

export const fetchUpdateDepInfor = createAsyncThunk('adminDepartment/fetchUpdateDepInfor', async (data) => {
    const response = await updateDep(data.data, data.id)
    return response
})

export const fetchCreateDep = createAsyncThunk('adminDepartment/fetchCreateDep', async (data) => {
    const response = await createDep(data)
    return response
})

export const fetchGetDepNameList = createAsyncThunk('adminDepartment/fetchGetDepNameList', async () => {
    const response = await getAllDepNameService()
    return response
})

export const fetchGetDepUserList = createAsyncThunk('adminDepartment/fetchGetDepUserList', async (data) => {
    const response = await getDepUser(data)
    return response
})

export const fetchUpdateDepHead = createAsyncThunk('adminDepartment/fetchUpdateDepHead', async (data) => {
    const response = await updateDepartmentHead(data)
    return response
})

const adminDepartmentSlice = createSlice({
    name: 'adminDepartment',
    initialState: {
        DepartmentList: null,
        DepartmentNameList: null,
        ModalTotalPage: 0,
        Department: { name: '', description: '' },
        DepUserList: null,
        message: { type: '', content: '' },
        isLoading: false,
        page: 0, totalPage: 0,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        resetMessage: (state) => {
            state.message = { type: '', content: '' }
        }
    },
    extraReducers: (builder) => {
        builder
            // getDepartments case
            .addCase(fetchGetDepartments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetDepartments.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.success) {
                    state.DepartmentList = action.payload.data.items
                    state.page = action.payload.data.page
                    state.totalPage = action.payload.data.pages
                } else {
                    state.message = { type: 'error', content: action.payload.message }
                }
            })
            .addCase(fetchGetDepartments.rejected, (state, action) => {
                state.isLoading = false
            })
            //updateUserStatuscase
            .addCase(fetchUpdateUserStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateUserStatus.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(fetchUpdateUserStatus.rejected, state => {
                state.isLoading = false
            })
            //getDepByIdCase
            .addCase(fetchGetDepById.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchGetDepById.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.Department = action.payload.data
                } else {
                    state.message = { type: 'error', content: 'Lấy thông tin phòng ban thất bại' }
                }
            })
            .addCase(fetchGetDepById.rejected, (state) => {
                state.isLoading = false
                state.message = { type: 'error', content: 'Lấy thông tin phòng ban thất bại' }
            })
            //updateDepInforCase
            .addCase(fetchUpdateDepInfor.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchUpdateDepInfor.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) {
                    state.message = { type: 'success', content: action.payload.message }
                } else {
                    state.message = { type: 'error', content: action.payload.message }
                }
            })
            .addCase(fetchUpdateDepInfor.rejected, (state, action) => {
                state.message = { type: 'error', content: action.payload.message }
            })
            //addDepCase
            .addCase(fetchCreateDep.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchCreateDep.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.success) { state.message = { type: 'success', content: action.payload.message } }
                else state.message = { type: 'error', content: action.payload.message }

            })
            .addCase(fetchCreateDep.rejected, (state, action) => {
                state.isLoading = false
                state.message = { type: 'error', content: action.payload.message }
            })
            //getAllDepName case
            .addCase(fetchGetDepNameList.fulfilled, (state, action) => {
                state.DepartmentNameList = action.payload?.data
            })
            //getDepUser case
            .addCase(fetchGetDepUserList.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetDepUserList.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload);
                if (action.payload.success) {
                    state.DepUserList = action.payload.data
                    state.ModalTotalPage = action.payload.data.pages
                } else {
                    state.DepUserList = null
                    state.ModalTotalPage = 0
                }
            })
            .addCase(fetchGetDepUserList.rejected, (state, action) => {
                state.isLoading = false
                state.DepUserList = null
                state.ModalTotalPage = 0
            })
            //updateDepHead case
            .addCase(fetchUpdateDepHead.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateDepHead.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload);
                if (action.payload?.success) {
                    state.message = { type: 'success', content: 'Cập nhật trưởng phòng ban thành công' }
                } else{}
                    state.message = { type: 'success', content: 'Cập nhật trưởng phòng ban thành công' }
            })
            .addCase(fetchUpdateDepHead.rejected, async (state, action) => {
                state.isLoading = false
                state.message = { type: 'success', content: 'Cập nhật trưởng phòng ban thành công' }
            })
    }
})

export default adminDepartmentSlice.reducer
export const { setPage, setSearchKey, resetMessage } = adminDepartmentSlice.actions
import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        loading: false,
        message: { type: '', content: '' }
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        resetMessage: (state) => {
            state.message = { type: '', content: '' }
        }
    }
})

export default commonSlice.reducer
export const { showLoading, hideLoading, setMessage, resetMessage } = commonSlice.actions
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../pages/public/authSlice'
import adminUserSlice from '../pages/admin/slice/adminUserSlice'
import adminDepartmentSlice from '../pages/admin/slice/adminDepartmentSlice'
import adminFieldSlice from '../pages/admin/slice/adminFieldSlice'
import commonSlice from './commonSlice'
import dHUserSlice from '../pages/departmenthead/slice/dHUserSlice'
import dHFieldSlice from '../pages/departmenthead/slice/dHFieldSlice'
import userSlice from '../pages/user/slice/userSlice'

const store = configureStore({
    reducer: {
        common: commonSlice,
        auth: authSlice,
        adminUser: adminUserSlice,
        adminDepartment: adminDepartmentSlice,
        adminField: adminFieldSlice,
        depHeadUser: dHUserSlice,
        depHeadField: dHFieldSlice,
        user: userSlice
    }
})

export default store
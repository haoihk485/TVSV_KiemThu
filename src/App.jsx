import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/public/Login'
import Register from './pages/public/Register'
import AdminHome from './pages/admin/AdminHome'
import AdminUserManage from './pages/admin/AdminUserManage'
import Admin from './pages/admin/Admin'
import AdminDepartmentMange from './pages/admin/AdminDepartmentMange'
import AdminFieldManage from './pages/admin/AdminFieldManage'
import DepartmentHead from './pages/departmenthead/DepartmentHead'
import DepartmentHeadHome from './pages/departmenthead/DepartmentHeadHome'
import DepartmentHeadUserManage from './pages/departmenthead/DepartmentHeadUserManage'
import DepartmentHeadFieldManage from './pages/departmenthead/DepartmentHeadFieldManage'
import DepartmentHeadQuestionMange from './pages/departmenthead/DepartmentHeadQuestionMange'
import Counsellor from './pages/counsellor/Counsellor'
import CounsellorHome from './pages/counsellor/CounsellorHome'
import CounsellorQuestionManage from './pages/counsellor/CounsellorQuestionManage'
import Home from './pages/public/Home'
import User from './pages/user/User'
import CreateQuestion from './pages/user/CreateQuestion'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Admin />} >
            <Route path='home' element={<AdminHome />} />
            <Route path='users' element={<AdminUserManage />} />
            <Route path='departments' element={<AdminDepartmentMange />} />
            <Route path='fields' element={<AdminFieldManage />} />
          </Route>
          <Route path='/departmenthead' element={<DepartmentHead />} >
            <Route path='home' element={<DepartmentHeadHome />} />
            <Route path='users' element={<DepartmentHeadUserManage />} />
            <Route path='fields' element={<DepartmentHeadFieldManage />} />
            <Route path='questions' element={<DepartmentHeadQuestionMange />} />
          </Route>
          <Route path='/counsellor' element={<Counsellor />} >
            <Route path='home' element={<CounsellorHome />} />
            <Route path='questions' element={<CounsellorQuestionManage />} />
          </Route>
          <Route path='/user' element={<User />} >
            <Route path='questions/create' element={<CreateQuestion />}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

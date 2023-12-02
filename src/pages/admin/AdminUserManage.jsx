import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pagination from '../../components/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useDispatch, useSelector } from "react-redux"


import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchAdminGetUsers, fetchCreateUser, fetchUserStatusUpdate, resetMessage, setPage } from './slice/adminUserSlice';
import { AdminUserLoadingSelector, AdminUserMessage, UserListPageSelector, UserListSelector, UserListTotalPageSelector } from '../../redux/selectors';
import Spinner from '../../components/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import CreateUser from '../../components/admin/CreateUser';
import CoordinateUser from '../../components/admin/CoordinateUser';


const AdminUserManage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchKey, setSearchKey] = useState('')
    const [showAddUser, setShowAddUser] = useState(false)
    const [showCoordinateUser, setShowCoordinateUser] = useState(false)
    const initialParams = {
        size: 8,
        page: 0
    }

    const userList = useSelector(UserListSelector)
    const page = useSelector(UserListPageSelector)
    const totalPage = useSelector(UserListTotalPageSelector)
    const loading = useSelector(AdminUserLoadingSelector)
    const toastMessage = useSelector(AdminUserMessage)


    const [params, setParams] = useState(initialParams)


    useEffect(() => {
        dispatch(fetchAdminGetUsers(params))
    }, [params])

    const handlePagination = (page) => {
        dispatch(setPage(page))
        setParams({
            ...params,
            page: page,
        })
    }

    const handleSearch = () => {
        if (!params.value && searchKey === '') return
        else if (params.value && searchKey === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'value')))
        } else {
            setParams({
                ...params,
                value: searchKey
            })
        }
        // dispatch(setPage(0))
    }

    const handleRoleFilter = (e) => {
        const selectedRole = e.target.value
        if (!params.role && selectedRole === '') return
        else if (params.role && selectedRole === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'role')))
        } else {
            setParams({
                ...params,
                role: selectedRole
            })
        }
        // dispatch(setPage(0))
    }

    const handleUpdateStatus = async (id, name) => {
        if (!confirm(`Bạn muốn thay đổi trạng thái của người dùng "${name}"`)) return
        await dispatch(fetchUserStatusUpdate(id))
        dispatch(fetchAdminGetUsers(params))

    }

    const handleStatusFilter = (e) => {
        const status = e.target.value
        if (!params.status && status === '') return
        else if (params.status && status === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'status')))
        } else {
            setParams({
                ...params,
                status
            })
        }
        // dispatch(setPage(0))
    }
    useEffect(() => {

        if (toastMessage.type === '') return
        else if (toastMessage.type === 'error') {
            console.log(toastMessage.type);
            toast.error(toastMessage.content, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (toastMessage.type === 'success') {
            toast.success(toastMessage.content, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        dispatch(resetMessage())
    }, [toastMessage])

    const handleCreateUser = async (data) => {
        await dispatch(fetchCreateUser(data))
        dispatch(fetchAdminGetUsers(params))
    }

    return (
        <>
            {loading && <Spinner></Spinner>}
            {showAddUser && <CreateUser handleClose={() => setShowAddUser(false)} handleCreateUser={handleCreateUser}></CreateUser>}
            {showCoordinateUser && <CoordinateUser handleClose={() => setShowCoordinateUser(false)}></CoordinateUser>}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className={'absolute'}
            />

            <div className='container w-[95%] my-5 mx-auto'>
                <div className="">
                    <button onClick={() => navigate('/admin/home')} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                    <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý người dùng</h1>
                </div>

                <div className="flex space-x-4 justify-between my-4">
                    <div className="flex space-x-2">
                        <button
                            className="bg-green-600 text-white py-2 px-4 rounded"
                            onClick={() => setShowAddUser(true)}>
                            <AddCircleIcon className='mb-1 mr-1'></AddCircleIcon>Thêm nhân sự
                        </button>
                        <button
                            className="bg-secondary text-white py-2 px-4 rounded"
                            onClick={() => setShowCoordinateUser(true)}
                        >
                            <AddHomeIcon className='mb-1 mr-1'></AddHomeIcon>Phân phối nhân sự
                        </button>
                    </div>

                    <div className="flex space-x-4">
                        <div className='relative'>
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="border p-2 rounded-md"
                                value={searchKey}
                                onChange={e => setSearchKey(e.target.value)} />
                            <SearchIcon
                                className='absolute right-2 top-2 text-gray-400 cursor-pointer'
                                onClick={() => handleSearch()}>
                            </SearchIcon>
                        </div>
                        <select className="border p-2 rounded" onChange={e => handleRoleFilter(e)}>
                            <option value="">Role</option>
                            <option value="counsellor">Tư vấn viên</option>
                            <option value="user">Người dùng</option>
                            <option value="departmentHead">Trưởng phòng ban</option>
                            <option value="supervisor">Giám sát viên</option>
                        </select>

                        <select className="border p-2 rounded" onChange={e => handleStatusFilter(e)}>
                            <option value="all">Trạng thái</option>
                            <option value="enabled">Hoạt động</option>
                            <option value="disabled">Dừng hoạt động</option>
                        </select>
                    </div>
                </div>

                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className=''>
                            <th className="font-roboto py-2 px-4 border-b w-[5%]">STT</th>
                            <th className="font-roboto py-2 px-4 border-b w-[20%]">Tên người dùng</th>
                            <th className="font-roboto py-2 px-4 border-b w-[20%]">Số điện thoại</th>
                            <th className="font-roboto py-2 px-4 border-b w-[25%]">Email</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Nghề nghiệp</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Role</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList &&
                            userList.map((user, index) => {
                                return (
                                    <tr className='' key={user.id}>
                                        <td className="font-roboto py-2 px-4 border-b text-center">{index + 1}</td>
                                        <td className="font-roboto py-2 px-4 border-b">{user.name}</td>
                                        <td className="font-roboto py-2 px-4 border-b">{user.phone}</td>
                                        <td className="font-roboto py-2 px-4 border-b">{user.email}</td>
                                        <td className="font-roboto py-2 px-4 border-b">{user.occupation}</td>
                                        <td className="font-roboto py-2 px-4 border-b text-center">{user.role}</td>
                                        <td className="font-roboto py-2 px-4 border-b text-center">
                                            <button
                                                onClick={() => handleUpdateStatus(user.id, user.name)}
                                                className={`${user.enabled ? 'bg-red-500' : 'bg-green-500'} min-w-[80px] text-white py-1 px-2 rounded`}>{user.enabled ? 'Khóa' : 'Mở Khóa'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table >
            </div>
            <Pagination page={page} totalPage={totalPage} handlePagination={handlePagination}></Pagination>
        </>
    )
}

export default AdminUserManage
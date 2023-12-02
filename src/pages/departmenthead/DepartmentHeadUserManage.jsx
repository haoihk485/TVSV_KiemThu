import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pagination from '../../components/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DHUserIsLoading, DHUserList, DHUserMessage, DHUserTotalPage } from '../../redux/selectors';
import { ToastContainer, toast } from 'react-toastify';
import { fetchDHAddUserField, fetchDHCreateCoun, fetchDHGetUsers, fetchDHUpdateUserStatus, resetMessage } from './slice/dHUserSlice';
import Spinner from '../../components/spinner';
import { useEffect } from 'react';
import { useState } from 'react';
import CreateCounsellor from '../../components/departmentHead/CreateCounsellor';
import CounsellorDetail from '../../components/departmentHead/CounsellorDetail';


const DepartmentHeadUserManage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initParams = {
        page: 0,
        size: 8,
    }

    const [params, setParams] = useState(initParams)
    const [searchKey, setSearchKey] = useState('')
    const [showAddCoun, setShowAddCoun] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [userId, setUserId] = useState('')

    const toastMessage = useSelector(DHUserMessage)
    const loading = useSelector(DHUserIsLoading)
    const totalPage = useSelector(DHUserTotalPage)
    const userList = useSelector(DHUserList)

    useEffect(() => {
        dispatch(fetchDHGetUsers(params))
    }, [params])

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

    const handlePagination = (page) => {
        setParams({
            ...params,
            page: page,
        })
    }

    const handleSearch = () => {
        setParams({
            ...params,
            value: searchKey
        })
    }
    const handleFilter = (type) => {
        if (type === params.status) return
        setParams({
            ...params,
            status: type
        })
    }

    const handleUpdateUserStatus = async (id) => {
        if (!confirm('Bạn muốn cập nhật trạng thái của user ?')) return
        await dispatch(fetchDHUpdateUserStatus(id))
        dispatch(fetchDHGetUsers(params))
    }

    const handleCreateCoun = async (data) => {
        await dispatch(fetchDHCreateCoun(data))
        dispatch(fetchDHGetUsers(params))
    }

    const handleAddCounField = async (data) => {
        await dispatch(fetchDHAddUserField(data))
    }


    return (
        <>  {loading && <Spinner></Spinner>}
            {showAddCoun && <CreateCounsellor handleClose={() => setShowAddCoun(false)} handleCreateCoun={handleCreateCoun}></CreateCounsellor>}
            {showDetail && <CounsellorDetail handleClose={() => setShowDetail(false)} id={userId} handleAddField={handleAddCounField}></CounsellorDetail>}
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
                    <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý nhân sự</h1>
                </div>

                <div className="flex space-x-4 justify-between my-4">
                    <div className="flex space-x-2">
                        <button
                            className="bg-secondary text-white py-2 px-4 rounded"
                            onClick={() => setShowAddCoun(true)}>
                            <AddCircleIcon className='mb-1 mr-1'></AddCircleIcon>Thêm nhân sự</button>
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
                                onClick={() => handleSearch()}></SearchIcon>
                        </div>

                        <select className="border p-2 rounded" onChange={(e) => handleFilter(e.target.value)}>
                            <option value="">Trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Dừng hoạt động</option>
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
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Role</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Lĩnh vực</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList && userList.map((user, i) => {
                            return (
                                <tr className='' key={user.id}>
                                    <td className="font-roboto py-2 px-4 border-b text-center">{i + 1}</td>
                                    <td className="font-roboto py-2 px-4 border-b">{user.name}</td>
                                    <td className="font-roboto py-2 px-4 border-b">{user.phone}</td>
                                    <td className="font-roboto py-2 px-4 border-b">{user.email}</td>
                                    <td className="font-roboto py-2 px-4 border-b text-center">{user.role}</td>
                                    <td className="font-roboto py-2 px-4 border-b flex justify-center">
                                        <button className="bg-blue-500 p-1 rounded-md"
                                            onClick={() => {
                                                setUserId(user.id)
                                                setShowDetail(true)
                                            }}>
                                            <PlagiarismOutlinedIcon className="text-white"></PlagiarismOutlinedIcon>
                                        </button>
                                    </td>
                                    <td className="font-roboto py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleUpdateUserStatus(user.id)}
                                            className={`${user?.enabled ? 'bg-red-500' : 'bg-green-500'} min-w-[80px] text-white py-1 px-2 rounded`}>{user?.enabled ? 'Khóa' : 'Mở Khóa'}
                                        </button>
                                    </td>
                                </tr>
                            )
                        }, [])}
                    </tbody>
                </table >
            </div>
            <Pagination page={params.page} totalPage={totalPage} handlePagination={handlePagination}></Pagination>
        </>
    )
}

export default DepartmentHeadUserManage
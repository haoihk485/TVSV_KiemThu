import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import {
    fetchCreateDep,
    fetchGetDepById,
    fetchGetDepartments,
    fetchUpdateDepInfor,
    fetchUpdateUserStatus,
    resetMessage,
    setPage
} from './slice/adminDepartmentSlice';
import {
    AdminDepLoadingSelector,
    AdminDepMessage,
    DepListPageSelector,
    DepListTotalPageSelector,
    DepartmentListSelector
} from '../../redux/selectors';
import Spinner from '../../components/Spinner';
import { useState } from 'react';
import UpdateDepartment from '../../components/admin/UpdateDepartment'
import CreateDepartment from '../../components/admin/CreateDepartment';
import Pagination from '../../components/Pagination';
import DepDetail from '../../components/admin/DepDetail';


const AdminDepartmentMange = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector(AdminDepLoadingSelector)
    const DepartmentList = useSelector(DepartmentListSelector)
    const page = useSelector(DepListPageSelector)
    const totalPage = useSelector(DepListTotalPageSelector)
    const toastMessage = useSelector(AdminDepMessage)

    const [depId, setDepId] = useState(null)
    const [handleCounter, setHandleCounter] = useState(1)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [params, setParams] = useState({
        size: 8,
        page: 0,
        status: 'all'
    })

    useEffect(() => {
        handleGetData()
    }, [params, handleCounter])

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

    const handleGetData = () => {
        dispatch(fetchGetDepartments(params))
    }

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
    }

    const handleFilter = (type) => {
        if (type === params.status) return
        setParams({
            ...params,
            status: type
        })
    }

    const handleUpdateStatus = async (name, id) => {
        if (!confirm(`Chắn chắn đổi trạng thái của phòng ban "${name}"?`)) return
        await dispatch(fetchUpdateUserStatus(id));
        handleGetData()
    }

    const handleDepUpdate = async (data) => {
        await dispatch(fetchUpdateDepInfor(data))
        await dispatch(fetchGetDepById(depId))
        handleGetData()
    }

    const handleCreateDep = async (data) => {
        await dispatch(fetchCreateDep(data))
        handleGetData()
    }

    return (
        <>
            {loading && <Spinner></Spinner>}
            {showUpdate && <UpdateDepartment handleClose={() => setShowUpdate(false)} depId={depId} handleDepUpdate={handleDepUpdate}></UpdateDepartment>}
            {showCreate && <CreateDepartment handleClose={() => setShowCreate(false)} handleCreateDep={handleCreateDep}></CreateDepartment>}
            {showDetail && <DepDetail handleClose={() => setShowDetail(false)} id={depId}></DepDetail>}
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
            <div className='container w-[95%] mx-auto  my-5'>
                <div className="">
                    <button onClick={() => navigate('/admin/home')} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                    <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý phòng ban</h1>
                </div>

                <div className="flex space-x-4 justify-between my-4">
                    <div className="flex space-x-2">
                        <button
                            className="bg-secondary text-white py-2 px-4 rounded"
                            onClick={() => setShowCreate(true)}>
                            <AddCircleIcon className='mb-1 mr-1'></AddCircleIcon>Thêm phòng ban
                        </button>
                    </div>

                    <div className="flex space-x-4">
                        <div className='relative'>
                            <input
                                value={searchKey}
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="border p-2 rounded-md"
                                onChange={(e) => setSearchKey(e.target.value)} />
                            <SearchIcon
                                className='absolute right-2 top-2 text-gray-400 cursor-pointer'
                                onClick={() => handleSearch()}></SearchIcon>
                        </div>
                        <select className="p-2 rounded-md border" onChange={e => handleFilter(e.target.value)}>
                            <option value="all" >Trạng thái</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                {
                    (DepartmentList?.length === 0) &&
                    <div className='flex justify-center content-center w-full items-center py-10 border font-roboto text-lg border-gray-500'>Không tìm thấy dữ liệu</div>
                }

                {
                    (DepartmentList?.length !== 0) &&
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className=''>
                                <th className="font-roboto py-2 px-4 border-b w-[5%]">STT</th>
                                <th className="font-roboto py-2 px-4 border-b w-[25%]">Tên phòng ban</th>
                                <th className="font-roboto py-2 px-4 border-b w-[40%]">Miêu tả</th>
                                <th className="font-roboto py-2 px-4 border-b w-[10%]">Trạng thái</th>
                                <th className="font-roboto py-2 px-4 border-b w-[10%]">Chỉnh sửa</th>
                                <th className="font-roboto py-2 px-4 border-b w-[10%]">Xem chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                DepartmentList && DepartmentList.map((department, index) => {
                                    return (
                                        <tr className='' key={index}>
                                            <td className="font-roboto py-2 px-4 border-b">{index + 1}</td>
                                            <td className="font-roboto py-2 px-4 border-b">{department.name}</td>
                                            <td className="font-roboto py-2 px-4 border-b">{department.description}</td>
                                            <td className="font-roboto py-2 px-4 border-b text-center">
                                                <button
                                                    onClick={() => { handleUpdateStatus(department.name, department.id) }}
                                                    className={`${department.status ? 'bg-red-500' : 'bg-green-500'} min-w-[80px] text-white py-1 px-2 rounded`}>{department.status ? 'Khóa' : 'Mở Khóa'}
                                                </button>
                                            </td>
                                            <td className="font-roboto py-2 px-4 border-b text-center">
                                                <button
                                                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                                                    onClick={() => {
                                                        setDepId(department.id)
                                                        setShowUpdate(true)
                                                    }}>Chỉnh sửa</button>
                                            </td>
                                            <td className="font-roboto py-2 px-4 border-b text-center">
                                                <button className="bg-secondary text-white py-1 px-2 rounded"
                                                    onClick={() => {
                                                        setDepId(department.id)
                                                        setShowDetail(true)
                                                    }
                                                    }>Chi tiết</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table >
                }
            </div >
            <Pagination page={page} totalPage={totalPage} handlePagination={handlePagination}></Pagination>
        </>
    )
}

export default AdminDepartmentMange
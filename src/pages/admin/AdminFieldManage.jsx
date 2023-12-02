import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import Pagination from '../../components/Pagination';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { useEffect } from 'react';
import {
    fetchAddField,
    fetchGetFields,
    fetchUpdateFieldStatus,
    resetMessage,
    setPage
} from './slice/adminFieldSlice';
import {
    AdminFieldLoadingSelector,
    AdminFieldMessage,
    FieldListPageSelector,
    FieldListSelector,
    FieldListTotalPageSelector
} from '../../redux/selectors';
import Spinner from '../../components/Spinner'
import { useState } from 'react';
import CreateField from '../../components/admin/CreateField';
import { toast, ToastContainer } from 'react-toastify';
import UpdateField from '../../components/admin/UpdateField';

const AdminFieldManage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector(AdminFieldLoadingSelector)
    const fieldList = useSelector(FieldListSelector)
    const totalPage = useSelector(FieldListTotalPageSelector)
    const toastMessage = useSelector(AdminFieldMessage)

    const [showCreateField, setShowCreateField] = useState(false)
    const [showUpdateField, setShowUpdateField] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [fieldId, setFieldId] = useState('')
    const [params, setParams] = useState({
        size: 8,
        page: 0,
        status: 'all',
        sort: 'name,asc'
    })

    useEffect(() => {
        dispatch(fetchGetFields(params))
    }, [params])

    useEffect(() => {
        if (toastMessage.type === '') return
        else if (toastMessage.type === 'error') {
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
        dispatch(setPage(page))
        setParams({
            ...params,
            page: page,
        })
    }

    const handleFilter = (type) => {
        setParams({
            ...params,
            status: type
        })
    }

    const handleUpdateStatus = async (id) => {
        await dispatch(fetchUpdateFieldStatus(id))
        dispatch(fetchGetFields(params))
    }

    const handleAddField = async (data) => {
        await dispatch(fetchAddField(data))
        dispatch(fetchGetFields(params))
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




    return (
        <>
            {loading && <Spinner></Spinner>}
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
            {showCreateField && <CreateField handleClose={() => setShowCreateField(false)} handleAddField={handleAddField}></CreateField>}
            {showUpdateField && <UpdateField handleClose={() => setShowUpdateField(false)} id={fieldId}></UpdateField>}
                <div className='container w-[95%] mx-auto  my-5'>
                    <div className="">
                        <button onClick={() => navigate('/admin/home')} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                        <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý Lĩnh vực</h1>
                    </div>
                    <div className="flex space-x-4 justify-between my-4">
                        <div className="flex space-x-2" onClick={() => setShowCreateField(true)}>
                            <button className="bg-secondary text-white py-2 px-4 rounded">
                                <AddCircleIcon className='mb-1 mr-1'></AddCircleIcon>Thêm lĩnh vực</button>
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
                            <select className="p-2 rounded-md border" onChange={e => handleFilter(e.target.value)}>
                                <option value="all" >Trạng thái</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className=''>
                                <th className="font-roboto py-2 px-4 border-b w-[5%]">STT</th>
                                <th className="font-roboto py-2 px-4 border-b ">Tên Lĩnh Vực</th>
                                <th className="font-roboto py-2 px-4 border-b w-[10%]">Trạng thái</th>
                                <th className="font-roboto py-2 px-4 border-b w-[10%]">Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fieldList && fieldList.map((field, index) => {
                                return <tr key={field.id} className=''>
                                    <td className="font-roboto py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="font-roboto py-2 px-4 border-b">{field.name}</td>
                                    <td className="font-roboto py-2 px-4 border-b text-center">
                                        <button
                                            className={`${field.status ? 'bg-red-500' : 'bg-green-500'} min-w-[80px] text-white py-1 px-2 rounded`}
                                            onClick={() => handleUpdateStatus(field.id)}>{field.status ? 'Khóa' : 'Mở Khóa'}</button>
                                    </td>
                                    <td className="font-roboto py-2 px-4 border-b text-center">
                                        <button
                                            className="bg-green-500 text-white py-1 px-2 rounded"
                                            onClick={
                                                () => {
                                                    setFieldId(field.id);
                                                    setShowUpdateField(true)
                                                }
                                            }>Chỉnh sửa</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table >
                    <Pagination page={params.page} totalPage={totalPage} handlePagination={handlePagination}></Pagination>
                </div>
        </>
    )
}

export default AdminFieldManage

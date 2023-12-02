import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDHAddDepField, fetchDHDeleteField, fetchDHGetFields, resetMessage } from "./slice/dHFieldSlice"
import { useState } from "react"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { DHFieldIsLoading, DHFieldList, DHFieldMessage, DHFieldTotalPage } from "../../redux/selectors";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import AddFields from "../../components/departmentHead/AddFields";

const DepartmentHeadFieldManage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initParams = {
        size: 8,
        page: 0
    }

    const fieldList = useSelector(DHFieldList)
    const isLoading = useSelector(DHFieldIsLoading)
    const totalPage = useSelector(DHFieldTotalPage)
    const toastMessage = useSelector(DHFieldMessage)

    const [params, setParams] = useState(initParams)
    const [searchKey, setSearchKey] = useState('')
    const [showAddField, setShowAddField] = useState(false)


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


    useEffect(() => {
        dispatch(fetchDHGetFields(params))
    }, [params])

    const handleSearch = () => {
        if (!params.value && searchKey === '') return
        else if (params.value && searchKey === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'value')))
        } else {
            setParams({
                ...params,
                value: searchKey,
                page: 0
            })
        }
    }


    const handlePagination = (page) => {
        setParams({
            ...params,
            page: page,
        })
    }

    const handleAddField = async (data) => {
        await dispatch(fetchDHAddDepField(data))
        dispatch(fetchDHGetFields(params))
    }

    const handleDeleteField = async (id) => {
        await dispatch(fetchDHDeleteField(id))
        dispatch(fetchDHGetFields(params))
    }

    return (
        <>
            {isLoading && <Spinner></Spinner>}
            {showAddField && <AddFields handleClose={() => setShowAddField(false)} handleAddField={handleAddField}></AddFields>}
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
                    <button onClick={() => navigate('/departmenthead/home')} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                    <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý Lĩnh vực</h1>
                </div>
                <div className="flex space-x-4 justify-between my-4">
                    <div className="flex space-x-2" onClick={() => setShowAddField(true)}>
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
                    </div>
                </div>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className=''>
                            <th className="font-roboto py-2 px-4 border-b w-[5%]">STT</th>
                            <th className="font-roboto py-2 px-4 border-b ">Tên Lĩnh Vực</th>
                            <th className="font-roboto py-2 px-4 border-b w-[10%]">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fieldList && fieldList.map((field, i) => {
                            return (
                                <tr className='' key={field.id}>
                                    <td className="font-roboto py-2 px-4 border-b text-center">{params.size * params.page + i + 1}</td>
                                    <td className="font-roboto py-2 px-4 border-b">{field.name}</td>
                                    <td className="font-roboto py-2 px-4 border-b text-center">
                                        <button className="bg-red-500 p-1 rounded-md"
                                            onClick={() => handleDeleteField(field.id)}>
                                            <DeleteOutlineOutlinedIcon className="text-white"></DeleteOutlineOutlinedIcon>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table >
                <Pagination page={params.page} totalPage={totalPage} handlePagination={handlePagination}></Pagination>
            </div>
        </>
    )
}

export default DepartmentHeadFieldManage
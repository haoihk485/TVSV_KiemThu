import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinateUser, fetchGetUserDepIsNull } from '../../pages/admin/slice/adminUserSlice';
import { GetDepNameList, UserDepIsNullList, UserDepIsNullTotalPage } from '../../redux/selectors';
import SearchIcon from '@mui/icons-material/Search';

import { fetchGetDepNameList } from '../../pages/admin/slice/adminDepartmentSlice';
import CounsellorList from './CounsellorList';
import PaginationModal from '../PaginationModal';
import { createContext } from 'react';



const CoordinateUser = ({ handleClose }) => {

    const dispatch = useDispatch()

    const initParams = {
        page: 0,
        size: 6
    }
    const [searchKey, setSearchKey] = useState('')

    const initUpdateInfor = {
        userId: '',
        depId: '',
        depName: 'Chọn phòng ban'
    }

    const [showDropdown, setShowDropDown] = useState(false)
    const [updateInfor, setUpdateInfor] = useState(initUpdateInfor)
    const [params, setParams] = useState(initParams)

    const userList = useSelector(UserDepIsNullList)
    const depList = useSelector(GetDepNameList)
    const totalPage = useSelector(UserDepIsNullTotalPage)

    useEffect(() => {
        dispatch(fetchGetUserDepIsNull(params))
        dispatch(fetchGetDepNameList())
    }, [params])

    const handleSelectBoxChange = e => {
        setShowDropDown(false)
        setUpdateInfor({
            ...updateInfor,
            depId: e.target.value,
            depName: depList.find((dep) => dep.id === e.target.value).name
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

    const Pagination = (page) => {
        setParams({
            ...params,
            page,
        })
    }

    const handleCoordinate = async (userId) => {
        await dispatch(fetchCoordinateUser({
            depId: updateInfor.depId,
            userId: userId
        }))
        dispatch(fetchGetUserDepIsNull(params))
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6 font-roboto">Phân phối nhân sự</h1>
                <div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="name" className="block text-xl font-bold mb-4 font-roboto">Chọn phòng ban</label>
                        <div className='relative'>
                            <input
                                type="text"
                                name="name"
                                value={updateInfor.depName}
                                className="mt-1 p-2 border rounded-md block w-full cursor-pointer" readOnly
                                onClick={() => setShowDropDown(!showDropdown)} />
                            {showDropdown && <select
                                className="mt-1 p-2 border rounded-md absolute w-full z-10"
                                size={10}
                                onChange={(e) => handleSelectBoxChange(e)}
                                onBlur={() => setShowDropDown(false)}>
                                {depList && depList.map((dep) => {
                                    return (<option key={dep.id} value={dep.id} name={dep.name} className='hover:bg-gray-200'>{dep.name}</option>)
                                })}
                            </select>}
                        </div>
                    </div>
                    <div className='relative z-0'>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="border p-2 rounded-md float-right"
                            value={searchKey}
                            onChange={e => setSearchKey(e.target.value)} />
                        <SearchIcon
                            className='absolute right-2 top-2 text-gray-400 cursor-pointer'
                            onClick={() => handleSearch()}>
                        </SearchIcon>
                    </div>
                    <div className="mb-4 font-roboto">
                        <CounsellorList counsellorList={userList} handleButtonClick={handleCoordinate}></CounsellorList>
                    </div>
                </div>
                <PaginationModal page={params.page} totalPage={totalPage} handlePagination={Pagination}></PaginationModal>
            </div>
        </div>
    )
}

export default CoordinateUser
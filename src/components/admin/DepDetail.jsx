import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import CounsellorList from './CounsellorList';
import PaginationModal from '../PaginationModal';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetDepUserList, fetchUpdateDepHead } from '../../pages/admin/slice/adminDepartmentSlice';
import { DepartmentDetail, ModalTotalPage } from '../../redux/selectors';
import CounsellorCard from './CounsellorCard';


const DepDetail = ({ handleClose, id }) => {
    const dispatch = useDispatch()
    const initParams = {
        page: 0,
        size: 6
    }
    const [searchKey, setSearchKey] = useState('')

    const [params, setParams] = useState(initParams)

    const DetailDep = useSelector(DepartmentDetail)

    const totalPage = useSelector(ModalTotalPage)

    useEffect(() => {
        dispatch(fetchGetDepUserList({ id, params: { size: 6, page: 0 } }))
    }, [])

    const Pagination = (page) => {
        setParams({
            ...params,
            page,
        })
    }

    const handleUpdateDepHead = async (userId) => {
        await dispatch(fetchUpdateDepHead({ userId: userId, depId: id }))
        dispatch(fetchGetDepUserList({ id, params: { size: 6, page: 0 } }))
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
                        <CounsellorCard counsellor={DetailDep?.departmentHead}></CounsellorCard>
                    </div>
                    <div className='relative'>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="border p-2 rounded-md float-right"
                        />
                        <SearchIcon
                            className='absolute right-2 top-2 text-gray-400 cursor-pointer'
                        >
                        </SearchIcon>
                    </div>
                    <div className="mb-4 font-roboto">
                        <CounsellorList counsellorList={DetailDep?.counsellor?.items} handleButtonClick={handleUpdateDepHead}></CounsellorList>
                    </div>
                </div>
                <PaginationModal page={params.page} totalPage={totalPage} handlePagination={Pagination}></PaginationModal>
            </div>
        </div>
    )
}

export default DepDetail
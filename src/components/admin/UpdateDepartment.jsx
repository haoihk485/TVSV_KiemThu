import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetDepById } from '../../pages/admin/slice/adminDepartmentSlice';
import { DepartmentSelector } from '../../redux/selectors';
import { useState } from 'react';

const UpdateDepartment = ({ handleClose, depId, handleDepUpdate }) => {
    const dispatch = useDispatch()

    const Department = useSelector(DepartmentSelector)

    const [depInfo, setDepInfo] = useState({
        ...Department
    })

    useEffect(() => {
        if (!depId) return
        dispatch(fetchGetDepById(depId))
    }, [])

    useEffect(() => {
        if (!Department) return
        setDepInfo({
            name: Department.name,
            description: Department.description
        })
    }, [Department])

    const handleInputChange = (e) => {
        setDepInfo({
            ...depInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveChange = () => {
        handleDepUpdate({ id: depId, data: { ...depInfo } })
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa thông tin phòng ban</h1>
                {(!Department) && <p>Không nhận được thông tin phòng ban</p>}
                {Department &&
                    <div>
                        <div className="mb-4 font-roboto">
                            <label htmlFor="departmentName" className="block text-sm font-medium text-gray-600 font-roboto">Tên phòng ban</label>
                            <input
                                type="text"
                                name="name"
                                id='name'
                                className="mt-1 p-2 w-full border rounded-md"
                                value={depInfo?.name}
                                onChange={e => handleInputChange(e)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="departmentDescription" className="block text-sm font-medium text-gray-600">Mô tả</label>
                            <input
                                type="text"
                                name="description"
                                id='description'
                                className="mt-1 p-2 w-full border rounded-md"
                                value={depInfo?.description}
                                onChange={e => handleInputChange(e)} />
                        </div>

                        <div className="flex items-center justify-end">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-3">Chỉnh sửa</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                                onClick={handleSaveChange}>Lưu</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
export default UpdateDepartment
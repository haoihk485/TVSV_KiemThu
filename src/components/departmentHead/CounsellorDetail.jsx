import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDHGetCounDetail, fetchDHGetFieldCounDontHave } from '../../pages/departmenthead/slice/dHUserSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DHUserDetail, DHUserFieldUserDontHave } from '../../redux/selectors';
import { useState } from 'react';
import blankAvt from '../../assets/img/blank_avt.png'


const CounsellorDetail = ({ handleClose, id, handleAddField }) => {

    const dispatch = useDispatch()

    const initFieldList = useSelector(DHUserFieldUserDontHave)
    const user = useSelector(DHUserDetail)

    const [showInfor, setShowInfor] = useState(true)
    const [remainField, setRemainField] = useState([])
    const [chooseField, setChooseField] = useState([]);

    useEffect(() => {
        if (!initFieldList || remainField.length !== 0) return
        setRemainField([...initFieldList])
    }, [initFieldList])

    const handleAdd = async() => {
        const data = chooseField.map(field => field.id);
        await handleAddField({ id: id, fieldIds: {ids: data} })
        dispatch(fetchDHGetCounDetail(id))
        setChooseField([])
        setShowInfor(true)
    }

    const handleChoose = (fieldId) => {
        setRemainField(
            remainField.filter(field => field.id !== fieldId)
        )
        setChooseField([
            ...chooseField,
            remainField.find(field => field.id === fieldId)
        ])
    }

    const handleUnchoose = (fieldId) => {
        setRemainField([
            chooseField.find(field => field.id === fieldId),
            ...remainField,
        ])
        setChooseField(
            chooseField.filter(field => field.id !== fieldId)
        )
    }




    useEffect(() => {
        dispatch(fetchDHGetFieldCounDontHave(id))
        dispatch(fetchDHGetCounDetail(id))
    }, [])
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                {
                    ((showInfor) ?
                        user && <div className="bg-gray-100 p-4 rounded-md shadow-md w-full">
                            <div className="mb-4 w-full flex justify-center">
                                <img
                                    src={user?.avatar || blankAvt}
                                    alt="Avatar"
                                    className="h-32 object-cover rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold font-roboto">{user.name}</h2>
                                <p className="text-gray-600 font-roboto">Email: {user.email}</p>
                                <p className="text-gray-600 font-roboto">Phone: {user.phone}</p>
                            </div>
                            <p className='text-gray-600 font-roboto'>Lĩnh vực:</p>
                            {(user.fields.length > 0) ?
                                <div className='bg-white text-sm font-roboto p-2 rounded-md text-center text-gray-500 h-36 overflow-y-auto'>
                                    <ul className="list-disc list-inside text-left">
                                        {user.fields.map((field, index) => (
                                            <li key={index} className="text-gray-600 py-1">{field.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                :
                                <div className='bg-white text-sm font-roboto p-2 rounded-md text-center text-gray-500'>
                                    <h1>Tư vấn viên chưa đảm nhận lĩnh vực nào</h1>
                                </div>
                            }
                        </div>
                        :
                        <>
                            <h1 className="text-2xl font-semibold mb-6">Thêm lĩnh vực cho tư vấn viên</h1>
                            <div className='flex flex-row'>
                                <div className='mr-3'>
                                    <h1>Danh sách lĩnh vực:</h1>
                                    <div className="p-4 h-[400px] w-[400px] border-2 overflow-y-scroll rounded-md">
                                        <ul className="">
                                            {remainField.map((field) => (
                                                <button
                                                    key={field.id}
                                                    className="mb-2 text-sm text-left hover:bg-gray-300 w-full border-b py-1 flex justify-between items-center rounded-lg"
                                                    onClick={() => handleChoose(field.id)}>
                                                    <p className='font-roboto text-gray-500 ml-2'>{field.name}</p>
                                                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h1>Đã chọn:</h1>
                                    <div className="p-4 h-[400px] w-[400px] border-2 overflow-y-scroll rounded-md">
                                        <ul className="">
                                            {chooseField.length === 0 && <p className='text-sm font-roboto text-gray-500'>Chưa có lĩnh vực được chọn</p>}
                                            {chooseField && chooseField.map((field) => (
                                                <button
                                                    key={field.id}
                                                    className="mb-2 text-sm text-left hover:bg-gray-300 w-full border-b py-1 flex justify-between items-center rounded-lg"
                                                    onClick={() => handleUnchoose(field.id)}>
                                                    <p className='font-roboto text-gray-500 ml-2'>{field.name}</p>
                                                    <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>)
                }

                {(showInfor) ?
                    <div className="flex items-center justify-end mt-3">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={() => setShowInfor(false)}
                        >Thêm lĩnh vực</button>
                    </div>
                    :
                    <div className="flex items-center justify-end mt-3">
                        <button
                            className="mr-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                            onClick={() => setShowInfor(true)}
                        >Hủy</button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={() => handleAdd()}
                        >Thêm</button>
                    </div>
                }




            </div>
        </div>
    )
}

export default CounsellorDetail
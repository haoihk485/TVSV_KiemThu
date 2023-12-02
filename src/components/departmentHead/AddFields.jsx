import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDHGetFieldsNotInDep } from '../../pages/departmenthead/slice/dHFieldSlice';
import { DHFieldListDepNotHave } from '../../redux/selectors';
import { useState } from 'react';

const AddFields = ({ handleClose, handleAddField }) => {

    const dispatch = useDispatch()

    const initFieldList = useSelector(DHFieldListDepNotHave)


    const [remainField, setRemainField] = useState([])
    const [chooseField, setChooseField] = useState([]);

    useEffect(() => {
        dispatch(fetchDHGetFieldsNotInDep())
    }, [])

    useEffect(() => {
        if (!initFieldList || remainField.length !== 0) return
        setRemainField([...initFieldList])
    }, [initFieldList])

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

    const handleAdd = () => {
        const data = chooseField.map(field => field.id);
        handleAddField({ ids: data })
        dispatch(fetchDHGetFieldsNotInDep())
        setChooseField([])
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6">Thêm lĩnh vực cho phòng ban</h1>
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
                <div className="flex items-center justify-end mt-3">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                        onClick={() => handleAdd()}
                    >Thêm</button>
                </div>
            </div>
        </div>

    )
}
export default AddFields
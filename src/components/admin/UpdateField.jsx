import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const UpdateField = ({ handleClose, handleAddField }) => {
    const dispatch = useDispatch()

    const initFieldInfo = { name: '' }

    const [fieldInfo, setFieldInfo] = useState(initFieldInfo)

    const handleInputOnchange = async (e) => {
        setFieldInfo({ name: e.target.value })
    }

    const handleUpdate = async () => {
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6">Thêm Lĩnh vực</h1>
                <div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên lĩnh vực</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={fieldInfo.name}
                            onChange={e => handleInputOnchange(e)}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={() => handleUpdate()}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>)
}
export default UpdateField
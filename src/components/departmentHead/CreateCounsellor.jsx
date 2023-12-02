import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const CreateCounsellor = ({ handleClose, handleCreateCoun }) => {

    const initCounInfor = {
        name: '', email: '', phone: '', password: '', occupation: 'Tư vấn viên', role: 'counsellor'
    }

    const [counInfor, setCounInfor] = useState(initCounInfor)

    const handleInputOnChange = (e) => {
        setCounInfor({
            ...counInfor,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = () => {
        handleCreateCoun(counInfor)
    }

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-10">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6">Thêm Nhân sự</h1>
                <div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên nhân viên</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={counInfor.name}
                            onChange={(e) => handleInputOnChange(e)}
                        />
                    </div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                        <input
                            type="text"
                            id='phone'
                            name="phone"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={counInfor.phone}
                            onChange={(e) => handleInputOnChange(e)}
                        />
                    </div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 font-roboto">Email</label>
                        <input
                            type="text"
                            id='email'
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={counInfor.email}
                            onChange={(e) => handleInputOnChange(e)}
                        />
                    </div>

                    <div className="mb-4 font-roboto">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 font-roboto">Mật khẩu</label>
                        <input
                            type="password"
                            id='password'
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={counInfor.password}
                            onChange={(e) => handleInputOnChange(e)}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={() => handleAdd()}
                        >Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCounsellor
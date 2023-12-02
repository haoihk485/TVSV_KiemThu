import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


const CounsellorQuestionManage = () => {
    const navigate = useNavigate()

    const [searchKey, setSearchKey] = useState('')

    return (
        <div className='container w-[95%] mx-auto  my-5'>
            <div className="">
                <button onClick={() => navigate('/counsellor/home')} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>Quản lý câu hỏi</h1>
                <div className="flex space-x-4 justify-between my-4 flex-row-reverse">
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
                        <tr className=''>
                            <td className="font-roboto py-2 px-4 border-b text-center">1</td>
                            <td className="font-roboto py-2 px-4 border-b">1</td>
                            <td className="font-roboto py-2 px-4 border-b text-center">
                                <button className="bg-red-500 p-1 rounded-md"
                                    >
                                    aaaa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CounsellorQuestionManage
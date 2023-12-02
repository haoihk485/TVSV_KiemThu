import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { userDepList, userFieldList } from '../../redux/selectors';
import { useEffect } from 'react';
import { fetchUserGetDepFields, fetchUserGetDeps } from './slice/userSlice';
import { useState } from 'react';

const CreateQuestion = () => {

    const dispatch = useDispatch()
    const depList = useSelector(userDepList)
    const fieldList = useSelector(userFieldList)

    const initQuestionData = {
        title: '', content: '', fieldId: ''
    }

    const [questionData, setQuestionData] = useState(initQuestionData)
    const [depId, setDepId] = useState('')

    useEffect(() => {
        if (depList.length === 0)
            dispatch(fetchUserGetDeps())
    }, [])

    useEffect(() => {
        if (depId !== '')
            dispatch(fetchUserGetDepFields(depId))
    }, [depId])

    const handleInputChange = (e) => {
        setQuestionData({
            ...questionData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="border-x my-3 shadow-lg w-[80%] mx-auto rounded-md">
            <div className="text-xl font-bold text-white bg-primary font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                <HomeIcon></HomeIcon>
                <ChevronRightIcon></ChevronRightIcon>
                <p className="">Đặt câu hỏi</p>
            </div>
            <div className='my-3 p-2 flex flex-row'>
                <select
                    className="border p-2 rounded w-64"
                    onChange={(e) => setDepId(e.target.value)}>
                    <option value="">Chọn phòng ban</option>
                    {depList && depList.map((dep) => {
                        return <option value={dep.id} className='py-1'>{dep.name}</option>
                    })}
                </select>
                {(depId !== '') && <select className="border p-2 rounded w-64 mx-4">
                    <option value="">Chọn lĩnh vực</option>
                    {fieldList && fieldList.map((field) => {
                        return <option value="" className='py-1'>{field.name}</option>
                    })}
                </select>}
            </div>
            <div className='p-2'>
                <input
                    value={questionData.title}
                    type='text'
                    className='w-full border border-gray-600 rounded shadow-md text-xl p-2'
                    name='title'
                    placeholder='Tiêu đề'
                    onChange={(e) => handleInputChange(e)} />
                <textarea
                    name='content'
                    value={questionData.content}
                    rows={7}
                    className='w-full border border-gray-600 rounded shadow-md mt-3 p-1'
                    placeholder='Nội dung...'
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <div className='p-2 flex flex-row-reverse'>
                <button className='px-7 py-2 font-roboto text-white bg-green-500 rounded-md'>Đăng</button>
            </div>
        </div >)
}

export default CreateQuestion
import UserNavBar from "../../components/UserNavBar";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userTopicList, userDepList, userIsLoading, userTotalPage, isLogeedInSelector } from "../../redux/selectors";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { fetchUserGetDeps, fetchUserGetHome } from "../user/slice/userSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import blankAvt from '../../assets/img/blank_avt.png'
import { dateFormat, truncate } from "../../utils/string";
import Pagination from "../../components/Pagination";
import { fetchLogout } from "./authSlice";

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const depList = useSelector(userDepList)
    const topicList = useSelector(userTopicList)
    const isLoading = useSelector(userIsLoading)
    const totalPage = useSelector(userTotalPage)
    const isLoggedIn = useSelector(isLogeedInSelector)

    const [params, setParams] = useState({
        page: 0,
        size: 12
    })

    useEffect(() => {
        if (depList.length !== 0) return
            dispatch(fetchUserGetDeps())
    }, [])

    useEffect(() => {
        dispatch(fetchUserGetHome(params))
    }, [params])

    const handleLogout = () => {
        dispatch(fetchLogout());
    }


    return (
        <>
            {isLoading && <Spinner handleLogout={handleLogout}></Spinner>}
            <UserNavBar handleLogout={handleLogout}></UserNavBar>
            <div className="w-full h-44 bg-erise-black flex justify-between items-center p-5">
                <div>
                    <p className="text-ghost-white font-roboto text-2xl font-normal">Trang tư vấn sinh viên</p>
                    <p className="text-ghost-white font-roboto text-2xl font-extralight">Đại Học Sư Phạm Kỹ Thuật TPHCM</p>
                </div>
                <div>
                    <button
                        className="bg-[#530AD4] text-white flex font-roboto font-bold duration-500 px-6 py-2 mx-4 hover:bg-[#530AD4]/80 rounded float-right"
                        onClick={() => {
                            isLoggedIn ? navigate('/user/questions/create') : navigate('/login')
                        }}>
                        <HelpOutlineOutlinedIcon className="mr-1"></HelpOutlineOutlinedIcon>
                        Đặt câu hỏi
                    </button>
                </div>
            </div>
            <div className="flex p-1">
                <div className="p-1 w-3/4">
                    <div className="shadow-md border rounded-md">
                        <div className="text-xl font-bold text-white bg-primary font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                            <HomeIcon></HomeIcon>
                            <ChevronRightIcon></ChevronRightIcon>
                            <p className="">Hỏi đáp</p>
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-2">
                            {(topicList.length !== 0) && topicList.map((topic, i) => {
                                return (
                                    <div key={i} className="bg-white p-4 pb-1 rounded-md shadow-md h-52 border hover:bg-gray-200 duration-300 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center">
                                                <img src={blankAvt} alt="" className="h-14" />
                                                <div className="ml-2">
                                                    <p className="text-sm mb-2">{topic.name}</p>
                                                    <p className="text-xs text-gray-400">{dateFormat(topic.date)}</p>
                                                </div>
                                            </div>
                                            <p className="text-md font-semibold text-gray-500 mb-2">Tiêu đề: {topic.title}</p>
                                            <p className="text-sm text-gray-500 mb-2">Câu hỏi: {truncate(truncate(topic.content), 120)} </p>
                                        </div>
                                        <button className="text-secondary font-bold w-full border-t border-gray-300">{topic.answer ? 'Xem câu trả lời' : 'Chờ phản hồi'}</button>
                                    </div>
                                )
                            })}
                        </div>
                        <Pagination page={params.page} totalPage={totalPage}></Pagination>
                    </div>
                </div>
                <div className="p-1 w-1/4">
                    <div className="shadow-md border rounded-md">
                        <div className="text-xl font-bold text-white bg-secondary font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                            <HomeIcon></HomeIcon>
                            <ChevronRightIcon></ChevronRightIcon>
                            <p className="">Phòng ban</p>
                        </div>
                        <div className="h-[375px] overflow-y-scroll">
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200 duration-300">Tất cả phòng ban</button>
                            {
                                (depList.length !== 0) && depList.map((dep, i) => {
                                    return <button key={dep.id} className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200 duration-300">{dep.name}</button>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>)
}
export default Home;
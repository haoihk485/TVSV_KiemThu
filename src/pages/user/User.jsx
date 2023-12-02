import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { authLoadingSelector, isLogeedInSelector, userSelector } from "../../redux/selectors";
import { useEffect } from "react";
import { fetchGetUserInfo, fetchLogout } from "../public/authSlice";
import Spinner from "../../components/Spinner";
import UserNavBar from "../../components/UserNavBar";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';


const User = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(authLoadingSelector);
    const isLoggedIn = useSelector(isLogeedInSelector);
    const user = useSelector(userSelector)


    const handleLogout = () => {
        dispatch(fetchLogout());
    }

    useEffect(() => {
        dispatch(fetchGetUserInfo())
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const forward = (role) => {
        switch (role) {
            case 'ROLE_ADMIN':
                navigate('/admin/home')
                break;
            case 'ROLE_DEPARTMENT_HEAD':
                return navigate('/departmenthead/home')
            case 'ROLE_SUPERVISOR':
                return navigate('/supervisor/home')
            case 'ROLE_USER':
                return navigate('/')
            case 'ROLE_COUNSELLOR':
                return navigate('/counsellor/home')
            default:
                return navigate('/login')
        }
    }
    return (
        user?.role === 'ROLE_USER' ?
            <>
                {isLoading && <Spinner></Spinner>}
                <UserNavBar handleLogout={handleLogout}
                ></UserNavBar >
                <div className="w-full h-44 bg-erise-black flex justify-between items-center p-5">
                    <div>
                        <p className="text-ghost-white font-roboto text-2xl font-normal">Trang tư vấn sinh viên</p>
                        <p className="text-ghost-white font-roboto text-2xl font-extralight">Đại Học Sư Phạm Kỹ Thuật TPHCM</p>
                    </div>
                    <div>
                        <button
                            className="bg-[#530AD4] text-white flex font-roboto font-bold duration-500 px-6 py-2 mx-4 hover:bg-[#530AD4]/80 rounded float-right"
                            onClick={() =>
                                navigate('/')} >
                            <HelpOutlineOutlinedIcon className="mr-1"></HelpOutlineOutlinedIcon>
                            Xem các câu hỏi
                        </button>
                    </div>
                </div >
                <Outlet></Outlet>
                <Footer></Footer>
            </> : forward(user?.role)
    )
}
export default User
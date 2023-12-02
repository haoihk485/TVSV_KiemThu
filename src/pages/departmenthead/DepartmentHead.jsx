import { Outlet, useNavigate } from "react-router-dom"
import StaffNavBar from "../../components/StaffNavBar"
import Footer from "../../components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { authLoadingSelector, isLogeedInSelector, userSelector } from "../../redux/selectors";
import { useEffect } from "react";
import { fetchGetUserInfo, fetchLogout } from "../public/authSlice";
import Spinner from "../../components/Spinner";

const DepartmentHead = () => {

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
            navigate('/login');
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
                return navigate('/user/home')
            case 'ROLE_COUNSELLOR':
                return navigate('/counsellor/home')
            default:
                return navigate('/login')
        }
    }
    return (
        user?.role === 'ROLE_DEPARTMENT_HEAD' ?
            <>
                {isLoading && <Spinner></Spinner>}
                <StaffNavBar
                    handleLogout={handleLogout}
                    name={user?.name}
                    role={user?.role === 'ROLE_DEPARTMENT_HEAD' ? 'Department Head' : 'unknow'}></StaffNavBar >
                <Outlet></Outlet>
                <Footer></Footer>
            </> : forward(user?.role)
    )
}
export default DepartmentHead
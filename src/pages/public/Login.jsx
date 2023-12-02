import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, resetError } from './AuthSlice.js';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import bg from '../../assets/img/login_background.png'
import Spinner from '../../components/Spinner.jsx';
import LoginForm from '../../components/Loginform';
import {
    authLoadingSelector,
    errorAuthSelector,
    isLogeedInSelector,
    userSelector
} from '../../redux/selectors.js';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(isLogeedInSelector)
    const user = useSelector(userSelector)
    const errorLogin = useSelector(errorAuthSelector)
    const isLoading = useSelector(authLoadingSelector)

    const handleLogin = (data) => {
        dispatch(fetchLogin(data))
    }

    useEffect(() => {
        if (!user) return
        if (isLoggedIn) {
            switch (user.role) {
                case 'ROLE_ADMIN':
                    navigate('/admin/home')
                    break;
                case 'ROLE_DEPARTMENT_HEAD':
                    navigate('/departmenthead/home')
                    break;
                case 'ROLE_SUPERVISOR':
                    navigate('/supervisor/home')
                    break;
                case 'ROLE_USER':
                    navigate('/user/home')
                    break;
                case 'ROLE_COUNSELLOR':
                    navigate('/counsellor/home')
                    break;
                default:
                    break;

            }
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (errorLogin !== null) {
            toast.error(errorLogin, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(resetError())
        }
    }, [errorLogin])

    return (
        <div className='flex h-screen items-center justify-between'>
            {isLoading && <Spinner></Spinner>}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className={'absolute'}
            />
            <div className='ml-20'>
                <LoginForm handleLogin={handleLogin}></LoginForm>
            </div>
            <div className='ml-10 hidden lg:block'>
                <img src={bg} alt="" className='h-screen' />
            </div>
        </div>
    );
};

export default Login
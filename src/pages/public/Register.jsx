import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegsiter, resetError, resetSuccessRegister } from './AuthSlice';
import { authLoadingSelector, errorAuthSelector, succesRegisterSelector } from '../../redux/selectors';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Spinner from '../../components/Spinner';
import RegisterForm from '../../components/RegisterForm';
import bg from '../../assets/img/login_background.png'
import { useNavigate } from 'react-router';





const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const errorRegister = useSelector(errorAuthSelector)
    const isLoading = useSelector(authLoadingSelector)
    const successRegister = useSelector(succesRegisterSelector)

    useEffect(() => {
        if (errorRegister !== null) {
            toast.error(errorRegister, {
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
    }, [errorRegister])

    useEffect(() => {
        if (successRegister === true) {
            navigate('/login')
            dispatch(resetSuccessRegister())
        }
    }, [successRegister])

    const handleRegister = (data) => {
        dispatch(fetchRegsiter(data))
    }

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
                <RegisterForm handleRegister={handleRegister}></RegisterForm>
            </div>
            <div className='ml-10'>
                <img src={bg} alt="" className='h-screen' />
            </div>
        </div>
    );
};

export default Register
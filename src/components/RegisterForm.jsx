import { useState } from "react"
import { Link } from "react-router-dom"
import validator from "validator"
const RegisterForm = ({ handleRegister }) => {
    const initialRegisterData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        occupation: 'Sinh Viên'
    }
    const initialError = {
        name: '',
        email: '',
        phone: '',
        password: '',
        repassword: ''
    }
    const [registerData, setRegisterData] = useState(initialRegisterData)
    const [error, setError] = useState(initialError)
    const [repassword, setRepassword] = useState('')

    const handleDataChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const nameValidator = () => {
        if (registerData.name === '') {
            setError({
                ...error,
                name: 'Tên không được bỏ trống!'
            })
            return false
        } else {
            setError({
                ...error,
                name: ''
            })
            return true
        }
    }

    const emailValidator = () => {
        if (registerData.email === '') {
            setError({
                ...error,
                email: 'Email không được để trống'
            })
            return false
        }
        else if (!validator.isEmail(registerData.email)) {
            setError({
                ...error,
                email: 'Email không hợp lệ'
            })
            return false
        }
        else {
            setError({
                ...error,
                email: ''
            })
            return true
        }
    }

    const phoneValidator = () => {
        if (registerData.phone === '') {
            setError({
                ...error,
                phone: 'Số điện thoại không được để trống'
            })
            return false
        }
        else if (!validator.isMobilePhone(registerData.phone)) {
            setError({
                ...error,
                phone: 'Số điện thoại không hợp lệ'
            })
            return false
        }
        else {
            setError({
                ...error,
                phone: ''
            })
            return true
        }
    }

    const passwordValidator = () => {
        if (registerData.password === '') {
            setError({
                ...error,
                password: 'Mật khẩu không được để trống'
            })
            return false
        }
        else {
            setError({
                ...error,
                password: ''
            })
            return true
        }
    }

    const repasswordValidator = () => {
        if (registerData.password !== repassword) {
            setError({
                ...error,
                repassword: 'Nhập lại mật khẩu không đúng'
            })
            return false
        }
        else {
            setError({
                ...error,
                repassword: ''
            })
            return true
        }
    }
    const handleRegisterClick = () => {
        if (phoneValidator()
            && nameValidator()
            && emailValidator()
            && passwordValidator()
            && repasswordValidator()) {
            handleRegister(registerData)
        }
    }


    return (
        <div className="w-[640px] flex justify-center flex-col">
            <h2 className="text-3xl font-semibold mb-4 text-primary font-roboto ml-3 inline-block">
                Đăng ký - <p className="text-cerise inline-block">Tư Vấn Sinh Viên HCMUTE</p>
            </h2>
            <div className="w-full border-t border-gray-300 mb-3"></div>
            <form className="flex">
                <div className="w-[310px]">
                    <div className={`${(error.phone === '') ? "mb-6" : ""}`}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleDataChange(e)}
                            onBlur={() => phoneValidator()} />
                        {(error.phone !== '') && <p className="inline-block text-xs text-red-500">{error.phone}</p>}
                    </div>
                    <div className={`${(error.email === '') ? "mb-6" : ""}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 font-roboto">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleDataChange(e)}
                            onBlur={() => emailValidator()} />
                        {(error.email !== '') && <p className="inline-block text-xs text-red-500">{error.email}</p>}
                    </div>
                    <div className={`${(error.name === '') ? "mb-6" : ""}`}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Họ & Tên</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleDataChange(e)}
                            onBlur={() => nameValidator()} />
                        {(error.name !== '') && <p className="inline-block text-xs text-red-500">{error.name}</p>}
                    </div>

                </div>
                <div className="w-[310px] ml-[10px]">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600">Nghề nghiệp</label>
                        <select
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            name="occupation"
                            id="ngheNghiep"
                            onChange={e => handleDataChange(e)}
                        >
                            <option value="Sinh Viên">Sinh Viên</option>
                            <option value="Học Sinh">Học Sinh</option>
                            <option value="Phụ Huynh">Phụ Huynh</option>
                            <option value="Cựu Sinh Viên">Cựu Sinh Viên</option>
                        </select>
                    </div>
                    <div className={`${(error.password === '') ? "mb-6" : ""}`}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => handleDataChange(e)}
                            onBlur={() => passwordValidator()} />
                        {(error.password !== '') && <p className="inline-block text-xs text-red-500">{error.password}</p>}
                    </div>
                    <div className={`${(error.repassword === '') ? "mb-6" : ""}`}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                            onChange={e => setRepassword(e.target.value)}
                            onBlur={() => repasswordValidator()} />
                        {(error.repassword !== '') && <p className="inline-block text-xs text-red-500">{error.repassword}</p>}
                    </div>
                </div>
            </form>
            <button
                className="w-80 bg-[#19376D] text-white p-2 rounded-md hover:bg-secondary font-roboto mx-auto mt-3"
                onClick={() => handleRegisterClick()}>Đăng kí</button>
            <p className="text-xs  mt-2 text-center">Đã có tài khoản? <Link to={'/login'} className="font-bold text-primary">Đăng Nhập</Link></p>
        </div>
    )
}

export default RegisterForm
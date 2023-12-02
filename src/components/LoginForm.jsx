import { useState } from "react"
import { Link } from "react-router-dom"
import validator from "validator"
const LoginForm = ({ handleLogin }) => {
    const initialStateError = {
        isError: false,
        errorMessage: ''
    }

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [phoneError, setPhoneError] = useState(initialStateError)
    const [passwordError, setPasswordError] = useState(initialStateError)

    const phoneValidator = () => {
        if (phone == '') {
            setPhoneError({
                isError: true,
                errorMessage: 'Số điện thoại không được để trống'
            })
            return false
        }
        else if (!validator.isMobilePhone(phone)) {
            setPhoneError({
                isError: true,
                errorMessage: 'Số điện thoại không hợp lệ'
            })
            return false
        }
        else {
            setPhoneError(initialStateError)
            return true
        }
    }

    const passwordValidator = () => {
        if (password == '') {
            setPasswordError(
                {
                    isError: true,
                    errorMessage: 'Mật khẩu không được để trống'
                }
            )
            return false
        }
        else {
            setPasswordError(initialStateError);
            return true
        }
    }

    const handleLoginClick = () => {
        if (phoneValidator() && passwordValidator()) {
            handleLogin({ "username": phone, password })
        }

    }

    return (
        <div className="w-[640px]">
            <h2 className="text-3xl font-semibold mb-4 text-primary font-roboto ml-3 inline-block">
                Đăng Nhập - <p className="text-cerise inline-block">Tư Vấn Sinh Viên HCMUTE</p>
            </h2>
            <div className={`w-full border-t border-gray-300 mb-3}`}></div>
            <div className="w-80">
                <div className={`${phoneError.isError ? "" : "mb-6"}`}>
                    <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                    <input type="tel"
                        name="phone"
                        className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onBlur={() => phoneValidator()} />
                    {phoneError.isError && <p className="inline-block text-xs text-red-500">{phoneError.errorMessage}</p>}
                </div>
                <div className={`${passwordError.isError ? "" : "mb-6"}`}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                    <input type="password"
                        name="password"
                        className="mt-1 p-2 w-full rounded-md border-2 border-primary text-sm"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onBlur={() => passwordValidator()} />
                    {passwordError.isError && <p className="inline-block text-xs text-red-500">{passwordError.errorMessage}</p>}
                </div>
                <button className="w-full bg-[#19376D] text-white p-2 rounded-md hover:bg-secondary font-roboto"
                    onClick={handleLoginClick}>Đăng nhập</button>
                <p className="text-xs  mt-2 text-center">Chưa có tài khoản? <Link to={'/register'} className="font-bold text-primary">Đăng kí</Link></p>
            </div>
        </div>
    )
}

export default LoginForm
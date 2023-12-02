import { useState } from 'react'
import blankAvt from '../assets/img/blank_avt.png'


const StaffNavBar = ({ handleLogout, role, name }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav className="bg-ghost-white shadow-md border-b">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center ml-3">
                    <a href="/" className="text-2xl font-bold text-cerise">HCMUTE TVSV</a>
                </div>
                <div className="mr-3">
                    <p className='inline-block mr-4 font-roboto text-primary font-bold'>{role}</p>
                    <img src={blankAvt} alt="" className='rounded-full w-6 h-6 inline-block cursor-pointer'
                        onClick={() => (setShowMenu(!showMenu))} />
                    {
                        showMenu && <div className="absolute mt-2 w-60 bg-ghost-white rounded-md shadow-lg right-3 overflow-hidden">
                            <ul className="">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-400"
                                    >
                                        Thông tin người dùng
                                    </a>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-400 w-full text-left"
                                        onClick={() => handleLogout()}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </nav >
    )
}

export default StaffNavBar
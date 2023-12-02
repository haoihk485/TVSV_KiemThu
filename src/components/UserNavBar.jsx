import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/img/logo.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isLogeedInSelector } from '../redux/selectors';
import { useNavigate } from 'react-router-dom';

const UserNavBar = () => {

    const isLoggedIn = useSelector(isLogeedInSelector)

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav className="p-1 bg-white shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center ">
                <span className="text-2xl font-[Poppins] cursor-pointer flex">
                    <img className="h-8 inline"
                        src={logo} />
                    <p className='ml-1 inline text-primary font-semibold'>HCM</p>
                    <p className='inline text-cerise font-semibold'>UTE</p>
                </span>

                {showMenu ?
                    <button className="text-3xl cursor-pointer mx-2 md:hidden block"
                        onClick={() => {
                            setShowMenu(!showMenu)
                        }}>
                        <CloseIcon></CloseIcon>
                    </button>
                    :
                    <button className="text-3xl cursor-pointer mx-2 md:hidden block"
                        onClick={() => {
                            setShowMenu(!showMenu)
                        }
                        }>
                        <DehazeIcon></DehazeIcon>
                    </button>
                }
            </div>

            <ul className={`md:flex md:items-center ${showMenu ? '' : 'z-[-1] top-[-400px] opacity-0'} md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  transition-all ease-in duration-500 md:shadow-none shadow-md`}>
                <li className="mx-4 my-6 md:my-0">
                    <p className="text-lg hover:text-cyan-500 duration-500 cursor-pointer">Trang chủ</p>
                </li>
                {isLoggedIn ?
                    <button className="bg-cerise text-white font-roboto duration-500 px-6 py-2 mx-4 hover:bg-secondary rounded ">
                        Đăng xuất
                    </button> :
                    <button
                        className="bg-primary text-white font-roboto duration-500 px-6 py-2 mx-4 hover:bg-secondary rounded "
                        onClick={()=>navigate('/login')}>
                        Đăng nhập
                    </button>}
            </ul>
        </nav>
    )
}

export default UserNavBar
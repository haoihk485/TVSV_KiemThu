import UserNavBar from "../../components/UserNavBar";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import Footer from "../../components/Footer";

const Home = () => {
    return (
        <>
            <UserNavBar></UserNavBar>
            <div className="w-full h-44 bg-erise-black flex justify-between items-center p-5">
                <div>
                    <p className="text-ghost-white font-roboto text-2xl font-normal">Trang tư vấn sinh viên</p>
                    <p className="text-ghost-white font-roboto text-2xl font-extralight">Đại Học Sư Phạm Kỹ Thuật TPHCM</p>
                </div>
                <div>
                    <button
                        className="bg-[#530AD4] text-white flex font-roboto font-bold duration-500 px-6 py-2 mx-4 hover:bg-[#530AD4]/80 rounded float-right"
                        onClick={() => navigate('/register')}>
                        <HelpOutlineOutlinedIcon className="mr-1"></HelpOutlineOutlinedIcon>
                        Đặt câu hỏi
                    </button>
                </div>
            </div>
            <div className="flex p-1">
                <div className="p-1 w-3/4">
                    <div className="text-xl font-bold text-white bg-primary font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                        <HomeIcon></HomeIcon>
                        <ChevronRightIcon></ChevronRightIcon>
                        <p className="">Hỏi đáp</p>
                    </div>
                </div>
                <div className="p-1 w-1/4">
                    <div className="shadow-md border rounded-md">
                        <div className="text-xl font-bold text-white bg-secondary font-roboto rounded-t-md pl-3 py-1 cursor-default flex items-center">
                            <HomeIcon></HomeIcon>
                            <ChevronRightIcon></ChevronRightIcon>
                            <p className="">Phòng ban</p>
                        </div>
                        <div className="">
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                            <button className="block py-1 pl-3 font-semibold font-roboto text-gray-500 border-b w-full text-left hover:bg-gray-200">Phong ban</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>)
}
export default Home;
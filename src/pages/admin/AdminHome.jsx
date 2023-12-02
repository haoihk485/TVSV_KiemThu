import { useNavigate } from "react-router"


import userManage from "../../assets/img/user_manage.jpg"
import departmentManage from "../../assets/img/department_manage.jpg"
import statistic from "../../assets/img/statistic.jpg"
import fieldManage from "../../assets/img/field_manage.jpg"
import questionManage from "../../assets/img/question_manage.jpg"


const AdminHome = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div className="bg-ghost-white p-2 rounded-lg shadow-md border hover:bg-gray-200 mx-auto"
                        onClick={() => navigate('/admin/users')}>
                        <img src={userManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý người dùng</p>
                    </div>
                    <div className="bg-ghost-white p-2 rounded-lg shadow-md border hover:bg-gray-200"
                        onClick={() => navigate('/admin/departments')}>
                        <img src={departmentManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý phòng ban</p>
                    </div>
                    <div className="bg-ghost-white p-2 rounded-lg shadow-md border hover:bg-gray-200"
                        onClick={() => navigate('/admin/fields')}>
                        <img src={fieldManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý Lĩnh vực</p>
                    </div>
                    <div className="bg-ghost-white p-2 rounded-lg shadow-md border hover:bg-gray-200">
                        <img src={questionManage} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Quản lý câu hỏi</p>
                    </div>
                    <div className="bg-ghost-white p-2 rounded-lg shadow-md border hover:bg-gray-200">
                        <img src={statistic} alt="" className="w-60 h-60 rounded-lg" />
                        <p className="font-roboto text-lg font-semibold text-center text-primary mt-2">Thống kê</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome
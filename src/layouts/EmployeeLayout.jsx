import Sidebar from "../components/Sidebar/Sidebar";
import EmplyeeRoutes from "../routes/employeeRoutes";
function EmployeeLayout() {
    return (
        <>
            <div className='flex flex-row bg-gradient-to-br from-[#CDE1DF] to-[#00B5AC]'>
                <Sidebar />
                <div className="w-screen">
                    <EmplyeeRoutes />
                </div>
            </div>
        </>

    )
}

export default EmployeeLayout

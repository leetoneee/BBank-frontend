import Sidebar from "../components/Sidebar/Sidebar";
import CustomerRoutes from "../routes/customerRoutes";
function MainLayout() {
    return (
        <>
            <div className='flex flex-row bg-gradient-to-br from-[#CDE1DF] to-[#00B5AC]'>
                <Sidebar />
                <div className="w-screen">
                    <CustomerRoutes />
                </div>
            </div>
        </>

    )
}

export default MainLayout

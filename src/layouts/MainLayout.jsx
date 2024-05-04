import Sidebar from "../components/Sidebar/Sidebar";
import NavPage from "../routes/routes";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <div className='flex flex-row bg-gradient-to-br from-[#CDE1DF] to-[#00B5AC]'>
                <Sidebar />
                <div className="w-screen">
                    <NavPage />
                </div>
            </div>
            {/* <Outlet /> */}
        </>

    )
}

export default MainLayout

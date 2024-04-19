import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import NavPage from "../routes/NavPage";

function MainLayout() {
    return (
        <Router>
            <div className='flex flex-row bg-gradient-to-br from-[#CDE1DF] to-[#00B5AC]'>
                <Sidebar />
                <div className="w-screen">
                    <NavPage />
                </div>
            </div>
        </Router>
    )
}

export default MainLayout

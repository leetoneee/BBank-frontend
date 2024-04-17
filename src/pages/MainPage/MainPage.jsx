import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavPage from "../NavPage/NavPage";

function MainPage() {
    return (
        <Router>
            <div className='flex flex-row'>
                <Sidebar />
                <NavPage />
            </div>
        </Router>

    )
}

export default MainPage

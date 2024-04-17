import UserInfo from "../../components/UserInfo/UserInfo";
import { classNames } from "../../components/classNames/classNames";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import { GlobalProvider } from "../../context";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
const Home = () => {
    return (
        <GlobalProvider>
            <div className="grid grid-cols-6">
                <UserInfo />
                <div className="col-start-2 col-end-7 flex flex-col">
                    <div className="grid grid-rows-7">/
                        <div className="row-start-1 ">
                            <Header />
                        </div>
                        <div className="row-start-2 row-end-8">

                        </div>
                    </div>
                </div>


            </div>
        </GlobalProvider>

    )
}

export default Home;
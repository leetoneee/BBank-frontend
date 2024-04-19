import UserInfo from "../../components/UserInfo/UserInfo";
import { GlobalProvider } from "../../context";
import Header from "../../components/Header/Header";
const Home = () => {
    return (
        <GlobalProvider>
            <div className="grid grid-cols-11 grid-flow-col-dense">
                <div className="col-start-1 col-span-2">
                    <UserInfo />
                </div>
                <div className="col-end-12 col-span-9 grid auto-rows-max grid-flow-row-dense">
                    <Header />
                    <div className="w-auto min-h-screen bg-uit-pattern bg-center bg-no-repeat mix-blend-soft-light ">
                    </div>
                </div>
            </div>
        </GlobalProvider>

    )
}

export default Home;
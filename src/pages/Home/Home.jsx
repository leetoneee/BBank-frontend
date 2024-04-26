import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Carousel from '../../components/Carousel/Carousel';
import slide1 from '../../assets/icons/slide1.svg';
import slide2 from '../../assets/icons/slide2.svg';
import readMoney from "../../utils/n2vi";
const Home = () => {
    const slides = [
        slide1,
        slide2,
    ]
    const sum = readMoney('124567');
    return (
        <div className="grid grid-cols-11 grid-flow-col-dense">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                <div className="sticky top-0">
                    <Header />
                </div>
                <div className="w-auto bg-uit-pattern bg-center bg-no-repeat bg-scroll overflow-auto flex flex-col gap-4">
                    <div className="bg-[#40494C]/[70%] h-auto flex justify-center px-[60px] pt-[72px] ">
                        <div className="bg-gradient-to-b from-[#047AEE] to-[#9747FF] h-56 w-full max-w-[1256px] rounded-[20px] p-1 mb-20">
                            <Carousel autoSlide={true}>
                                {
                                    slides.map((s, index) => (
                                        <img key={index} className="object-fill h-56 min-w-[1256px]" src={s} />))
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="bg-[#40494C]/[70%] h-44">
                        {sum}
                    </div>
                    <div className="bg-[#40494C]/[70%] h-44">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;
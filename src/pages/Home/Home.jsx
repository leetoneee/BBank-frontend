import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Carousel from '../../components/Carousel/Carousel';
import slide1 from '../../assets/icons/slide1.svg';
import slide2 from '../../assets/icons/slide2.svg';
import fast_ChuyenTien from '../../assets/icons/fast_ChuyenTien.svg';
import fast_TietKiem from '../../assets/icons/fast_TietKiem.svg';
import luaChonChucNang from '../../assets/icons/luaChonChucNang.svg';
import ic_ChuyenTien from '../../assets/icons/ic_ChuyenTien.svg';
import ic_ChuyenTienMat from '../../assets/icons/ic_ChuyenTienMat.svg';
import ic_TietKiemThuong from '../../assets/icons/ic_TietKiemThuong.svg';
import ic_TietKiemTuDong from '../../assets/icons/ic_TietKiemTuDong.svg';
import uitPattern from '../../assets/icons/uitPattern.svg'
import { LongTooltip } from "../../components/Tooltip/LongTooltip";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const slides = [
        slide1,
        slide2,
    ]

    const fastFeatures = [
        { icon: fast_ChuyenTien, content: 'Chuyển tiền trong BBank', href: 'transfer' },
        { icon: fast_TietKiem, content: 'Chuyển tiết kiệm', href: '' },
    ]

    const chuyenTienGroup = [
        { icon: ic_ChuyenTien, content: 'Chuyển tiền trong BBank', href: 'transfer' },
        { icon: ic_ChuyenTienMat, content: 'Chuyển tiền mặt', href: '' },
    ]

    const tietkiemGroup = [
        { icon: ic_TietKiemThuong, content: 'Tiết kiệm thường' },
        { icon: ic_TietKiemTuDong, content: 'Cài đặt Tiết kiệm tự động' },
    ]

    return (
        <>
            <div className="grid grid-cols-11 grid-flow-col-dense ">
                <div className="col-start-1 col-span-2 z-50">
                    <UserInfo />
                </div>
                <div className="col-end-12 col-span-9 flex flex-col">
                    {/* Header */}
                    <div className="sticky top-0 z-30">
                        <Header />
                    </div>

                    {/* article */}
                    <div className="w-auto overflow-auto flex flex-col gap-4">
                        <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center" />

                        <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px] z-10">
                            {/* Carousel */}
                            <div className="bg-gradient-to-b from-[#047AEE] to-[#9747FF] h-56 w-full max-w-[1256px] rounded-[20px] p-1 mb-20 self-center">
                                <Carousel autoSlide={true}>
                                    {
                                        slides.map((s, index) => (
                                            <img key={index} className="object-fill h-56 min-w-[1256px]" src={s} />))
                                    }
                                </Carousel>
                            </div>

                            {/* Fast Features */}
                            <div className="flex flex-wrap mb-20 px-36 gap-11 items-center  ">
                                {
                                    fastFeatures.map((item, index) => (
                                        <img key={index} src={item.icon}
                                            alt=""
                                            className="h-[134px] min-w-[185px] self-center transition ease-in-out delay-150 hover:-translate-y-1 hover:drop-shadow-2xl-green duration-300"
                                            onClick={() => navigate(item.href)} />
                                    ))
                                }
                                <img src={luaChonChucNang} alt=""
                                    className="h-[134px] w-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:drop-shadow-green hover:border hover:border-dashed hover:border-green-500 rounded-[20px] duration-300"
                                    onClick={() => navigate('../setting/fastfeatures')} />
                            </div>

                            {/* Mục Chuyển tiền */}
                            <div>
                                {/* Title */}
                                <LongTooltip position="right" content="Hình thức chuyển tiền phong phú, đơn giản, nhanh chóng, an toàn, mạng lưới chi trả rộng khắp cả nước.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2">
                                            <span className="font-museo-slab-100  ">Chuyển tiền</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>

                                {/* List features */}
                                <div className="flex flex-wrap mb-20 px-36 gap-11 items-center mt-20 ">
                                    {
                                        chuyenTienGroup.map((item, index) => (
                                            <div className="grid grid-rows-2  ">
                                                <img key={index} src={item.icon} alt=""
                                                    className=" bg-[#6B7E84] max-h-[134px] max-w-[134px] transition ease-in-out hover:bg-[#82898B] rounded-[20px] p-10 duration-300 m-auto "
                                                    onClick={() => navigate(item.href)} />
                                                <span className="font-museo-slab-100 text-2xl text-white text-wrap max-w-[185px] text-center pt-2">{item.content}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Mục tính dụng */}
                        {/* <div className="bg-[#40494C]/[70%] h-auto z-10">
                            <div className="mt-24">
                                <LongTooltip position="right" content="Hình thức chuyển tiền phong phú, đơn giản, nhanh chóng, an toàn, mạng lưới chi trả rộng khắp cả nước." >
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2">
                                            <span className="font-museo-slab-100  ">Tín dụng</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>
                            </div>
                        </div> */}

                        {/* Mục Tiết Kiệm */}
                        <div className="bg-[#40494C]/[70%] h-auto z-10">
                            <div className="mt-24">
                                {/* Title */}
                                <LongTooltip position="right" content="Hình thức chuyển tiền phong phú, đơn giản, nhanh chóng, an toàn, mạng lưới chi trả rộng khắp cả nước.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2">
                                            <span className="font-museo-slab-100  ">Tiết kiệm</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div class="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>

                                {/* List features */}
                                <div className="flex flex-wrap mb-20 px-36 gap-11 items-center mt-20 ">
                                    {
                                        tietkiemGroup.map((item, index) => (
                                            <div className="grid grid-rows-2  ">
                                                <img key={index} src={item.icon} alt=""
                                                    className=" bg-[#6B7E84] max-h-[134px] max-w-[134px] transition ease-in-out hover:bg-[#82898B] rounded-[20px] p-10 duration-300 m-auto "
                                                />
                                                <span className="font-museo-slab-100 text-2xl text-white text-wrap max-w-[185px] text-center pt-2">{item.content}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Home;
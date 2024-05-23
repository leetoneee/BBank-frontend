import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Carousel from '../../components/Carousel/Carousel';
import slide1 from '../../assets/icons/slide1.svg';
import slide2 from '../../assets/icons/slide2.svg';
import fast_ChuyenTien from '../../assets/icons/fast_ChuyenTien.svg';
import fast_TietKiem from '../../assets/icons/fast_TietKiem.svg';
import luaChonChucNang from '../../assets/icons/luaChonChucNang.svg';
import uitPattern from '../../assets/icons/uitPattern.svg'
import { LongTooltip } from "../../components/Tooltip/LongTooltip";
import { useNavigate, Outlet } from "react-router-dom";
import ic_LapHoSoKH from '../../assets/icons/ic_LapHoSoKH.svg'
import ic_MoTaiKhoan from '../../assets/icons/ic_MoTaiKhoan.svg'
import ic_NopTienMat from '../../assets/icons/ic_NopTienMat.svg'
import ic_RutTienMat from '../../assets/icons/ic_RutTienMat.svg'
import ic_GuiTietKiem from '../../assets/icons/ic_GuiTietKiem.svg'
import ic_RutTietKiem from '../../assets/icons/ic_RutTietKiem.svg'
import ic_ThongKe from '../../assets/icons/ic_ThongKe.svg'
import ic_SaoKe from '../../assets/icons/ic_SaoKe.svg'
import ic_TraCuu from '../../assets/icons/ic_TraCuu.svg'

const EHome = () => {
    const navigate = useNavigate();

    const slides = [
        slide1,
        slide2,
    ]

    const fastFeatures = [
        { icon: fast_ChuyenTien, content: 'Chuyển tiền trong BBank', href: '' },
        { icon: fast_TietKiem, content: 'Chuyển tiết kiệm', href: '' },
    ]

    const khachHangGroup = [
        { icon: ic_LapHoSoKH, content: 'Lập hồ sơ thông tin khách hàng', href: 'customer-group/profile' },
        { icon: ic_MoTaiKhoan, content: 'Mở tài khoản khách hàng', href: 'customer-group/account' },
    ]

    const dichVuGroup = [
        { icon: ic_NopTienMat, content: 'Lập phiếu nộp tiền mặt', href: 'service-group/deposit-account' },
        { icon: ic_RutTienMat, content: 'Lập phiếu rút tiền mặt', href: 'service-group/withdraw-account' },
        { icon: ic_GuiTietKiem, content: 'Lập phiếu gửi tiền tiết kiệm từ tài khoản', href: 'service-group/deposit-saving' },
        { icon: ic_GuiTietKiem, content: 'Lập phiếu gửi tiền tiết kiệm truyền thống', href: 'service-group/deposit-saving-traditional' },
        { icon: ic_RutTietKiem, content: 'Lập phiếu rút tiền tiết kiệm', href: 'service-group/withdraw-saving' },
    ]

    const thongKeGroup = [
        { icon: ic_ThongKe, content: 'Báo cáo thống kê gửi tiết kiệm', href: 'statistic-group/saving-date' },
        { icon: ic_SaoKe, content: 'Sao kê tài khoản', href: 'statistic-group/statement' },
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

                        <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen">
                            {/* Carousel */}
                            <div className="bg-gradient-to-b from-[#047AEE] to-[#9747FF] h-56 w-full max-w-[1256px] rounded-[20px] p-1 mb-20 self-center">
                                <Carousel autoSlide={true}>
                                    {
                                        slides.map((s, index) => (
                                            <img key={index} className="object-fill h-56 min-w-[1256px]" src={s} />))
                                    }
                                </Carousel>
                            </div>

                            {/* Mục Khách hàng */}
                            <div>
                                {/* Title */}
                                <LongTooltip position="right" content="Hình thức chuyển tiền phong phú, đơn giản, nhanh chóng, an toàn, mạng lưới chi trả rộng khắp cả nước.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2 " onClick={() => navigate('customer-group')} >
                                            <span className="font-museo-slab-100  ">Khách hàng</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>

                                {/* List features */}
                                <div className="flex flex-wrap mb-20 px-36 gap-11 items-center mt-20 ">
                                    {
                                        khachHangGroup.map((item, index) => (
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

                        {/* Mục Dịch vụ */}
                        <div className="bg-[#40494C]/[70%] h-auto z-10">
                            <div className="mt-24">
                                {/* Title */}
                                <LongTooltip position="right" content="Lãi suất cao, thời gian gửi linh hoạt, bảo mật tuyệt đối, cơ hội tham gia nhiều chương trình khuyến mãi hấp dẫn, miễn phí quản lý tài khoản.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2"
                                            onClick={() => navigate('service-group')}>
                                            <span className="font-museo-slab-100  ">Dịch vụ</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>

                                {/* List features */}
                                <div className="flex flex-wrap mb-20 px-36 gap-11 items-center mt-20 ">
                                    {
                                        dichVuGroup.map((item, index) => (
                                            <div className="grid grid-rows-2  ">
                                                <img key={index} src={item.icon} alt=""
                                                    className=" bg-[#6B7E84] max-h-[134px] max-w-[134px] transition ease-in-out hover:bg-[#82898B] rounded-[20px] p-10 duration-300 m-auto "
                                                    onClick={() => navigate(item.href)}
                                                />
                                                <span className="font-museo-slab-100 text-2xl text-white text-wrap max-w-[185px] text-center pt-2">{item.content}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Mục Báo cáo thống kê */}
                        <div className="bg-[#40494C]/[70%] h-auto z-10">
                            <div className="mt-24">
                                {/* Title */}
                                <LongTooltip position="right" content="Lãi suất cao, thời gian gửi linh hoạt, bảo mật tuyệt đối, cơ hội tham gia nhiều chương trình khuyến mãi hấp dẫn, miễn phí quản lý tài khoản.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2"
                                            onClick={() => navigate('statistic-group')}>
                                            <span className="font-museo-slab-100  ">Báo cáo/Thống kê</span>
                                        </div>

                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-2"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                        <div className="bg-[#485356] h-5 w-5 rounded-full self-center ml-1"></div>
                                    </div>
                                </LongTooltip>

                                {/* List features */}
                                <div className="flex flex-wrap mb-20 px-36 gap-11 items-center mt-20 ">
                                    {
                                        thongKeGroup.map((item, index) => (
                                            <div className="grid grid-rows-2  ">
                                                <img key={index} src={item.icon} alt=""
                                                    className=" bg-[#6B7E84] max-h-[134px] max-w-[134px] transition ease-in-out hover:bg-[#82898B] rounded-[20px] p-10 duration-300 m-auto "
                                                    onClick={() => navigate(item.href)}
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

export default EHome;
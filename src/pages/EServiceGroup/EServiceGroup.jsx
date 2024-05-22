import React from 'react'
import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import uitPattern from '../../assets/icons/uitPattern.svg'
import { LongTooltip } from "../../components/Tooltip/LongTooltip";
import { useNavigate } from 'react-router-dom';
import ic_NopTienMatGreen from '../../assets/icons/ic_NopTienMatGreen.svg'
import ic_RutTienMatGreen from '../../assets/icons/ic_RutTienMatGreen.svg'
import ic_GuiTietKiemGreen from '../../assets/icons/ic_GuiTietKiemGreen.svg'
import ic_RutTietKiemGreen from '../../assets/icons/ic_RutTietKiemGreen.svg'

function EServiceGroup() {
    const navigate = useNavigate()

    const dichVuGroup = [
        { icon: ic_NopTienMatGreen, content: 'Lập phiếu nộp tiền mặt', href: 'deposit-account' },
        { icon: ic_RutTienMatGreen, content: 'Lập phiếu rút tiền mặt', href: 'withdraw-account' },
        { icon: ic_GuiTietKiemGreen, content: 'Lập phiếu gửi tiền tiết kiệm từ tài khoản', href: 'deposit-saving' },
        { icon: ic_GuiTietKiemGreen, content: 'Lập phiếu gửi tiền tiết kiệm truyền thống', href: 'deposit-saving-traditional' },
        { icon: ic_RutTietKiemGreen, content: 'Lập phiếu rút tiền tiết kiệm', href: 'withdraw-saving' },
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

                        <div className="bg-[#26383C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen">
                            <div className="w-1/2 self-center">
                                {/* Title */}
                                <div className="w-full">
                                    <h1 className="mt-20 text-[40px]
                                            text-white font-bold  ">
                                        Dịch vụ
                                    </h1>
                                    <div className="2xl:mt-[23px] text-[20px]
                                            text-[#B0B5B6] flex flex-row">
                                        <span onClick={() => navigate('../home')}
                                            className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                        <p>&nbsp;&gt;&nbsp;</p>
                                        <p className="text-[#72BF00] hover:cursor-auto"> Dịch vụ </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-24">
                                {/* Title */}
                                <LongTooltip position="right" content="Lãi suất cao, thời gian gửi linh hoạt, bảo mật tuyệt đối, cơ hội tham gia nhiều chương trình khuyến mãi hấp dẫn, miễn phí quản lý tài khoản.">
                                    <div className=" inline-flex">
                                        <div className="bg-[#485356] -translate-x-4 -skew-x-[15deg] h-12 w-[310px] text-2xl py-2 pr-8 text-right  text-white mr-2">
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
                                            <img key={index} src={item.icon}
                                                alt=""
                                                className="h-[134px] min-w-[185px] self-center transition ease-in-out delay-150 hover:-translate-y-1 hover:drop-shadow-2xl-green duration-300"
                                                onClick={() => navigate(item.href)} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default EServiceGroup
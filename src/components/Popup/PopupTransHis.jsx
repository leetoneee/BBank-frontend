import { FaCircleExclamation } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { formatDateResult } from "../../utils/formatDateAndTime";
import formatToVND, { formatToMoney } from "../../utils/formatToVND";
import logo from '../../assets/icons/logo.svg'
import { classNames } from "../classNames/classNames";

const PopupTransHis = ({ pos, showPopup, setShowPopup, content }) => {
    const handleClosePopup = (key) => {
        console.log("🚀 ~ handleClosePopup ~ key:", key)
        setShowPopup(key); // Đóng popup bằng cách đặt lại showPopup thành false
    };

    return (
        <>
            <div className='bg-[#3C3A3A]/[50%] fixed top-0 left-0 h-screen w-screen flex  justify-center items-center z-[99999]'>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-[700px] self-center">
                        {content && content.MaLoaiGD === 3 &&
                            <div className=" container flex flex-col gap-[30px] mt-4 mb-8 ">

                                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-5 px-5 gap-4">
                                    <div className="flex justify-center items-center">
                                        <div className="flex items-center">
                                            <img src={logo} alt="" className="w-[52px] mr-2" />
                                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[40px] select-none font-museo-slab-500">BBANK</span>
                                        </div>
                                    </div>

                                    <FaCheckCircle color="#7AC014" className="w-[60px]  h-[60px] mx-auto" />
                                    <span className="text-white font-bold text-[20px] self-center ">GIAO DỊCH THÀNH CÔNG</span>
                                    <span className="text-[20px] text-[#7AC014] font-bold self-center">{formatToVND(content.TongTien)}</span>
                                    <span className="text-white text-[20px] self-center   ">
                                        {formatDateResult(content?.ThoiGian)}
                                    </span>
                                </div>

                                {/* Thông tin chuyển khoản */}
                                <div className=" w-full bg-[#26383C] rounded-[10px] py-5 px-5">
                                    <div className=" flex flex-col gap-4">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tên người chuyển tiền
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {(content?.TaiKhoanNguon?.NguoiDung?.HoTen).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản nguồn
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {(content?.TaiKhoanNguon?.SoTaiKhoan).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tên người thụ hưởng
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {(content?.TaiKhoanDich?.NguoiDung?.HoTen).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản đích
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {content?.TaiKhoanDich?.SoTaiKhoan}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Số dư
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {
                                                    content?.bienDong === '+'
                                                        ? formatToMoney(content?.SoDuDich)
                                                        : formatToMoney(content?.SoDuNguon)
                                                }
                                            </span>
                                        </div>


                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã giao dịch
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg  self-center text-right ">
                                                {content?.MaGiaoDich}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Nội dung
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                {content?.NoiDung}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {content && content.MaLoaiGD === 2 &&
                            <div className=" container flex flex-col gap-[30px] mt-4 mb-8 ">

                                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-5 px-5 gap-4">
                                    <div className="flex justify-center items-center">
                                        <div className="flex items-center">
                                            <img src={logo} alt="" className="w-[52px] mr-2" />
                                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[40px] select-none font-museo-slab-500">BBANK</span>
                                        </div>
                                    </div>

                                    <FaCheckCircle color="#7AC014" className="w-[60px]  h-[60px] mx-auto" />
                                    <span className="text-white font-bold text-[20px] self-center ">GIAO DỊCH THÀNH CÔNG</span>
                                    <span className="text-[20px] text-[#7AC014] font-bold self-center">{formatToVND(content.SoTien)}</span>
                                    <span className="text-white text-[20px] self-center   ">
                                        {formatDateResult(content.ThoiGian)}
                                    </span>
                                </div>

                                {/* Thông tin chuyển khoản */}
                                <div className=" w-full bg-[#26383C] rounded-[10px] py-5 px-5">
                                    <div className=" flex flex-col gap-4">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tên người thụ hưởng
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {(content?.TaiKhoanDich?.NguoiDung?.HoTen).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản thụ hưởng
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {content?.TaiKhoanDich?.SoTaiKhoan}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Số dư
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {
                                                    formatToMoney(content?.SoDuDich)
                                                }
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã giao dịch
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg  self-center text-right ">
                                                {content?.MaGiaoDich}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Nội dung
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                {content?.NoiDung}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã nhân viên
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                {content?.MaNhanVien}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {content && content.MaLoaiGD === 1 &&
                            <div className=" container flex flex-col gap-[30px] mt-4 mb-8 ">

                                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-5 px-5 gap-4">
                                    <div className="flex justify-center items-center">
                                        <div className="flex items-center">
                                            <img src={logo} alt="" className="w-[52px] mr-2" />
                                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[40px] select-none font-museo-slab-500">BBANK</span>
                                        </div>
                                    </div>

                                    <FaCheckCircle color="#7AC014" className="w-[60px]  h-[60px] mx-auto" />
                                    <span className="text-white font-bold text-[20px] self-center ">GIAO DỊCH THÀNH CÔNG</span>
                                    <span className="text-[20px] text-[#7AC014] font-bold self-center">{formatToVND(content.SoTien)}</span>
                                    <span className="text-white text-[20px] self-center   ">
                                        {formatDateResult(content.ThoiGian)}
                                    </span>
                                </div>

                                {/* Thông tin chuyển khoản */}
                                <div className=" w-full bg-[#26383C] rounded-[10px] py-5 px-5">
                                    <div className=" flex flex-col gap-4">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản rút tiền
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {content?.TaiKhoanNguon?.SoTaiKhoan}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Số dư
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {
                                                    formatToMoney(content?.SoDuNguon)
                                                }
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã giao dịch
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg  self-center text-right ">
                                                {content?.MaGiaoDich}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Nội dung
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                {content?.NoiDung}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã nhân viên
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                {content?.MaNhanVien}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {content && content.MaLoaiGD === 4 &&
                            <div className=" container flex flex-col gap-[30px] mt-4 mb-8 ">

                                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-5 px-5 gap-4">
                                    <div className="flex justify-center items-center">
                                        <div className="flex items-center">
                                            <img src={logo} alt="" className="w-[52px] mr-2" />
                                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[40px] select-none font-museo-slab-500">BBANK</span>
                                        </div>
                                    </div>

                                    <FaCheckCircle color="#7AC014" className="w-[60px]  h-[60px] mx-auto" />
                                    <span className="text-white font-bold text-[20px] self-center ">MỞ PHIẾU TIẾT KIỆM THÀNH CÔNG</span>
                                    <span className="text-[20px] text-[#7AC014] font-bold self-center">{formatToVND(content.SoTien)}</span>
                                    <span className="text-white text-[20px] self-center   ">
                                        {formatDateResult(content.ThoiGian)}
                                    </span>
                                </div>

                                {/* Thông tin chuyển khoản */}
                                <div className=" w-full bg-[#26383C] rounded-[10px] py-5 px-5">
                                    <div className=" flex flex-col gap-4">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản tiết kiệm
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {content?.TaiKhoanNguon?.SoTaiKhoan}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Số dư
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {
                                                    formatToMoney(content?.SoDuNguon)
                                                }
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã giao dịch
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg  self-center text-right ">
                                                {content?.MaGiaoDich}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Nội dung
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                MỞ PHIẾU TIẾT KIỆM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {content && content.MaLoaiGD === 5 &&
                            <div className=" container flex flex-col gap-[30px] mt-4 mb-8 ">

                                <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-5 px-5 gap-4">
                                    <div className="flex justify-center items-center">
                                        <div className="flex items-center">
                                            <img src={logo} alt="" className="w-[52px] mr-2" />
                                            <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[40px] select-none font-museo-slab-500">BBANK</span>
                                        </div>
                                    </div>

                                    <FaCheckCircle color="#7AC014" className="w-[60px]  h-[60px] mx-auto" />
                                    <span className="text-white font-bold text-[20px] self-center ">TẤT TOÁN PHIẾU TIẾT KIỆM THÀNH CÔNG</span>
                                    <span className="text-[20px] text-[#7AC014] font-bold self-center">{formatToVND(content.SoTien)}</span>
                                    <span className="text-white text-[20px] self-center   ">
                                        {formatDateResult(content.ThoiGian)}
                                    </span>
                                </div>

                                {/* Thông tin chuyển khoản */}
                                <div className=" w-full bg-[#26383C] rounded-[10px] py-5 px-5">
                                    <div className=" flex flex-col gap-4">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Tài khoản tiết kiệm
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {content?.TaiKhoanDich?.SoTaiKhoan}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Số dư
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg self-center text-right ">
                                                {
                                                    formatToMoney(content?.SoDuDich)
                                                }
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Mã giao dịch
                                            </span>
                                            <span className="col-start-2 col-span-2 text-white text-lg  self-center text-right ">
                                                {content?.MaGiaoDich}
                                            </span>
                                        </div>

                                        <div className="border-b-2 border-b-white h-[1px] w-full self-center"></div>

                                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                            <span className="col-start-1 text-[#A5ACAE] text-lg  self-center ">
                                                Nội dung
                                            </span>
                                            <span className={classNames("col-start-2 col-span-2 text-white text-lg text-ellipsis overflow-hidden self-center", (content?.NoiDung).length <= 30 ? 'text-right' : 'text-justify')} >
                                                TẤT TOÁN PHIẾU TIẾT KIỆM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <button onClick={() => handleClosePopup(pos)} className=" text-white text-lg font-bold bg-[#475255] rounded-[10px] px-4 py-2 self-center hover:opacity-70">
                        Đóng phiếu
                    </button>
                </div>
            </div>
        </>
    )
};

export default PopupTransHis;
import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { reset as resetTransHis } from "../../../redux/customer/getTransactionHistory/getTransactionHistorySlice";
import { reset as resetTransfer } from "../../../redux/customer/transfer/transferSlice";
import { formatDateSaving, formatDateResult, formatDateChart, formatDateGetTime } from "../../../utils/formatDateAndTime";
import { GoArrowRight } from "react-icons/go";
import TransHisChart from "../../charts/TransHisChart";

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TaiKhoanDich = useSelector((state) => state.checkAccount.TaiKhoan);
    const GiaoDich = useSelector((state) => state.transfer.GiaoDich);

    const handleNavigateHome = () => {
        dispatch(resetTransfer());
        dispatch(resetTransHis());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetTransfer());
        dispatch(resetTransHis());
        props.handleInitNewTransaction();
    }

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    }
    const NgayDangKy = useSelector((state) => state.createProfile.NgayDangKy)
    const HoTen = useSelector((state) => state.createProfile.HoTen)
    const Birthday = useSelector((state) => state.createProfile.Birthday)
    const GioiTinh = useSelector((state) => state.createProfile.GioiTinh);
    const SoDT = useSelector((state) => state.createProfile.SoDT);
    const CCCD = useSelector((state) => state.createProfile.CCCD);
    const DiaChi = useSelector((state) => state.createProfile.DiaChi);
    const NgheNghiep = useSelector((state) => state.createProfile.NgheNghiep);
    const Email = useSelector((state) => state.createProfile.Email);
    //*
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const ThoiGian = useSelector((state) => state.getTransHis.ThoiGian);
    const StartDate = useSelector((state) => state.getTransHis.StartDate);
    const EndDate = useSelector((state) => state.getTransHis.EndDate);
    const transactions = useSelector((state) => state.getTransHis.transactions);

    // console.log("🚀 ~ Result ~ transactions:", transactions)

    const formattedData = transactions.map((item) => ({
        date: formatDateChart(item.ThoiGian),
        time: formatDateGetTime(item.ThoiGian),
        bienDong: item.SoTKNhan === TaiKhoanNguon.SoTaiKhoan ? '+' : '-',
        transactionAmount: item.TongTien,
        moneyAfterTransaction: item.SoDu,
    }));

    const sortedData = formattedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });
    console.log("🚀 ~ sortedData ~ sortedData:", sortedData)

    //*

    return (
        <div className=" container flex flex-col gap-[50px] mt-4 mb-8 ">

            {ThoiGian && ThoiGian.id !== 2 &&
                <div className="bg-[#E5E7E8] self-center rounded-[5px] py-2 px-10">
                    <span className="text-[#71BD00] text-xl">{ThoiGian.name}</span>
                </div>
            }
            {
                ThoiGian && ThoiGian.id === 2 && StartDate && EndDate &&
                <div className="flex flex-row gap-8 self-center">
                    <div className="bg-[#E5E7E8] self-center rounded-[5px] py-2 px-10">
                        <span className="text-[#71BD00] text-xl">{formatDateSaving(StartDate)}</span>
                    </div>
                    <GoArrowRight className="text-white font-bold self-center text-5xl " />
                    <div className="bg-[#E5E7E8] self-center rounded-[5px] py-2 px-10">
                        <span className="text-[#71BD00] text-xl">{formatDateSaving(EndDate)}</span>
                    </div>
                </div>
            }

            <div className="w-full h-[550px] ">
                <TransHisChart data={sortedData} />
            </div>


            <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-10 px-10 gap-4 shadow-green-400 shadow-sm">
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="" className="w-[72px] mr-2" />
                        <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none font-museo-slab-500">BBANK</span>
                    </div>
                </div>

                <FaCheckCircle color="#7AC014" className="w-[90px]  h-[90px] mx-auto" />
                <span className="text-white font-bold text-[25px] self-center ">LẬP HỒ SƠ KHÁCH HÀNG THÀNH CÔNG</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(NgayDangKy)}
                </span>
            </div>

            {/* Thông tin khách hàng */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Ngày đăng ký */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đăng ký
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(NgayDangKy)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Họ tên */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Họ và tên
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{HoTen.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Ngày sinh */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày sinh
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(Birthday)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Giới tính */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giới tính
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                GioiTinh ? "Nam" : "Nữ"
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số điện thoại */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số điện thoại
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {SoDT}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            Căng cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Địa chỉ */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Nghề nghiệp */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nghề nghiệp
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NgheNghiep}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Email */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Email
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {Email}
                        </span>
                    </div>
                </div>
            </div>

            <div className=" container flex justify-around " >
                {/* back control */}
                <button onClick={() => handleNavigateHome()}
                    className={classNames(" text-2xl bg-[#475255]/[90%] text-white py-2 w-52   rounded-[10px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out ")}>
                    Quay về
                </button>

                {/* new transaction */}
                <button onClick={() => handleInitNewTransaction()}
                    className="text-2xl self-center  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 w-96   rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                    Chọn mốc mới
                </button>
            </div>
        </div >
    )
}

export default Result;
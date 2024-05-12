import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateSaving, formatDateResult } from "../../../utils/formatDateAndTime";
import { reset as resetCccd } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { reset as eResetDepositSaving } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import { reset as cResetDepositSaving } from "../../../redux/customer/depositSaving/customerDepositSavingSlice";
import roundInterest from "../../../utils/roundInterest";

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //*
    const TaiKhoanNguon = useSelector((state) => state.eDepositSaving.TaiKhoanNguon);
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    //*

    const PhieuTietKiem = useSelector((state) => state.eDepositSaving.PhieuTietKiem);
    const ten = useSelector((state) => state.user.ten);
    const userId = useSelector((state) => state.user.userId);

    const handleNavigateHome = () => {
        dispatch(resetCccd());
        dispatch(eResetDepositSaving());
        dispatch(cResetDepositSaving());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetCccd());
        dispatch(eResetDepositSaving());
        dispatch(cResetDepositSaving());
        props.handleInitNewTransaction();
    }

    return (
        <div className=" container flex flex-col gap-[50px] mt-4 mb-8 ">
            <div className="w-full flex flex-col bg-[#26383C] rounded-[10px] py-10 px-10 gap-4 shadow-green-400 shadow-sm">
                <div className="flex justify-center items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="" className="w-[72px] mr-2" />
                        <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none font-museo-slab-500">BBANK</span>
                    </div>
                </div>

                <FaCheckCircle color="#7AC014" className="w-[90px]  h-[90px] mx-auto" />
                <span className="text-white font-bold text-[25px] self-center ">MỞ PHIẾU TIẾT KIỆM THÀNH CÔNG</span>
                <span className="text-[25px] text-[#7AC014] font-bold self-center">{formatToVND(PhieuTietKiem.SoTienGui)}</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(PhieuTietKiem.NgayMo)}
                </span>
            </div>

            {/* Tài khoản mở */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600  text-xl font-bold  self-center text-right ">
                            {(NguoiDung.HoTen).toUpperCase()}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ người mở
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {NguoiDung.DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            Căng cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {NguoiDung.CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày cấp
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatDateSaving(PhieuTietKiem.NgayMo)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {KyHan.GhiChu} – {roundInterest(KyHan.LaiSuat * 100)}%/năm
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tài khoản nguồn
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {TaiKhoanNguon.SoTaiKhoan}
                        </span>
                    </div>
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Mã phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {PhieuTietKiem.MaPhieu}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Mã nhân viên
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {userId}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tên nhân viên
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {ten}
                        </span>
                    </div>
                </div>
            </div>

            <div className=" container flex justify-between " >
                {/* back control */}
                <button onClick={() => handleNavigateHome()}
                    className={classNames(" text-2xl bg-[#475255]/[90%] text-white py-2 w-64  rounded-[10px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out ")}>
                    Quay về
                </button>
                {/* Print */}
                <button
                    className={classNames(" text-2xl bg-[#475255]/[90%] text-white py-2 w-64 rounded-[10px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out ")}>
                    In biên lai
                </button>
            </div>

            {/* new transaction */}
            <button onClick={() => handleInitNewTransaction()}
                className=" mt-3 text-2xl self-center  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 w-96   rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                Thực hiện mở phiếu mới
            </button>
        </div >
    )
}

export default Result;
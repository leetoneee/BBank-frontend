import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateSaving, formatDateResult } from "../../../utils/formatDateAndTime";
import { reset as resetCccd } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { reset as ressetWithdrawAccount } from "../../../redux/employee/withdrawAccount/employeeWithdrawAccountSlice";
import readMoney from "../../../utils/n2vi";

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //*
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const GiaoDich = useSelector((state) => state.eWithdrawAccount.transaction)
    //*

    const ten = useSelector((state) => state.user.ten);
    const userId = useSelector((state) => state.user.userId);
    const listFee = useSelector((state) => state.getTransType.listFee)

    const handleNavigateHome = () => {
        dispatch(resetCccd());
        dispatch(ressetWithdrawAccount());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetCccd());
        dispatch(ressetWithdrawAccount());
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
                <span className="text-white font-bold text-[25px] self-center ">GIAO DỊCH THÀNH CÔNG</span>
                <span className="text-[25px] text-[#7AC014] font-bold self-center">{formatToVND(GiaoDich.SoTien)}</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(GiaoDich.ThoiGian)}
                </span>
            </div>

            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tài khoản nguồn
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {GiaoDich?.SoTKRut}
                        </span>
                    </div>
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số dư
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl font-museo-slab-100 self-center text-right ">
                            {formatToVND(GiaoDich?.SoDuNguon)}
                        </span>
                    </div>
                </div>
            </div>

            {NguoiDung &&
                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                                Tên chủ sở hữu tài khoản
                            </span>
                            <span className="col-start-2 col-span-2 text-red-600 text-xl font-bold  self-center text-right ">
                                {(NguoiDung?.HoTen).toUpperCase()}
                            </span>
                        </div>
                        <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                                Giấy tờ tuỳ thân
                            </span>
                            <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                                Căn cước công dân
                            </span>
                        </div>
                        <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                                Số căn cước công dân
                            </span>
                            <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                                {NguoiDung?.CCCD}
                            </span>
                        </div>
                    </div>
                </div>
            }

            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Số tiền rút
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(GiaoDich?.SoTien)}</span>
                            <span className="text-[15px]">{readMoney((GiaoDich?.SoTien).toString())}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền phí
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatToVND(listFee[0]?.Phi)}
                        </span>
                    </div>

                    {/* <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            Người chuyển trả
                        </span>
                    </div> */}

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nội dung
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {GiaoDich?.NoiDung}
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
                Thực hiện giao dịch mới
            </button>
        </div >
    )
}

export default Result;
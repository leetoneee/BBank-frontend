import React, { useRef, useState } from "react";
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
import readMoney from "../../../utils/n2vi";
import { useReactToPrint } from 'react-to-print';

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //*
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    //*

    const PhieuTietKiem = useSelector((state) => state.eDepositSaving.PhieuTietKiem);
    const TamTinh = useSelector((state) => state.eDepositSaving.TamTinh);
    const ten = useSelector((state) => state.user.ten);
    const userId = useSelector((state) => state.user.userId);
    const isAuto = useSelector((state) => state.eDepositSaving.isAuto);

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

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Biên lai gửi tiết kiệm " +  PhieuTietKiem.MaPhieu,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const handleClick = () => {
        const printerElement = document.getElementsByClassName("printer")[0];
        if (printerElement) {
            printerElement.style.display = "flex";
        
            return new Promise((resolve) => {
            handlePrint(null, () => contentToPrint.current);
            printerElement.style.display = "none";
            resolve(); // Đánh dấu là đã hoàn thành
            
            });
        }
        };
    
         const tableData = [
             { column1: 'Ngày, giờ gửi tiết kiệm', column2: formatDateResult(PhieuTietKiem.NgayMo)},
              { column1: 'Mã phiếu tiết kiệm', column2: PhieuTietKiem.MaPhieu },
             { column1: 'Phương thức trả lãi', column2: PhieuTietKiem.PhuongThuc },
             { column1: 'Tiết kiệm tự động', column2: isAuto === '1' ? "Có" : "Không" },
             { column1: 'Kỳ hạn gửi', column2: KyHan.GhiChu },
             { column1: 'Lãi suất', column2: Math.round(PhieuTietKiem.LaiSuat * 1000) / 1000 },
             { column1: 'Ngày mở phiếu tiết kiệm', column2:  formatDateSaving(PhieuTietKiem.NgayMo)},
             { column1: 'Ngày đến hạn', column2:  formatDateSaving(TamTinh.NgayTamRut)},
             { column1: 'Số tiền gửi', column2:  formatToVND(PhieuTietKiem.SoTienGui)},
             { column1: 'Số tiền tất toán khi đến hạn', column2:  formatToVND(TamTinh.TienTamTinh)},
           ];
    
           const infotable = [
             { column1: 'Họ tên khách hàng', column2: (NguoiDung.HoTen).toUpperCase()},
             { column1: 'Địa chỉ', column2: NguoiDung.DiaChi },
             { column1: 'Giấy tờ tuỳ thân', column2: 'Căn cước công dân' },
             { column1: 'Số giấy tờ tuỳ thân', column2: NguoiDung.CCCD },
          ];

    return (
        <div className=" container flex flex-col gap-[50px] mt-4 mb-8 ">

            {/* Print receipt */}
            <div ref={contentToPrint} className="printer w-full hidden flex-col bg-white rounded-[10px] py-10 px-10 shadow-white shadow-sm">
                <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[20px] select-none font-museo-slab-500 text-center">Ngân hàng TMCP Ngoại Thương UIT-Together</span>
                <div className="flex justify-center items-center">
                    <div className="flex items-center gap-4">
                        <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[60px] select-none font-museo-slab-500">BBANK</span>
                        <img src={logo} alt="" className="w-[72px] mr-2" />
                    </div>
                </div>
                <span className="text-[15px] self-center ml-[200px] select-none">www.buoibank.com</span>
                <span className="text-[15px] self-center ml-[200px] bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] text-transparent bg-clip-text font-medium">Hotline: 1900 00 00 00</span>
                <span className="font-bold text-[20px] self-center mt-4 mb-5">BIÊN LAI GỬI TIẾT KIỆM</span>
                <div className="w-full overflow-x-auto ">
                    <table className="w-full border-collapse ">
                        <tbody>
                            {tableData.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                            {/* Cột 1 */}
                            <td className="font-bold border border-solid border-black p-2">{item.column1}</td>
                            <td className="border border-solid border-black p-2" colSpan={3}>{item.column2}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <span className="font-bold text-[20px] self-center mt-4 mb-5">THÔNG TIN KHÁCH HÀNG</span>
                <div className="w-full overflow-x-auto ">
                    <table className="w-full border-collapse ">
                        <tbody>
                            {infotable.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                            {/* Cột 1 */}
                            <td className="font-bold border border-solid border-black p-2">{item.column1}</td>
                            <td className="border border-solid border-black p-2" colSpan={3}>{item.column2}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <span className="font-bold text-center mt-3">Cảm ơn Quý khách đã sử dụng dịch vụ của BBank!</span>
            </div>

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

            {/* Thông tin người mở */}
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
                            Căn cước công dân
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
                </div>
            </div>

            {/* Thông tin tiết kiệm */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Mã phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {PhieuTietKiem.MaPhieu}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            Lãi nhập gốc
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tiết kiệm tự động
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {isAuto === '1' ? "Có" : "Không"}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {KyHan.GhiChu}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Lãi suất
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {roundInterest(KyHan.LaiSuat * 100)}%/năm
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày mở phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatDateSaving(PhieuTietKiem.NgayMo)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đến hạn
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatDateSaving(TamTinh.NgayTamRut)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền gửi gốc
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(PhieuTietKiem.SoTienGui)}</span>
                            <span className="text-[15px]">{readMoney((PhieuTietKiem.SoTienGui).toString())}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền tất toán khi đến hạn
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatToVND(TamTinh.TienTamTinh)}
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
                <button onClick={handleClick}
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
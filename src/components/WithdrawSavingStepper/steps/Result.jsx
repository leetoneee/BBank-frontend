import React, { useRef, useState } from "react";
import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateResult } from "../../../utils/formatDateAndTime";
import { reset as resetWithdrawsaving } from "../../../redux/customer/withdrawsavingSlice/withdrawsavingSlice";
import { reset as resetListsaving } from "../../../redux/customer/listSaving/listSavingSlice";
import { reset as resetCheckAccount } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import { KyHan, NgayDenHan } from './Authenticity';
import { useReactToPrint } from 'react-to-print';

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const GiaoDich = useSelector((state) => state.customerWithdrawSaving.GiaoDich);

    const handleNavigateHome = () => {
        dispatch(resetCheckAccount());
        dispatch(resetWithdrawsaving());
        dispatch(resetListsaving());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetCheckAccount());
        dispatch(resetWithdrawsaving());
        dispatch(resetListsaving());
        props.handleInitNewTransaction();
    }

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Biên lai tất toán phiếu tiết kiệm " + GiaoDich.MaPhieu,
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
         { column1: 'Ngày, giờ tất toán', column2: formatDateResult(GiaoDich.NgayRut)},
         { column1: 'Mã phiếu tất toán', column2: GiaoDich.MaPhieu },
         { column1: 'Tài khoản nguồn', column2: TaiKhoanNguon.SoTaiKhoan },
        { column1: 'Kỳ hạn gửi', column2: KyHan },
        { column1: 'Lãi suất', column2: Math.round(GiaoDich.LaiSuat * 1000) / 1000 },
         { column1: 'Ngày mở phiếu tiết kiệm', column2: formatDateResult(GiaoDich.NgayMo) },
         { column1: 'Ngày đến hạn', column2: formatDateResult(NgayDenHan) },
         { column1: 'Số tiền gửi gốc', column2: formatToVND(GiaoDich.SoTienGui) },
        { column1: 'Số tiền thực lãnh', column2: formatToVND(GiaoDich.SoTienRut) },
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
                <span className="font-bold text-[20px] self-center mt-4 mb-5">BIÊN LAI TẤT TOÁN PHIẾU TIẾT KIỆM</span>
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
                <span className="text-white font-bold text-[25px] self-center ">TẤT TOÁN PHIẾU TIẾT KIỆM THÀNH CÔNG</span>
                <span className="text-[25px] text-[#7AC014] font-bold self-center">{formatToVND(GiaoDich.SoTienRut)}</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(GiaoDich.NgayRut)}
                </span>
            </div>

            {/* Tài khoản nguồn */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                        Tài khoản nguồn
                    </span>
                    <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                        {TaiKhoanNguon.SoTaiKhoan}
                    </span>
                </div>
            </div>

            {/* Thông tin tất toán */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">

                    {/* Mã phiếu tiết kiệm */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Mã phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {GiaoDich.MaPhieu}
                        </span>
                    </div>

                    {/* Phương thức trả lãi */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {GiaoDich.PhuongThuc}
                        </span>
                    </div>

                    {/* Kỳ hạn gửi */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {KyHan}
                        </span>
                    </div>

                    {/* Lãi suất */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Lãi suất
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {Math.round(GiaoDich.LaiSuat * 1000) / 1000}
                        </span>
                    </div>

                    {/* Ngày mở phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày mở phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(GiaoDich.NgayMo)}
                        </span>
                    </div>

                    {/* Ngày đến hạn */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đến hạn
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(NgayDenHan)}
                        </span>
                    </div>
                    
                    {/* Ngày tất toán phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày tất toán phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(GiaoDich.NgayRut)}
                        </span>
                    </div>

                    {/* Số tiền gửi gốc */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền gửi gốc
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatToVND(GiaoDich.SoTienGui)}
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
                Thực hiện giao dịch mới
            </button>
        </div >
    )
}

export default Result;
import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logoBBank.png'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateResult } from "../../../utils/formatDateAndTime";
import { reset as resetCheckCccd } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { reset as resetCheckAccount } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import { reset as resetDepositAccount } from "../../../redux/employee/depositAccount/employeeDepositAccountSlice";
import React, { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import readMoney from "../../../utils/n2vi";

export function Result(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TaiKhoanDich = useSelector((state) => state.checkAccount.TaiKhoan);
    const GiaoDich = useSelector((state) => state.eDepositAccount.GiaoDich);
    const HinhThuc = useSelector((state) => state.eDepositAccount.HinhThuc);
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)

    const handleNavigateHome = () => {
        dispatch(resetCheckAccount());
        dispatch(resetCheckCccd());
        dispatch(resetDepositAccount());
        navigate('../home', { replace: true })
    }

    const handleInitNewTransaction = () => {
        dispatch(resetCheckAccount());
        dispatch(resetCheckCccd());
        dispatch(resetDepositAccount());
        props.handleInitNewTransaction();
    }

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Biên lai nộp tiền mặt " + GiaoDich.MaGiaoDich,
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
        { column1: 'Ngày, giờ giao dịch', column2: formatDateResult(GiaoDich.ThoiGian) },
        { column1: 'Số lệnh giao dịch', column2: GiaoDich.MaGiaoDich },
        { column1: 'Tài khoản đích', column2: GiaoDich.SoTKNhan },
        { column1: 'Tên người thụ hưởng', column2: (TaiKhoanDich.HoTen).toUpperCase() },
        { column1: 'Tên ngân hàng hưởng', column2: 'BBank' },
        { column1: 'Họ tên người nộp', column2: (NguoiDung.HoTen).toUpperCase()},
        { column1: 'Giấy tờ tùy thân', column2: 'Căn cước công dân'},
        { column1: 'Số giấy tờ tùy thân', column2: NguoiDung.CCCD},
        { column1: 'Loại phí', column2: HinhThuc },
        { column1: 'Số tiền nộp', column2: formatToVND(GiaoDich.SoTien) },
        { column1: 'Số tiền phí', column2: formatToVND(GiaoDich.LoaiGD.Phi) },
        { column1: 'Số tiền lãnh thực', column2: formatToVND(GiaoDich.TongTien) },
        { column1: 'Nội dung chuyển tiền', column2: GiaoDich.NoiDung },
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
                <span className="font-bold text-[20px] self-center mt-4 mb-5">BIÊN LAI NỘP TIỀN MẶT</span>
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
                <span className="text-white font-bold text-[25px] self-center ">GIAO DỊCH THÀNH CÔNG</span>
                <span className="text-[25px] text-[#7AC014] font-bold self-center">{formatToVND(GiaoDich.TongTien)}</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(GiaoDich.ThoiGian)}
                </span>
            </div>

            {/* Tài khoản đich */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tài khoản đích
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {TaiKhoanDich.SoTaiKhoan}
                        </span>
                    </div>
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tên người thụ hưởng
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600  text-xl font-bold  self-center text-right ">
                            {(TaiKhoanDich.HoTen).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin người gửi */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Họ và tên người nộp
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {(NguoiDung.HoTen).toUpperCase()}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số
                        </span>
                        <span className={classNames("col-start-2 col-span-2 text-white text-xl text-ellipsis overflow-hidden self-center text-right")}>
                            {NguoiDung.CCCD}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Số tiền
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(GiaoDich.SoTien)}</span>
                            <span className="text-[15px]">{readMoney((GiaoDich.SoTien).toString())}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền phí
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatToVND(GiaoDich?.LoaiGD?.Phi)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phí giao dịch
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {HinhThuc}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nội dung
                        </span>
                        <span className={classNames("col-start-2 col-span-2 text-white text-xl text-ellipsis overflow-hidden self-center", (GiaoDich.NoiDung).length <= 33 ? 'text-right' : 'text-justify')}>
                            {GiaoDich.NoiDung}
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
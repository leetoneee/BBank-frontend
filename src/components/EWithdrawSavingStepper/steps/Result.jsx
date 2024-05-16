import React, { useRef, useState } from "react";
import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { formatDateResult } from "../../../utils/formatDateAndTime";
import { reset as resetWithdrawsaving } from "../../../redux/employee/EwithdrawsavingSlice/EwithdrawsavingSlice";
import { reset as resetListsaving } from "../../../redux/employee/listSaving/listSavingSlice";
import { reset as resetCheckAccount } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import { useReactToPrint } from 'react-to-print';
import { formatDateSaving } from "../../../utils/formatDateAndTime";


function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const GiaoDich = useSelector((state) => state.eWithdrawSaving.GiaoDich);
    const KyHan = useSelector((state) => state.kyhan.KyHan);
    const NgayDenHan = useSelector((state) => state.kyhan.NgayDenHan);
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung);

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

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    };
    
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
         GiaoDich.SoTK ? { column1: 'Tài khoản nguồn', column2:  GiaoDich.SoTK} : '',
         { column1: 'Phương thức trả lãi', column2: GiaoDich.PhuongThuc },
        { column1: 'Kỳ hạn gửi', column2: KyHan },
        { column1: 'Lãi suất', column2: Math.round(GiaoDich.LaiSuat * 1000) / 1000 },
         { column1: 'Ngày mở phiếu tiết kiệm', column2: formatDateResult(GiaoDich.NgayMo) },
         { column1: 'Ngày đến hạn', column2: formatDateResult(NgayDenHan) },
         { column1: 'Số tiền gửi gốc', column2: formatToVND(GiaoDich.SoTienGui) },
        { column1: 'Số tiền thực lãnh', column2: formatToVND(GiaoDich.SoTienRut) },
      ];

      const infotable = [
        { column1: 'Họ tên khách hàng', column2: (NguoiDung.HoTen).toUpperCase()},
        { column1: 'Ngày sinh', column2: formatDate(NguoiDung.NgaySinh) },
        { column1: 'Giới tính', column2: NguoiDung.GioiTinh === 1 ? 'Nam' : 'Nữ' },
       { column1: 'Số điện thoại', column2: NguoiDung.SDT },
       { column1: 'Giấy tờ tuỳ thân', column2: 'Căn cước công dân' },
        { column1: 'Số giấy tờ tuỳ thân', column2: NguoiDung.CCCD },
        { column1: 'Địa chỉ', column2: NguoiDung.DiaChi },
        { column1: 'Nghề nghiệp', column2: NguoiDung.NgheNghiep },
       { column1: 'Email', column2: NguoiDung.Email },
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
                <span className="text-white font-bold text-[25px] self-center ">TẤT TOÁN PHIẾU TIẾT KIỆM THÀNH CÔNG</span>
                <span className="text-[25px] text-[#7AC014] font-bold self-center">{formatToVND(GiaoDich.SoTienRut)}</span>
                <span className="text-white text-[25px] self-center   ">
                    {formatDateResult(GiaoDich.NgayRut)}
                </span>
            </div>

           {/* Thông tin khách hàng */}
           <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Họ tên */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{(NguoiDung.HoTen).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Ngày sinh*/}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày sinh
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatDate(NguoiDung.NgaySinh)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Giới tính */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giới tính
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.GioiTinh === 1 ? 'Nam' : 'Nữ'}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số điện thoại */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số điện thoại
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.SDT}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Địa chỉ */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Nghề nghiệp */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nghề nghiệp
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.NgheNghiep}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Email */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Email
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.Email}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin tất toán */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">

                {GiaoDich.SoTK ?
                    (<div className="grid grid-cols-3 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tài khoản nguồn
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {GiaoDich.SoTK}
                        </span>
                    </div>)
                    :''}

                    {/* Mã phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
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
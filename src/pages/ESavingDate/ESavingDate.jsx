import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import uitPattern from '../../assets/icons/uitPattern.svg'
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from '../../services/axios';
import formatToVND from "../../utils/formatToVND";
import { useReactToPrint } from 'react-to-print';
import logo from '../../assets/icons/logoBBank.png';

const ESavingDate = () => {
    const navigate = useNavigate();

    const [isShowEmptyDate, setIsShowEmptyDate] = useState(false);
    const [date, setDate] = useState("");
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [records, setRecords] = useState([]);

    const handleDateChange = (e) => {
        const day = new Date(e.target.value);
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const date = String(day.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${date}`;
        setDate(formattedDate);
    };

    const handleClick = () => {
        if (!date) {
            setIsShowEmptyDate(true);
            return;
        }
        setIsShowEmptyDate(false);
        axios.post('/saving-accounts/report', {
            "Ngay": date,
            "isCreateReport": true
        })
            .then(res => {
                setRecords(res.data.ThongKe);
                setIsTableVisible(true);
            })
            .catch(error => {
                console.error("There was an error fetching the report!", error);
            });
    };

    const sortedRecords = [...records].sort((a, b) => a.MaLoaiTietKiem - b.MaLoaiTietKiem);
    const totalTongThu = sortedRecords.reduce((sum, record) => sum + record.TongThu, 0);
    const totalTongChi = sortedRecords.reduce((sum, record) => sum + record.TongChi, 0);
    const totalChenhLech = sortedRecords.reduce((sum, record) => sum + record.ChenhLech, 0);

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Báo cáo phiếu tiết kiệm ngày " + date,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const printButton = () => {
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

    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-20">
                    <Header />
                </div>

                {/* article */}
                <div className="w-auto overflow-auto flex flex-col">
                    <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center mt-14" />

                    <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen overflow-auto no-scrollbar">
                        <div className="w-[60%] self-center">
                            {/* Title */}
                            <div className="w-full">
                                <h1 className="mt-20 text-[40px]
                                            text-white font-bold  ">
                                    Thống kê gửi tiết kiệm theo ngày
                                </h1>
                                <div className="2xl:mt-[23px] text-[20px]
                                            text-[#B0B5B6] flex flex-row">
                                    <span onClick={() => navigate('../home')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <span onClick={() => navigate('../home/statistic-group')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"> Báo cáo </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <p className="text-[#72BF00] hover:cursor-auto"> Thống kê gửi tiết kiệm theo ngày </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-7 py-6">
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
                                    <span className="font-bold text-[20px] self-center mt-4 mb-5">BÁO CÁO PHIẾU TIẾT KIỆM NGÀY {date}</span>
                                    <div className=" flex flex-col">
                                        <table className="w-full text-left table ">
                                            <thead className="text-[23px]  uppercase sticky top-[170px] z-10 ">
                                                <tr>
                                                    <th className="p-4">Mã loại tiết kiệm</th>
                                                    <th className="p-4">Tổng thu</th>
                                                    <th className="p-4">Tổng chi</th>
                                                    <th className="p-4">Chênh lệch</th>
                                                </tr>
                                            </thead>
                                            <tbody className=" text-[24px]">
                                                {
                                                    sortedRecords.map((d, i) => (
                                                        <tr key={i} className=" border-b">
                                                            <td className="p-3 text-center">{d.MaLoaiTietKiem}</td>
                                                            <td className="p-4">{formatToVND(d.TongThu)}</td>
                                                            <td className="p-4">{formatToVND(d.TongChi)}</td>
                                                            <td className="p-4">{formatToVND(d.ChenhLech)}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr className="hover:bg-gray-400 border-b font-bold">
                                                    <td className="p-3 text-center ">Tổng</td>
                                                    <td className="p-4 ">{formatToVND(totalTongThu)}</td>
                                                    <td className="p-4 ">{formatToVND(totalTongChi)}</td>
                                                    <td className="p-4 ">{formatToVND(totalChenhLech)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <span className="font-bold text-center mt-3">Cảm ơn Quý khách đã sử dụng dịch vụ của BBank!</span>
                                </div>

                                {/* Ngày thống kê */}
                                <div className="w-full bg-[#26383C]  rounded-[10px] py-10 px-10">
                                    <div className="grid grid-cols-3 gap-8">
                                        <span className="col-start-1 row-start-1 text-[#A5ACAE] text-[23px]  self-center ">Ngày thống kê</span>
                                        <div className="col-start-2 col-span-2">
                                            {isShowEmptyDate && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập ngày thống kê</span>}
                                            <input type="date"
                                                className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                                onFocus={() => setIsTableVisible(false)}
                                                onChange={handleDateChange}
                                                placeholder="Nhập ngày thống kê"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* button Tiếp tục */}
                                <div className=" self-center">
                                    <button onClick={handleClick}
                                        className=" text-2xl  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 px-14  rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                                        Tiếp tục
                                    </button>
                                </div>
                            </div>

                            {/* table */}
                            {isTableVisible && (
                                <div className=" flex flex-col">
                                    <table className="w-full text-left table bg-[#26383C]">
                                        <thead className="text-[23px] text-gray-700 uppercase bg-gray-200 sticky top-[170px] z-10 ">
                                            <tr>
                                                <th className="p-4">Mã loại tiết kiệm</th>
                                                <th className="p-4">Tổng thu</th>
                                                <th className="p-4">Tổng chi</th>
                                                <th className="p-4">Chênh lệch</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white text-[24px]">
                                            {
                                                sortedRecords.map((d, i) => (
                                                    <tr key={i} className="hover:bg-gray-400 border-b">
                                                        <td className="p-3 text-center">{d.MaLoaiTietKiem}</td>
                                                        <td className="p-4">{formatToVND(d.TongThu)}</td>
                                                        <td className="p-4">{formatToVND(d.TongChi)}</td>
                                                        <td className="p-4">{formatToVND(d.ChenhLech)}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr className="hover:bg-gray-400 border-b font-bold">
                                                <td className="p-3 text-center ">Tổng</td>
                                                <td className="p-4 text-green-500">{formatToVND(totalTongThu)}</td>
                                                <td className="p-4 text-red-500">{formatToVND(totalTongChi)}</td>
                                                <td className="p-4 text-yellow-500">{formatToVND(totalChenhLech)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="  py-10 mx-auto">
                                        <button onClick={printButton}
                                            className=" text-2xl  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 px-14  rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                                            In biên lai
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ESavingDate;
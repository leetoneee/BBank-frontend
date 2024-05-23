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
import { formatDateResult, formatDateSaving } from "../../utils/formatDateAndTime";

const EStatement = () => {
    const navigate = useNavigate();

    const [isShowEmptySTK, setIsShowEmptySTK] = useState(false);
    const [isShowEmptyBegin, setIsShowEmptyBegin] = useState(false);
    const [isShowEmptyEnd, setIsShowEmptyEnd] = useState(false);
    const [stk, setStk] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [records, setRecords] = useState([]);

    const handleDateBegin = (e) => {
        const day = new Date(e.target.value);
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const date = String(day.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${date}`;
        setDateBegin(formattedDate);
    };

    const handleDateEnd = (e) => {
        const day = new Date(e.target.value);
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const date = String(day.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${date}`;
        setDateEnd(formattedDate);
    };

    const handleClick = () => {
        if (!stk) {
            setIsShowEmptySTK(true);
            return;
        }
        if (!dateBegin) {
            setIsShowEmptyBegin(true);
            return;
        }
        if (!dateEnd) {
            setIsShowEmptyEnd(true);
            return;
        }
        setIsShowEmptySTK(false);
        setIsShowEmptyBegin(false);
        setIsShowEmptyEnd(false);
        axios.post('/accounts/statement', {
            "SoTaiKhoan": stk,
            "StartDate": dateBegin,
            "EndDate": dateEnd
        })
            .then(res => {
                setRecords(res.data.transactions);
                setIsTableVisible(true);
            })
            .catch(error => {
                console.error("There was an error fetching the report!", error);
            });
    };

    const sortedRecords = [...records].sort((a, b) => a.MaGiaoDich - b.MaGiaoDich);
    // const totalTongThu = sortedRecords.reduce((sum, record) => sum + record.TongThu, 0);
    // const totalTongChi = sortedRecords.reduce((sum, record) => sum + record.TongChi, 0);
    // const totalChenhLech = sortedRecords.reduce((sum, record) => sum + record.ChenhLech, 0);

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Sao kê tài khoản " + stk + ' ' + dateBegin + ' - ' + dateEnd,
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
                <div className="w-auto flex flex-col">
                    <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center mt-14" />

                    <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen overflow-auto no-scrollbar">
                        <div className="w-[60%] self-center">
                            {/* Title */}
                            <div className="w-full ">
                                <h1 className="mt-20 text-[40px]
                                            text-white font-bold ">
                                    Sao kê tài khoản
                                </h1>
                                <div className="2xl:mt-[23px] text-[20px]
                                            text-[#B0B5B6] flex flex-row ">
                                    <span onClick={() => navigate('../home')}
                                        className="text-center hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <span onClick={() => navigate('../home/statistic-group')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"> Báo cáo </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <p className="text-[#72BF00] hover:cursor-auto"> Sao kê tài khoản </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-7 py-6 ">
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
                                    <span className="font-bold text-[20px] self-center mt-4 mb-5">Sao kê tài khoản {stk}</span>
                                    <div className=" flex flex-col">
                                        <table className="w-full text-left table">
                                            <thead className="text-[10px] bg-gray-200  text-black uppercase sticky top-[170px] z-10 ">
                                                <tr>
                                                    <th className="p-4">Mã giao dịch</th>
                                                    <th className="p-4">Số tiền</th>
                                                    <th className="p-4">Số dư</th>
                                                    <th className="p-4">Thời gian giao dịch</th>
                                                    <th className="p-4">Nội dung</th>
                                                    <th className="p-4">Tổng tiền</th>
                                                    <th className="p-4">Số TK nhận</th>
                                                    <th className="p-4">Số TK rút</th>
                                                    <th className="p-4">Mã phiếu</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-black text-[10px]">
                                                {
                                                    sortedRecords.map((d, i) => (
                                                        <tr key={i} className=" border-b border-slate-950">
                                                            <td className="p-3 text-center">{d.MaGiaoDich}</td>
                                                            <td className="p-4">{formatToVND(d.SoTien)}</td>
                                                            <td className="p-4">{d.SoDuNguon ? formatToVND(d.SoDuNguon) : formatToVND(d.SoDuDich)}</td>
                                                            <td className="p-4">{formatDateResult(d.ThoiGian)}</td>
                                                            <td className="p-3 text-center">{d.NoiDung}</td>
                                                            <td className="p-4">{formatToVND(d.TongTien)}</td>
                                                            <td className="p-3 text-center">{d.SoTKNhan}</td>
                                                            <td className="p-3 text-center">{d.SoTKRut}</td>
                                                            <td className="p-3 text-center">{d.MaPhieu}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <span className="font-bold text-center mt-3">Cảm ơn Quý khách đã sử dụng dịch vụ của BBank!</span>
                                </div>

                                {/* Số tài khoản */}
                                <div className="w-full bg-[#26383C]  rounded-[10px] py-10 px-10 self-center">
                                    <div className="grid grid-cols-3 gap-8">
                                        <span className="col-start-1 row-start-1 text-[#A5ACAE] text-[23px]  self-center ">Số tài khoản</span>
                                        <div className="col-start-2 col-span-2">
                                            {isShowEmptySTK && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số tài khoản</span>}
                                            <input type="number"
                                                className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                                onFocus={() => setIsTableVisible(false)}
                                                onChange={(e) => setStk(e.target.value)}
                                                placeholder="Nhập số tài khoản"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ngày bắt đầu */}
                                <div className="w-full bg-[#26383C]  rounded-[10px] py-10 px-10 self-center">
                                    <div className="grid grid-cols-3 gap-8">
                                        <span className="col-start-1 row-start-1 text-[#A5ACAE] text-[23px]  self-center ">Ngày bắt đầu</span>
                                        <div className="col-start-2 col-span-2">
                                            {isShowEmptyBegin && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập ngày bắt đầu</span>}
                                            <input type="date"
                                                className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                                onFocus={() => setIsTableVisible(false)}
                                                onChange={handleDateBegin}
                                                placeholder="Nhập ngày bắt đầu"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ngày kết thúc */}
                                <div className="w-full bg-[#26383C]  rounded-[10px] py-10 px-10 self-center">
                                    <div className="grid grid-cols-3 gap-8">
                                        <span className="col-start-1 row-start-1 text-[#A5ACAE] text-[23px]  self-center ">Ngày kết thúc</span>
                                        <div className="col-start-2 col-span-2">
                                            {isShowEmptyEnd && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập ngày kết thúc</span>}
                                            <input type="date"
                                                className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                                onFocus={() => setIsTableVisible(false)}
                                                onChange={handleDateEnd}
                                                placeholder="Nhập ngày kết thúc"
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
                        </div>
                        {/* table */}
                        {isTableVisible && (
                            <div className=" flex flex-col mt-10">
                                <table className="w-full text-left table bg-[#26383C]">
                                    <thead className="text-[23px] text-gray-700 uppercase bg-gray-200 sticky top-[170px] z-10 ">
                                        <tr>
                                            <th className="p-4">Mã giao dịch</th>
                                            <th className="p-4">Số tiền</th>
                                            <th className="p-4">Số dư</th>
                                            <th className="p-4">Thời gian giao dịch</th>
                                            <th className="p-4">Nội dung</th>
                                            <th className="p-4">Tổng tiền</th>
                                            <th className="p-4">Số TK nhận</th>
                                            <th className="p-4">Số TK rút</th>
                                            <th className="p-4">Mã phiếu</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white text-[24px]">
                                        {
                                            sortedRecords.map((d, i) => (
                                                <tr key={i} className="hover:bg-gray-400 border-b">
                                                    <td className="p-3 text-center">{d.MaGiaoDich}</td>
                                                    <td className="p-4">{formatToVND(d.SoTien)}</td>
                                                    <td className="p-4">{d.SoDuNguon ? formatToVND(d.SoDuNguon) : formatToVND(d.SoDuDich)}</td>
                                                    <td className="p-4">{formatDateResult(d.ThoiGian)}</td>
                                                    <td className="p-3 text-center">{d.NoiDung}</td>
                                                    <td className="p-4">{formatToVND(d.TongTien)}</td>
                                                    <td className="p-3 text-center">{d.SoTKNhan}</td>
                                                    <td className="p-3 text-center">{d.SoTKRut}</td>
                                                    <td className="p-3 text-center">{d.MaPhieu}</td>
                                                </tr>
                                            ))
                                        }

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
    )
}

export default EStatement;
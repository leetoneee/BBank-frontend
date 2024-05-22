import { classNames } from "../../classNames/classNames";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/icons/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import formatToVND, { formatToMoney } from "../../../utils/formatToVND";
import { reset as resetTransHis } from "../../../redux/customer/getTransactionHistory/getTransactionHistorySlice";
import { reset as resetTransfer } from "../../../redux/customer/transfer/transferSlice";
import { formatDateSaving, formatDateResult, formatDateChart, formatDateGetTime } from "../../../utils/formatDateAndTime";
import { GoArrowRight } from "react-icons/go";
import TransHisChart from "../../charts/TransHisChart";
import { useState } from "react";
import PopupTransHis from "../../Popup/PopupTransHis";

function Result(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


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

    //*
    const TaiKhoanNguon = useSelector((state) => state.getTransHis.TaiKhoanNguon);
    const ThoiGian = useSelector((state) => state.getTransHis.ThoiGian);
    const StartDate = useSelector((state) => state.getTransHis.StartDate);
    const EndDate = useSelector((state) => state.getTransHis.EndDate);
    const transactions = useSelector((state) => state.getTransHis.transactions);

    const [isShowPopup, setIsShowPopup] = useState(false);

    const formattedData = transactions.map((item) => ({
        ...item,
        date: formatDateChart(item.ThoiGian),
        time: formatDateGetTime(item.ThoiGian),
        bienDong: item.SoTKNhan === TaiKhoanNguon.SoTaiKhoan ? '+' : '-',
        transactionAmount: item.TongTien,
        moneyAfterTransaction: item.SoTKNhan === TaiKhoanNguon.SoTaiKhoan ? item?.SoDuDich : item?.SoDuNguon
    }));

    formattedData.sort((a, b) => a.MaGiaoDich - b.MaGiaoDich);


    const reversedData = [...formattedData].reverse();
    console.log("🚀 ~ Result ~ reversedData:", reversedData)
    console.log("🚀 ~ sortedData ~ sortedData:", formattedData)

    const [popupStates, setPopupStates] = useState(new Array(reversedData.length).fill(false));

    const handleShowTransaction = (index) => {
        const newPopupStates = [...popupStates];
        newPopupStates[index] = !newPopupStates[index];
        setPopupStates(newPopupStates);
    }
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

            {formattedData && formattedData.length > 0 &&
                <div className="w-[175%] h-[550px] -translate-x-1/4  ">
                    <TransHisChart data={formattedData} />
                </div>
            }

            <div className=" pt-10  min-h-screen ">
                <h1 className="mt-20 text-[40px] text-white font-bold  ">
                    Danh sách lịch sử giao dịch
                </h1>
                <div className="mt-[23px] overflow-y-auto no-scrollbar h-[650px]  w-full flex flex-col bg-[#26383C] rounded-[10px] py-10 px-10 gap-4 shadow-sm shadow-gray-200">
                    {reversedData && reversedData.length > 0 &&
                        reversedData.map((item, index) => (
                            <div key={index}>
                                <div className="grid grid-cols-8 grid-rows-2 w-full h-28 p-3 bg-[#4E4E4E]/[70%] transition ease-in-out hover:bg-[#4E4E4E] rounded-[10px] duration-200 m-auto"
                                    onClick={() => handleShowTransaction(index)}>
                                    {/* Thời gian */}
                                    <span className="col-start-1 col-span-5 text-sm text-[#8d9191]">
                                        {formatDateResult(item.ThoiGian)}
                                    </span>

                                    {/* Mã GD */}
                                    <div className="col-end-9 col-span-2 text-xl text-white flex flex-row justify-between">
                                        <span>
                                            Mã GD:
                                        </span>
                                        <span className="">
                                            {item.MaGiaoDich}
                                        </span>
                                    </div>
                                    {/* Nội dung */}
                                    {
                                        item && item.MaLoaiGD === 1 &&
                                        <span className="col-start-1 col-end-6 row-start-2  text-white text-2xl truncate  ">
                                            {item.NoiDung}
                                        </span>
                                    }
                                    {
                                        item && item.MaLoaiGD === 2 &&
                                        <span className="col-start-1 col-end-6 row-start-2  text-white text-2xl truncate  ">
                                            {item.NoiDung}
                                        </span>
                                    }
                                    {
                                        item && item.MaLoaiGD === 3 &&
                                        <span className="col-start-1 col-end-6 row-start-2  text-white text-2xl truncate  ">
                                            {item.NoiDung}
                                        </span>
                                    }
                                    {
                                        item && item.MaLoaiGD === 4 &&
                                        <span className="col-start-1 col-end-6 row-start-2  text-white text-2xl truncate  ">
                                            LẬP PHIẾU TIẾT KIỆM
                                        </span>
                                    }
                                    {
                                        item && item.MaLoaiGD === 5 &&
                                        <span className="col-start-1 col-end-6 row-start-2  text-white text-2xl truncate  ">
                                            TẤT TOÁN TIẾT KIỆM
                                        </span>
                                    }
                                    <span className={classNames("col-start-6 col-end-9 row-start-2 text-right font-bold text-xl truncate  ", item.bienDong === '+' ? 'text-[#71BD00]' : 'text-red-500')}>
                                        {item.bienDong} {formatToMoney(item.TongTien)}
                                    </span>
                                </div>
                                {popupStates[index] &&
                                    <PopupTransHis pos={index} showPopup={popupStates[index]} setShowPopup={(index) => handleShowTransaction(index)} content={reversedData[index]} />
                                }
                            </div>
                        ))
                    }
                    {reversedData && !(reversedData.length > 0) &&
                        <>
                            <span className="text-xl text-white">Không có giao dịch nào được thực hiện trong khoản thời gian này.</span>
                        </>
                    }
                </div>

                <div className=" container mt-6  flex justify-around " >
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
            </div>
        </div >
    )
}

export default Result;
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
import InterestDropdown from "../../components/Listbox/InterestDropdown";
import roundInterest from "../../utils/roundInterest";

const CalcInterest = () => {
    const navigate = useNavigate();

    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);

    const [soTienGui, setSoTienGui] = useState('');
    const [result, setResult] = useState('');

    const [isShowEmptyKyHan, setIsShowEmptyKyHan] = useState(false);
    const [isShowEmptySoTienGui, setIsShowEmptySoTienGui] = useState(false);

    const tinhTienLai = (SoTienGui, SoNgayGui, LaiSuat) => {
        let tienLai = SoTienGui;

        for (let i = 0; i < SoNgayGui; i++) {
            tienLai += (SoTienGui * LaiSuat) / 365;
            tienLai = Math.round(tienLai);
        }
        return Math.round(tienLai);
    };

    const handleClick = () => {
        setIsShowEmptyKyHan(false);
        setIsShowEmptySoTienGui(false);

        if (!soTienGui) {
            setIsShowEmptySoTienGui(true);
        }
        console.log("🚀 ~ handleClick ~ soTienGui:", soTienGui)

        if (!KyHan) {
            setIsShowEmptyKyHan(true);
        }

        if (!KyHan || !soTienGui) {
            return;
        }
        let soNgayGui = KyHan?.KyHan * 30;
        let interest = roundInterest(KyHan?.LaiSuat);
        let tienLai = tinhTienLai(Number(soTienGui), soNgayGui, interest);

        setResult(tienLai);
    };


    useEffect(() => {
        setResult('');
    }, [KyHan, soTienGui])

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
                        <div className="w-1/2 self-center">
                            {/* Title */}
                            <div className="w-full">
                                <h1 className="mt-20 text-[40px]
                                            text-white font-bold  ">
                                    Tính lãi tiết kiệm
                                </h1>
                                <div className="2xl:mt-[23px] text-[20px]
                                            text-[#B0B5B6] flex flex-row">
                                    <span onClick={() => navigate('../home')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                    <p>&nbsp;&gt;&nbsp;</p>

                                    <p className="text-[#72BF00] hover:cursor-auto"> Tính lãi tiết kiệm </p>
                                </div>
                            </div>

                            <div className="container horizontal my-10">
                                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                                    <div className="grid grid-cols-3 grid-rows-2 gap-8">
                                        {/* Số tiền */}
                                        <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Số tiền gửi</span>

                                        <div className="col-start-2 row-start-1 col-span-2">
                                            {isShowEmptySoTienGui && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số tiền gửi</span>}
                                            <input type="number" min={2000}
                                                className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                                value={soTienGui}
                                                onChange={(e) => setSoTienGui(e.target.value)}
                                                placeholder="Nhập số tiền"
                                            />
                                        </div>

                                        {/* Kỳ hạn gửi */}
                                        <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl  self-center  ">
                                            Kỳ hạn gửi
                                        </span>
                                        <div className="col-start-2 row-start-2 col-span-2 ">
                                            {isShowEmptyKyHan && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn kỳ hạn gửi</span>}
                                            <InterestDropdown />
                                        </div>


                                    </div>
                                </div>
                            </div>
                            {/* button Tiếp tục */}
                            {!result &&
                                <div className="m-auto">
                                    <div className="flex justify-center">
                                        <button onClick={handleClick}
                                            className=" text-2xl  bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 px-14  rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                                            Tính lãi
                                        </button>
                                    </div>
                                </div>
                            }
                            {result &&
                                <div className="container horizontal my-10">
                                    <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                                        <div className="grid grid-cols-3 grid-rows-1 gap-8">
                                            {/* Số tiền */}
                                            <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Tổng tiền</span>

                                            <div className="col-start-2 row-start-1 col-span-2">
                                                <span className="text-white text-2xl ">{formatToVND(result)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalcInterest;
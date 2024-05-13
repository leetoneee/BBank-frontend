import { useSelector, useDispatch } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import {formatDateResult} from "../../../utils/formatDateAndTime";
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../classNames/classNames";
import { withdrawSaving } from "../../../redux/customer/withdrawsavingSlice/withdrawsavingSlice";
import { setOtp, sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import { chenhLech, tinhChenhLechNgay } from './Initialization';
import { setKyHan, setNgayDenHan } from '../../../redux/KyHanNgayDenHan/kyhanngaydenhanSlice';


function Authenticity(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const PhieuTietKiem = useSelector((state) => state.listSaving.PhieuTietKiem);
    const user = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.customerWithdrawSaving.isLoading)

    const otp = useSelector((state) => state.sendOtp.otp);
    const [otpInput, setOtpInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupWaiting, setIsShowPopupWaiting] = useState(false);

    const createTransaction = () => {
        const raw = {
            "MaPhieu": PhieuTietKiem.MaPhieu
        };
        return dispatch(withdrawSaving(raw));
    }

    const currentDate = new Date(); // Tạo một đối tượng Date hiện tại
    const formattedDate = currentDate.toLocaleString(); 

    useImperativeHandle(ref, () => {
        return {
            validateOtp() {
                setValid(false)
                setIsShowPopup(false);

                if (Number(otpInput) === otp) {
                    //match
                    setValid(true);
                    return false; //Không lỗi
                }
                // not match
                setValid(false)
                // refreshString();
                setIsShowPopup(true);
                return true; // Có lỗi
            },
            createTransaction
        }
    }, [otpInput, valid])

    const otpCooldown = useRef(false);

    const handleSendNewOtp = () => {

        if (otpCooldown.current) {
            setIsShowPopupWaiting(true);
            return;
        }
        // Prevent sending new OTP during cooldown

        otpCooldown.current = setTimeout(() => {
            otpCooldown.current = false; // Reset cooldown timer
        }, 60000); // 60-second cooldown

        const otp = Math.floor(Math.random() * 1000000) // Generate 6-digit OTP
        const raw = {
            "otp": otp,
            "email": user.Email
        };

        dispatch(setOtp(otp));
        dispatch(sendOtp(raw));
    };

    const KyHan = PhieuTietKiem.LoaiTietKiem.GhiChu;
    const NgayDenHan = PhieuTietKiem.TamTinh.NgayTamRut;

    dispatch(setKyHan(KyHan));
    dispatch(setNgayDenHan(NgayDenHan));

    const TienTruocHan = Math.round(PhieuTietKiem.SoTienGui + (PhieuTietKiem.SoTienGui * 0.01 * chenhLech / 365));

    return (
        <div className="flex flex-col gap-[50px]">
            {/* Nhập OTP */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col mx-auto gap-2">
                    <span className="self-center text-[#A5ACAE] text-xl">Quý khách vui lòng nhập mã OTP đã được gửi về Email</span>
                    <span className="self-center text-[#7AC014] text-xl">{user.Email}</span>
                    <input type="number"
                        className="text-xl text-center py-2 text-[#7AC014] bg-white rounded-[10px] mx-16 "
                        placeholder="Nhập mã OTP"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)} />
                    <span className="self-center text-[#A5ACAE] text-xl mt-1">Bạn không nhận được mã? <span className="self-center text-[#7AC014] text-xl hover:underline hover:cursor-pointer" onClick={() => handleSendNewOtp()}>Gửi lại</span></span>

                </div>
                {isShowPopup &&
                    <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Mã OTP không chính xác. Quý khách vui lòng kiểm tra lại.' />}
                {isShowPopupWaiting &&
                    <PopupNotice showPopup={isShowPopupWaiting} setShowPopup={setIsShowPopupWaiting} content='Vui lòng đợi 60 giây trước khi yêu cầu mã OTP mới.' />}
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
                            {PhieuTietKiem.MaPhieu}
                        </span>
                    </div>

                    {/* Phương thức trả lãi */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {PhieuTietKiem.PhuongThuc}
                        </span>
                    </div>

                    {/* Kỳ hạn gửi */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {PhieuTietKiem.LoaiTietKiem.GhiChu}
                        </span>
                    </div>

                    {/* Lãi suất */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Lãi suất
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {Math.round(PhieuTietKiem.LaiSuat * 1000) / 1000}
                        </span>
                    </div>

                    {/* Số tiền gửi gốc */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền gửi gốc
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatToVND(PhieuTietKiem.SoTienGui)}
                        </span>
                    </div>

                    {/* Ngày mở phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày mở phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(PhieuTietKiem.NgayMo)}
                        </span>
                    </div>

                    {/* Ngày đến hạn */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đến hạn
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(PhieuTietKiem.TamTinh.NgayTamRut)}
                        </span>
                    </div>

                    {/* Ngày tất toán phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày tất toán phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(formattedDate)}
                        </span>
                    </div>

                    {/* Lãi suất trước hạn*/}
                    {chenhLech < tinhChenhLechNgay(PhieuTietKiem.NgayMo, PhieuTietKiem.TamTinh.NgayTamRut) && (
                        <>
                            <div className="border-b-2 border-white h-[2px] w-full self-center"></div>
                            <div className="grid grid-cols-3 grid-rows-1 gap-8">
                                <span className="col-start-1 text-[#A5ACAE] text-xl self-center">
                                    Lãi suất trước hạn
                                </span>
                                <span className="col-start-2 col-span-2 text-white text-xl self-center text-right">
                                    0.01
                                </span>
                            </div>
                        </>
                    )}


                    {/* Tổng tiền  */}
                    {chenhLech < tinhChenhLechNgay(PhieuTietKiem.NgayMo, PhieuTietKiem.TamTinh.NgayTamRut)
                    ?
                    (<>
                        <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        <div className="grid grid-cols-3 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                                Tổng tiền rút trước hạn 
                            </span>
                            <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                                <span className="text-xl font-bold">
                                    {formatToVND(TienTruocHan)}
                                </span>
                                <span className="text-[15px]">
                                    {readMoney(TienTruocHan.toString())}
                                </span>
                            </div>
                        </div>
                    </>)
                   :
                   (<>
                        <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        <div className="grid grid-cols-3 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                                Tổng tiền khi đến hạn 
                            </span>
                            <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                                <span className="text-xl font-bold">
                                    {formatToVND(PhieuTietKiem.TamTinh.TienTamTinh)}
                                </span>
                                <span className="text-[15px]">
                                    {readMoney(PhieuTietKiem.TamTinh.TienTamTinh.toString())}
                                </span>
                            </div>
                        </div>
                    </>)} 
                </div>
            </div>
            {
                isLoading && <Loading />
            }
        </div>
    )
}

export default forwardRef(Authenticity);
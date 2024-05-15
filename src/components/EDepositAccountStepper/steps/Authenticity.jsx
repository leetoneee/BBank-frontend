import { useSelector, useDispatch } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../classNames/classNames";
import { transferMoney } from "../../../redux/customer/transfer/transferSlice";
import { setOtp, sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { LoadingFlex as Loading } from "../../Loading/Loading";

function Authenticity(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.transfer.SoTien);
    const HinhThuc = useSelector((state) => state.transfer.HinhThuc);
    const NoiDung = useSelector((state) => state.transfer.NoiDung);
    const user = useSelector((state) => state.auth.user);
    const TaiKhoanDich = useSelector((state) => state.checkAccount.TaiKhoan)
    const isLoading = useSelector((state) => state.transfer.isLoading)
    const listFee = useSelector((state) => state.getTransType.listFee)

    const otp = useSelector((state) => state.sendOtp.otp);
    const [otpInput, setOtpInput] = useState();
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupWaiting, setIsShowPopupWaiting] = useState(false);

    const createTransaction = () => {
        const raw = {
            "SoTien": Number(SoTien),
            "NoiDung": NoiDung,
            "SoTKNhan": TaiKhoanDich.SoTaiKhoan,
            "SoTKRut": TaiKhoanNguon.SoTaiKhoan,
            "MaLoaiGD": 3
        };

        return dispatch(transferMoney(raw));
    }

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
                    <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Mã OTP hết hiệu lực hoặc không tồn tại. Quý khách vui lòng kiểm tra lại.' />}
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

            {/* Tài khoản đich */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tài khoản đích
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {TaiKhoanDich.SoTaiKhoan}
                        </span>
                    </div>
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tên người thụ hưởng
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600 font-bold text-xl  self-center text-right ">
                            {(TaiKhoanDich.HoTen).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Số tiền
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(Number(SoTien))}</span>
                            <span className="text-[15px]">{readMoney(SoTien)}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền phí
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatToVND(listFee[1]?.Phi)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
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
                        <span className={classNames("col-start-2 col-span-2 text-white text-xl text-ellipsis overflow-hidden  self-center", NoiDung.length <= 33 ? 'text-right' : 'text-justify')} >
                            {NoiDung}
                        </span>
                    </div>
                </div>
            </div>
            {
                isLoading && <Loading />
            }
        </div>
    )
}

export default forwardRef(Authenticity);
import { useSelector, useDispatch } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../classNames/classNames";
import { transferMoney } from "../../../redux/customer/transfer/transferSlice";
import { setOtp, sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import { formatDateSaving } from "../../../utils/formatDateAndTime";
import { createAccountCustomer } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";

function Authenticity(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.transfer.SoTien);
    const HinhThuc = useSelector((state) => state.transfer.HinhThuc);
    const NoiDung = useSelector((state) => state.transfer.NoiDung);
    const user = useSelector((state) => state.auth.user);
    const TaiKhoanDich = useSelector((state) => state.checkAccount.TaiKhoan)
    const isLoading = useSelector((state) => state.transfer.isLoading)
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const LoaiTaiKhoan = useSelector((state) => state.createAccount.LoaiTaiKhoan)

    const otp = useSelector((state) => state.sendOtp.otp);
    const [otpInput, setOtpInput] = useState();
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupWaiting, setIsShowPopupWaiting] = useState(false);

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    }

    const createTransaction = () => {
        const raw = {
            "MaKhachHang": NguoiDung.MaNguoiDung,
            "LoaiTaiKhoan": LoaiTaiKhoan
        };

        return dispatch(createAccountCustomer(raw));
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

            {/* username */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                        Tài khoản nguồn
                    </span>
                    <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                        {NguoiDung.username}
                    </span>
                </div>
            </div>

            {/* Loại Tài khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Loại thanh toán được tạo
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {LoaiTaiKhoan}
                        </span>
                    </div>
                </div>
            </div>

            {/* Thông tin khách hàng */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Ngày đăng ký */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đăng ký
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(NguoiDung.NgayDK)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Họ tên */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Họ và tên
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{(NguoiDung.HoTen).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Ngày sinh */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày sinh
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(NguoiDung.NgaySinh)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Giới tính */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giới tính
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                NguoiDung.GioiTinh ? "Nam" : "Nữ"
                            }
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
                            Căng cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số
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

            {
                isLoading && <Loading />
            }
        </div>
    )
}

export default forwardRef(Authenticity);
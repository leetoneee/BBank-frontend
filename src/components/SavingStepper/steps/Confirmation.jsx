import { useDispatch, useSelector } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import ConfirmationDropdown from '../../Listbox/XacThucDropdown';
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle } from "react";
import { IoReload } from "react-icons/io5";
import { classNames } from "../../classNames/classNames";
import { setOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { formatDateSaving } from "../../../utils/formatDateAndTime";
import roundInterest from "../../../utils/roundInterest";
import { setNgayMo } from "../../../redux/customer/depositSaving/customerDepositSavingSlice";

const people = [
    { name: 'Xác thực qua Email' },
]

function Confirmation(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.cDepositSaving.SoTienGui);
    const user = useSelector((state) => state.auth.user);
    const ten = useSelector((state) => state.user.ten);
    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const PhuongThuc = useSelector((state) => state.cDepositSaving.PhuongThuc);
    const isAuto = useSelector((state) => state.cDepositSaving.isAuto);

    const randomString = Math.random().toString(36).slice(8);

    const [otpEmail, setOtpEmail] = useState('');
    const [capcha, setCapcha] = useState(randomString);
    const [capchaInput, setCapchaInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const date = new Date();

    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };

    const initOtp = () => {
        return Math.floor(Math.random() * 1000000);
    }


    useImperativeHandle(ref, () => {
        return {
            validateCapcha() {
                setValid(false)
                setIsShowPopup(false);

                if (capchaInput === capcha) {
                    //match
                    setValid(true);
                    let otp = initOtp();
                    let raw = {
                        "otp": otp,
                        "email": user.Email
                    }
                    dispatch(setOtp(otp));
                    dispatch(sendOtp(raw));
                    dispatch(setNgayMo(formatDateSaving(date)));
                    return false; //Không lỗi
                }
                // not match
                setValid(false)
                refreshString();
                setIsShowPopup(true);
                return true; // Có lỗi
            }
        }
    }, [capchaInput, capcha, valid])

    return (
        <div className="flex flex-col gap-[50px]">
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
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600  text-xl font-bold  self-center text-right ">
                            {ten.toUpperCase()}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ người mở
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {user.DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {user.CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày mở phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatDateSaving(date)}
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
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {KyHan.GhiChu} – {roundInterest(KyHan.LaiSuat * 100)}%/năm
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {PhuongThuc.name}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tiết kiệm tự động
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {isAuto === '1' ? "Có" : "Không"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Xác thực OTP */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-2 grid-rows-4 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">
                        Phương thức xác nhận
                    </span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <ConfirmationDropdown people={people} setSelectedValue={setOtpEmail} />
                    </div>

                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">
                        Email nhận mã OTP
                    </span>
                    <div className="col-start-2 row-start-2 col-span-2 bg-white rounded-[10px] py-2 pl-3 pr-10 w-full">
                        <span className="font-museo-slab-100 text-xl text-[#7AC014]">{user.Email}</span>
                    </div>

                    <span className="col-start-1 row-start-3 text-[#A5ACAE] text-xl  self-center ">Mã kiểm tra</span>
                    <input
                        className="col-start-2 row-start-3 font-museo-slab-100  col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] self-center "
                        value={capchaInput}
                        onChange={(e) => setCapchaInput(e.target.value)}
                        placeholder="Nhập mã kiểm tra"
                    />
                    <span className="col-start-2 row-start-4 text-[#9553FF] select-none text-3xl font-aubrey">{capcha}</span>
                    <button className="col-start-2 row-start-4 translate-x-24 h-min w-min self-center   " onClick={() => refreshString()}>
                        <IoReload size={32} color="gray" />
                    </button>
                    {isShowPopup &&
                        <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Mã kiểm tra không chính xác. Quý khách vui lòng kiểm tra lại.' />}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Confirmation);
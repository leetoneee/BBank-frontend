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
import { createProfileCustomer } from "../../../redux/employee/createCustomerProfile/createCustomerProfileSlice";
const people = [
    { name: 'Xác thực qua Email' },
]


function Confirmation(props, ref) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const randomString = Math.random().toString(36).slice(8);
    const [otpEmail, setOtpEmail] = useState('');
    const [capcha, setCapcha] = useState(randomString);
    const [capchaInput, setCapchaInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    //*
    const NgayDangKy = useSelector((state) => state.createProfile.NgayDangKy)
    const HoTen = useSelector((state) => state.createProfile.HoTen)
    const Birthday = useSelector((state) => state.createProfile.Birthday)
    const GioiTinh = useSelector((state) => state.createProfile.GioiTinh);
    const SoDT = useSelector((state) => state.createProfile.SoDT);
    const CCCD = useSelector((state) => state.createProfile.CCCD);
    const DiaChi = useSelector((state) => state.createProfile.DiaChi);
    const NgheNghiep = useSelector((state) => state.createProfile.NgheNghiep);
    const Email = useSelector((state) => state.createProfile.Email);
    //*

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    }
    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };

    const initOtp = () => {
        return Math.floor(Math.random() * 1000000);
    }

    const createTransaction = () => {
        let date = new Date(Birthday);
        let formatedBirthday = date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

        const raw = {
            "NgheNghiep": NgheNghiep,
            "Email": Email,
            "SDT": SoDT,
            "DiaChi": DiaChi,
            "CCCD": CCCD,
            "HoTen": HoTen,
            "NgaySinh": formatedBirthday,
            "GioiTinh": GioiTinh,
            "username": SoDT,
            "password": "12345678",
            "MaNhom": 3
        };

        return dispatch(createProfileCustomer(raw));
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
                    return false; //Không lỗi
                }
                // not match
                setValid(false)
                refreshString();
                setIsShowPopup(true);
                return true; // Có lỗi
            },
            createTransaction
        }
    }, [capchaInput, capcha, valid])

    return (
        <div className="flex flex-col gap-[50px]">
            {/* Thông tin khách hàng */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Ngày đăng ký */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày đăng ký
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(NgayDangKy)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Họ tên */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Họ và tên
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{HoTen.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Ngày sinh */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày sinh
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                formatDate(Birthday)
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Giới tính */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giới tính
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {
                                GioiTinh ? "Nam" : "Nữ"
                            }
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số điện thoại */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số điện thoại
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {SoDT}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Địa chỉ */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Nghề nghiệp */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nghề nghiệp
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NgheNghiep}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Email */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Email
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {Email}
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
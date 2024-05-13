import { useDispatch, useSelector } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import {formatDateResult} from "../../../utils/formatDateAndTime";
import ConfirmationDropdown from '../../Listbox/XacThucDropdown';
import PopupNotice from "../../Popup/PopupNotice";
import PopupConfirm from "../../Popup/PopupConfirm";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { IoReload } from "react-icons/io5";
import { setOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { chenhLech, tinhChenhLechNgay } from './Initialization';

const people = [
    { name: 'Xác thực qua Email' },
]


function Confirmation(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const PhieuTietKiem = useSelector((state) => state.listSaving.PhieuTietKiem);
    const user = useSelector((state) => state.auth.user);

    const randomString = Math.random().toString(36).slice(8);
    const [otpEmail, setOtpEmail] = useState('');
    const [capcha, setCapcha] = useState(randomString);
    const [capchaInput, setCapchaInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupConfirm, setIsShowPopupConfirm] = useState(false);

    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };

    const initOtp = () => {
        return Math.floor(Math.random() * 1000000);
    }
    const currentDate = new Date(); // Tạo một đối tượng Date hiện tại
    const formattedDate = currentDate.toLocaleString();    

    useImperativeHandle(ref, () => {
        return {
            validateCapcha() {
                setValid(false)
                setIsShowPopup(false);
                setIsShowPopupConfirm(false);

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
                if (isShowPopup === false && 15 <= chenhLech && chenhLech < tinhChenhLechNgay(PhieuTietKiem.NgayMo, PhieuTietKiem.TamTinh.NgayTamRut)) {
                    setIsShowPopupConfirm(true);
                }
                // not match
                setValid(false)
                refreshString();
                setIsShowPopup(true);
                return true; // Có lỗi
            }
        }
    }, [capchaInput, capcha, valid])

    console.log("Chênh lệch giữa ngày mở và ngày đóng là:", tinhChenhLechNgay(PhieuTietKiem.NgayMo, PhieuTietKiem.TamTinh.NgayTamRut));
    console.log(" mở và ngày hiện tại là:", chenhLech);
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

            {/* Các thông tin tất toán */}
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
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
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

                    {/* Số tiền gửi gốc */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền gửi gốc
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {formatToVND(PhieuTietKiem.SoTienGui)}
                        </span>
                    </div>

                    {/* Tổng tiền khi đến hạn */}
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

                    {/* Ngày tất toán phiếu tiết kiệm */}
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày thực hiện tất toán
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl self-center text-right ">
                            {formatDateResult(formattedDate)}
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
                    {isShowPopupConfirm &&
                        <PopupConfirm showPopup={isShowPopupConfirm} setShowPopup={setIsShowPopupConfirm} handleClickComfirm={useImperativeHandle} content='Bạn có chắc chắn muốn thoát khỏi trang này không?' />}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Confirmation);
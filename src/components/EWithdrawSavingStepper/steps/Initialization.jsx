import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import InterestDropdown from "../../Listbox/InterestDropdown";
import HinhThucSavingDropdown from "../../Listbox/HinhThucSavingDropdown";
import {formatDateResult} from "../../../utils/formatDateAndTime";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { getSavingType } from "../../../redux/getSavingType/savingTypeSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienGui as setSoTien, setTaiKhoanNguon } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import readMoney from '../../../utils/n2vi';
import { formatDateSaving } from "../../../utils/formatDateAndTime";
import PopupNotice from "../../Popup/PopupNotice";
import PopupConfirm from "../../Popup/PopupConfirm";
import { IoReload } from "react-icons/io5";
import { setOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { sendOtp } from "../../../redux/system/sendOtp/sendOtpSlice";
import { chenhLech } from './Checking';
import tinhChenhLechNgay from "../../../utils/difDate";

const people = [
    { name: 'Xác thực qua Email' },
]

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const TaiKhoanNguon = useSelector((state) => state.eDepositSaving.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.eDepositSaving.SoTienGui);
    const PhuongThuc = useSelector((state) => state.cDepositSaving.PhuongThuc);
    const listAccounts = useSelector((state) => state.checkCccd.listAccounts)
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const PhieuTietKiem = useSelector((state) => state.elistSaving.PhieuTietKiem);
    const user = useSelector((state) => state.auth.user);

    const randomString = Math.random().toString(36).slice(8);
    const [soTienGui, setSoTienGui] = useState(SoTien);
    const [otpEmail, setOtpEmail] = useState('');
    const [account, setAccount] = useState();
    const [isShowEmptyKyHan, setIsShowEmptyKyHan] = useState(false);
    const [isShowEmptySoTienGui, setIsShowEmptySoTienGui] = useState(false);
    const [option, setOption] = useState('');
    const [valid, setValid] = useState(false);
    const [capchaInput, setCapchaInput] = useState('');
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupConfirm, setIsShowPopupConfirm] = useState(false);
    const [isSendOtp, setIsSendOtp] = useState(false);
    const [capcha, setCapcha] = useState(randomString);

    const date = new Date();

    const options = [
        { name: "Lãi nhập gốc" }
    ];

    
    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };

    const initOtp = () => {
        return Math.floor(Math.random() * 1000000);
    }

    const currentDate = new Date(); // Tạo một đối tượng Date hiện tại
    const formattedDate = currentDate.toLocaleString(); 

    const handleClickConfirm = () => {
        setIsSendOtp(true)
        setIsShowPopupConfirm(false);
        setValid(true);
        let otp = initOtp();
        let raw = {
            "otp": otp,
            "email": user.Email
        }
        dispatch(setOtp(otp));
        dispatch(sendOtp(raw));
    };

    useImperativeHandle(ref, () => {
        return {
            validateCapcha() {
                setValid(false)
                setIsShowPopup(false);
                setIsShowPopupConfirm(false);

                if (capchaInput === capcha) {
                    if (15 <= chenhLech && chenhLech < tinhChenhLechNgay(PhieuTietKiem.NgayMo, PhieuTietKiem.TamTinh.NgayTamRut)) {
                        setIsShowPopupConfirm(true);
                        if(isSendOtp === true){
                            return false; //Không lỗi
                        }
                        else
                            return true; //có lỗi
                    }
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
            }
        }
    }, [capchaInput, capcha, valid])

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    }

    let listAccountsObjects = [];

    if (listAccounts) {
        listAccountsObjects = listAccounts.map((account, index) => ({
            ...account,
            name: account.SoTaiKhoan
        }));
    }

    return (
        <div className="flex flex-col gap-7">
            {/* Thông tin khách hàng */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Họ tên */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{(NguoiDung.HoTen).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Ngày sinh*/}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày sinh
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatDate(NguoiDung.NgaySinh)}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Giới tính */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giới tính
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.GioiTinh === 1 ? 'Nam' : 'Nữ'}
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
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
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

            {/* Thông tin phiếu tiết kiệm */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Mã phiếu tiết kiệm */}
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Mã phiếu tiết kiệm
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{PhieuTietKiem.MaPhieu}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Phương thức trả lãi */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {PhieuTietKiem.PhuongThuc}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Kỳ hạn gửi */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {PhieuTietKiem.LoaiTietKiem.KyHan} tháng
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Lãi suất */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Lãi suất
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
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
                </div>
            </div>
            {isShowPopupConfirm &&
                        <PopupConfirm showPopup={isShowPopupConfirm} setShowPopup={setIsShowPopupConfirm} handleClickComfirm={handleClickConfirm} content='Phiếu tiết kiệm chưa đến hạn. Nếu tất toán trước hạn, quý khách sẽ chịu lãi suất thấp. Quý khách có chắc chắn tất toán phiếu tiết kiệm này không?' />}
        </div>
    )
}

export default forwardRef(Initialization);
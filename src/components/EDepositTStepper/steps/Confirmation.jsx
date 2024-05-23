import { useDispatch, useSelector } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle } from "react";
import { IoReload } from "react-icons/io5";
import { classNames } from "../../classNames/classNames";
import { formatDateSaving } from "../../../utils/formatDateAndTime";
import roundInterest from "../../../utils/roundInterest";
import { setNgayMo } from "../../../redux/customer/depositSaving/customerDepositSavingSlice";
import { employeeDepositSaving } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
function Confirmation(props, ref) {
    const dispatch = useDispatch();
    //*
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const SoTien = useSelector((state) => state.eDepositSaving.SoTienGui);
    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const userId = useSelector((state) => state.user.userId);
    const isAuto = useSelector((state) => state.eDepositSaving.isAuto);

    //*


    const randomString = Math.random().toString(36).slice(8);

    const [capcha, setCapcha] = useState(randomString);
    const [capchaInput, setCapchaInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const date = new Date();

    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };

    const createTransaction = () => {
        const raw = {
            "SoTienGui": Number(SoTien),
            "PhuongThuc": "Lãi nhập gốc",
            "MaLoaiTietKiem": KyHan.MaLoaiTietKiem,
            "MaKhachHang": NguoiDung.MaNguoiDung,
            "MaNhanVien": userId,
            "SoTaiKhoan": "",
            "isAuto": Number(isAuto),
        };

        return dispatch(employeeDepositSaving(raw));
    }

    useImperativeHandle(ref, () => {
        return {
            validateCapcha() {
                setValid(false)
                setIsShowPopup(false);

                if (capchaInput === capcha) {
                    //match
                    setValid(true);
                    dispatch(setNgayMo(formatDateSaving(date)));
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

            {/* Tài khoản đich */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600  text-xl font-bold  self-center text-right ">
                            {(NguoiDung.HoTen).toUpperCase()}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ người mở
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {NguoiDung.DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                            {NguoiDung.CCCD}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
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
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Số tiền
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(Number(SoTien))}</span>
                            <span className="text-[15px]">{readMoney(SoTien)}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Kỳ hạn gửi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {KyHan.GhiChu} – {roundInterest(KyHan.LaiSuat * 100)}%/năm
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            Lãi nhập gốc
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
                <div className="grid grid-cols-2 grid-rows-2 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Mã kiểm tra</span>
                    <input
                        className="col-start-2 row-start-1 font-museo-slab-100  col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] self-center "
                        value={capchaInput}
                        onChange={(e) => setCapchaInput(e.target.value)}
                        placeholder="Nhập mã kiểm tra"
                    />
                    <span className="col-start-2 row-start-2 text-[#9553FF] select-none text-3xl font-aubrey">{capcha}</span>
                    <button className="col-start-2 row-start-2 translate-x-24 h-min w-min self-center   " onClick={() => refreshString()}>
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
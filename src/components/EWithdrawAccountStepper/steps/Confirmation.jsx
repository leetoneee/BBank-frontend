import { useDispatch, useSelector } from "react-redux";
import readMoney from '../../../utils/n2vi';
import formatToVND from "../../../utils/formatToVND";
import ConfirmationDropdown from '../../Listbox/XacThucDropdown';
import PopupNotice from "../../Popup/PopupNotice";
import { useState, forwardRef, useImperativeHandle } from "react";
import { IoReload } from "react-icons/io5";
import { classNames } from "../../classNames/classNames";
import { employeeWithdrawAccount } from "../../../redux/employee/withdrawAccount/employeeWithdrawAccountSlice";

const people = [
    { name: 'Xác thực qua Email' },
]

function Confirmation(props, ref) {
    const dispatch = useDispatch();
    //*
    const TaiKhoanNguon = useSelector((state) => state.eWithdrawAccount.TaiKhoanNguon);
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const SoTien = useSelector((state) => state.eWithdrawAccount.SoTienRut);
    const listFee = useSelector((state) => state.getTransType.listFee)
    // const HinhThuc = useSelector((state) => state.eWithdrawAccount.HinhThuc)
    const NoiDung = useSelector((state) => state.eWithdrawAccount.NoiDung);
    const userId = useSelector((state) => state.user.userId);

    //*


    const randomString = Math.random().toString(36).slice(8);

    const [capcha, setCapcha] = useState(randomString);
    const [capchaInput, setCapchaInput] = useState('');
    const [valid, setValid] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);


    const refreshString = () => {
        setCapcha(Math.random().toString(36).slice(8));
    };


    const createTransaction = () => {
        const raw = {
            "CCCD": NguoiDung.CCCD,
            "SoTien": Number(SoTien),
            "NoiDung": NoiDung,
            "SoTKRut": TaiKhoanNguon.SoTaiKhoan,
            "MaLoaiGD": 1,
            "MaNhanVien": userId
        };

        return dispatch(employeeWithdrawAccount(raw));
    }

    useImperativeHandle(ref, () => {
        return {
            validateCapcha() {
                setValid(false)
                setIsShowPopup(false);

                if (capchaInput === capcha) {
                    //match
                    setValid(true);
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

            {/* Tài khoản nguồn */}
            {TaiKhoanNguon &&
                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                                Tài khoản nguồn
                            </span>
                            <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                                {TaiKhoanNguon?.SoTaiKhoan}
                            </span>
                        </div>
                        <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                                Số dư
                            </span>
                            <span className="col-start-2 col-span-2 text-white  text-xl font-museo-slab-100 self-center text-right ">
                                {formatToVND(TaiKhoanNguon?.SoDu)}
                            </span>
                        </div>
                    </div>
                </div>
            }

            {/* Thông tin khách hàng */}
            {NguoiDung &&
                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 grid-rows-1 gap-8">
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                                Tên chủ sở hữu tài khoản
                            </span>
                            <span className="col-start-2 col-span-2 text-red-600 text-xl font-bold  self-center text-right ">
                                {(NguoiDung?.HoTen).toUpperCase()}
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
                                Số căn cước công dân
                            </span>
                            <span className="col-start-2 col-span-2 text-white  text-xl  self-center text-right ">
                                {NguoiDung?.CCCD}
                            </span>
                        </div>
                    </div>
                </div>
            }


            {/* Thông tin chuyển khoản */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Số tiền rút
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(Number(SoTien))}</span>
                            <span className="text-[15px]">{readMoney(SoTien)}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số tiền phí
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatToVND(listFee[0]?.Phi)}
                        </span>
                    </div>

                    {/* <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Phương thức trả lãi
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {HinhThuc}
                        </span>
                    </div> */}

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Nội dung
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl  self-center text-right ">
                            {NoiDung}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số dư sau giao dịch
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{formatToVND(TaiKhoanNguon.SoDu - Number(SoTien) - listFee[0]?.Phi)}</span>
                            <span className="text-[15px]">{readMoney((TaiKhoanNguon.SoDu - Number(SoTien) - listFee[0]?.Phi).toString())}</span>
                        </div>
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
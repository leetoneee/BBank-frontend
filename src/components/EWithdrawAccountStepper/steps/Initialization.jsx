import { useDispatch, useSelector } from "react-redux";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienRut as setsotien, setHinhThuc as sethinhthuc, setNoiDung as setnoidung } from "../../../redux/employee/withdrawAccount/employeeWithdrawAccountSlice";
import PopupNotice from "../../Popup/PopupNotice";

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const TaiKhoanNguon = useSelector((state) => state.eWithdrawAccount.TaiKhoanNguon);
    const SoTienRut = useSelector((state) => state.eWithdrawAccount.SoTienRut);
    const NoiDung = useSelector((state) => state.eWithdrawAccount.NoiDung);
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const HinhThuc = useSelector((state) => state.eWithdrawAccount.HinhThuc)

    const [soTienRut, setSoTienRut] = useState(SoTienRut);
    const [noiDung, setNoiDung] = useState(NoiDung);
    const [isShowEmptySoTienRut, setIsShowEmptySoTienRut] = useState(false);
    const [isShowEmptyCheck1, setIsShowEmptyCheck1] = useState(false);
    const [isShowEmptyCheck2, setIsShowEmptyCheck2] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const [buttonStates, setButtonStates] = useState({
        button1: false,
        button2: false,
    });

    const initNoiDung = () => {
        if (NguoiDung.HoTen) {
            let noidung = (NguoiDung.HoTen).toUpperCase();
            noidung += ' rut tien'
            return noidung;
        }
        else return '';
    }

    useEffect(() => {
        if (noiDung === "") {
            setNoiDung(initNoiDung());
            dispatch(setnoidung(initNoiDung()));
        }
    }, [NguoiDung]);

    const changeButtonState = (buttonName) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [buttonName]: !prevState[buttonName], // Đảo ngược trạng thái của nút được click
        }));
    };

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyCheck1(false);
                setIsShowEmptyCheck2(false);
                setIsShowEmptySoTienRut(false);
                setIsShowPopup(false);

                if (!soTienRut) {
                    setIsShowEmptySoTienRut(true);
                }

                if (Number(soTienRut) >= TaiKhoanNguon?.SoDu) {
                    setIsShowPopup(true);
                }

                if (!buttonStates['button1']) {
                    setIsShowEmptyCheck1(true);
                }

                if (!buttonStates['button2']) {
                    setIsShowEmptyCheck2(true);
                }

                if (!soTienRut || !buttonStates['button2'] || !buttonStates['button1'] || (Number(soTienRut) >= TaiKhoanNguon?.SoDu))
                    return true; // Có lỗi

                dispatch(setsotien(soTienRut));
                dispatch(setnoidung(noiDung));
                return false; // Không lỗi
            }
        }
    }, [soTienRut, buttonStates, noiDung, TaiKhoanNguon])

    const handleRadioChange = (event) => {
        dispatch(sethinhthuc(event.target.value));
    };

    return (
        <div className="flex flex-col gap-7">

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

            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <button onClick={() => changeButtonState('button1')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                    border-[1px] border-white rounded-[20px]
                                                    ${buttonStates['button1'] ? ' bg-[#73C001] border-none' : ''}`}>
                        <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                    border-white border-[1px] rounded-full 
                                                    ${buttonStates['button1'] ? 'bg-white transform translate-x-4' : ''}`}>
                        </div>
                    </button>

                    <span className="text-white text-xl self-center" >Đã kiểm tra thông tin khách hàng</span>
                    <span className=" text-red-500 text-3xl absolute translate-x-[375px] translate-y-[5px] text-center">*</span>
                </div>
                {isShowEmptyCheck1 && <span className="absolute translate-y-[30px] text-[15px] text-red-600"> Vui lòng kiểm tra thông tin người rút tiền thật kỹ trước khi bấm nút này!</span>}
            </div>


            {/* Số tiền & Phí giao dịch nội dung */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-3 gap-8">
                    {/* Số tiền */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Số tiền rút</span>

                    <div className="col-start-2 col-span-2">
                        {isShowEmptySoTienRut && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số tiền rút</span>}
                        <input type="number" min={2000}
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soTienRut}
                            onChange={(e) => setSoTienRut(e.target.value)}
                            placeholder="Nhập số tiền"
                        />
                    </div>


                    {/* Phí giao dịch */}
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl  self-center ">Phí giao dịch</span>
                    <div className="col-start-2 row-start-2 self-center">
                        <input className="h-4 w-4 accent-[#73C001]" type="radio" name="hinh_thuc" value="Người chuyển trả" checked={HinhThuc === "Người chuyển trả"} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Người chuyển trả</label>
                    </div>
                    <div className="col-start-3 row-start-2 self-center">
                        <input className="h-4 w-4 accent-[#73C001] " type="radio" name="hinh_thuc" value="Người nhận trả" checked={HinhThuc === "Người nhận trả"} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Người nhận trả</label>
                    </div>

                    {/* Nội dung */}
                    <span className="col-start-1 row-start-3 text-[#A5ACAE] text-xl  self-center ">Nội dung</span>
                    <input
                        className="col-start-2 row-start-3 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                        value={noiDung}
                        onChange={(e) => setNoiDung(e.target.value)}
                        maxLength={200}
                        placeholder="Nhập nội dung rút tiền"
                    />
                </div>
            </div>


            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <button onClick={() => changeButtonState('button2')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                    border-[1px] border-white rounded-[20px]
                                                    ${buttonStates['button2'] ? ' bg-[#73C001] border-none' : ''}`}>
                        <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                    border-white border-[1px] rounded-full 
                                                    ${buttonStates['button2'] ? 'bg-white transform translate-x-4' : ''}`}>
                        </div>
                    </button>

                    <span className="text-white text-xl self-center" >Đã kiểm tra thông tin giao dịch</span>
                    <span className=" text-red-500 text-3xl absolute translate-x-[375px] translate-y-[5px] text-center">*</span>
                </div>
                {isShowEmptyCheck2 && <span className="absolute translate-y-[30px] text-[15px] text-red-600"> Vui lòng kiểm tra thông tin giao dịch thật kỹ trước khi bấm nút này!</span>}
            </div>
            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Số tiền rút lớn hơn số dư trong tài khoản. Vui lòng kiểm tra lại' />}
        </div>
    )
}

export default forwardRef(Initialization);
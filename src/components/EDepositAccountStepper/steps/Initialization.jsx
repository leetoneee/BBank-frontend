import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import PopupNotice from "../../Popup/PopupNotice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import { setNguoiDung, checkCccdExist } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import { setCCCD as setcccd, setNoiDung as setnoidung, setSoTien as setsotien, setHinhThuc as sethinhthuc } from "../../../redux/employee/depositAccount/employeeDepositAccountSlice";

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)
    const TaiKhoanDich = useSelector((state) => state.checkAccount.TaiKhoan);
    const SoTien = useSelector((state) => state.eDepositAccount.SoTien);
    const NoiDung = useSelector((state) => state.eDepositAccount.NoiDung);
    const HinhThuc = useSelector((state) => state.eDepositAccount.HinhThuc);

    const isExist = useSelector((state) => state.checkCccd.isExist)

    const initNoiDung = () => {
        if (NguoiDung.HoTen) {
            let noidung = (NguoiDung.HoTen).toUpperCase();
            noidung += ' chuyen tien'
            return noidung;
        }
        else return '';
    }

    const [cccd, setCCCD] = useState('');
    const [soTien, setSoTien] = useState(SoTien);
    const [noiDung, setNoiDung] = useState(NoiDung);
    const [option, setOption] = useState('');

    const [isShowEmptyCCCD, setIsShowEmptyCCCD] = useState(false);
    const [isShowEmptySoTien, setIsShowEmptySoTien] = useState(false);
    const [isShowEmptyCheck1, setIsShowEmptyCheck1] = useState(false);
    const [isShowEmptyCheck2, setIsShowEmptyCheck2] = useState(false);

    const [isShowPopup, setIsShowPopup] = useState(false);

    const [buttonStates, setButtonStates] = useState({
        button1: false,
        button2: false,
    });

    const changeButtonState = (buttonName) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [buttonName]: !prevState[buttonName], // Đảo ngược trạng thái của nút được click
        }));
    };

    const options = [
        { name: "Căn cước công dân" }
    ];

    useEffect(() => {
        if (noiDung === "") {
            setNoiDung(initNoiDung());
            dispatch(setnoidung(initNoiDung()));
        }
    }, [NguoiDung]);

    const checkCCCD = (cccd) => {
        if (cccd) {
            dispatch(checkCccdExist(cccd));
        }
    }

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyCheck1(false);
                setIsShowEmptyCheck2(false);
                setIsShowEmptyCCCD(false)
                setIsShowEmptySoTien(false);
                setIsShowPopup(false);

                if (!buttonStates['button1']) {
                    setIsShowEmptyCheck1(true);
                }

                if (!buttonStates['button2']) {
                    setIsShowEmptyCheck2(true);
                }

                if (!cccd) {
                    setIsShowEmptyCCCD(true);
                }

                if (!soTien) {
                    setIsShowEmptySoTien(true);
                }

                if (!isExist) {
                    setIsShowPopup(true);
                }

                if (!soTien || !isExist || !buttonStates['button1'] || !buttonStates['button2'])
                    return true; // Có lỗi

                dispatch(setsotien(soTien));
                dispatch(setcccd(cccd));
                dispatch(setnoidung(noiDung));
                return false; // Không lỗi
            }
        }
    }, [soTien, noiDung, isExist, buttonStates])

    const resetHoTen = () => {
        setIsShowEmptyCCCD(false);
        setIsShowEmptyCheck1(false);
        setIsShowEmptyCheck2(false);
        setButtonStates({
            ...buttonStates,
            button1: false,
            button2: false,
        })
        dispatch(setNguoiDung(''));
    }

    const handleRadioChange = (event) => {
        dispatch(sethinhthuc(event.target.value));
    };


    return (
        <div className="flex flex-col gap-7">

            {/* Tài khoản đich */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tài khoản đích
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl font-museo-slab-100  self-center text-right ">
                            {TaiKhoanDich.SoTaiKhoan}
                        </span>
                    </div>
                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Tên người thụ hưởng
                        </span>
                        <span className="col-start-2 col-span-2 text-red-600  text-xl font-bold  self-center text-right ">
                            {(TaiKhoanDich.HoTen).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* Giấy tờ tuỳ thân */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Giấy tờ tuỳ thân</span>

                    <div className="col-start-2 col-span-2">
                        <div className="flex flex-row-reverse  ">
                            <ConfirmationDropdown people={options} setSelectedValue={setOption} />
                        </div>
                    </div>

                    {/* Số CCCD */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Số</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyCCCD && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập số giấy tờ tuỳ thân</span>}
                        <input type="number" min={2000}
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={cccd}
                            onChange={(e) => setCCCD(e.target.value)}
                            onBlur={() => checkCCCD(cccd)}
                            onFocus={() => resetHoTen()}
                            placeholder="Nhập số giấy tờ tuỳ thân"
                        />
                    </div>
                    {isExist && NguoiDung &&
                        <>
                            {/* Tên */}
                            <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Họ tên người gửi</span>
                            <div className="col-start-2 col-span-2">
                                <div type="number" min={2000}
                                    className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] bg-white ">
                                    {(NguoiDung.HoTen).toUpperCase()}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {NguoiDung &&
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
                    {isShowEmptyCheck1 && <span className="absolute translate-y-[30px] text-[15px] text-red-600"> Vui lòng kiểm tra thông tin người nộp tiền thật kỹ trước khi bấm nút này!</span>}
                </div>
            }



            {/* Số tiền & Phí giao dịch nội dung */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-3 gap-8">
                    {/* Số tiền */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Số tiền</span>

                    <div className="col-start-2 col-span-2">
                        {isShowEmptySoTien && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số tiền chuyển khoản</span>}
                        <input type="number" min={2000}
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soTien}
                            onChange={(e) => setSoTien(e.target.value)}
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
                        placeholder="Nhập nội dung chuyển tiền"
                    />
                </div>
            </div>

            {NguoiDung &&
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
            }
            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Thông tin người gửi không tồn tại. Vui lòng kiểm tra lại.' />}
        </div>
    )
}

export default forwardRef(Initialization);
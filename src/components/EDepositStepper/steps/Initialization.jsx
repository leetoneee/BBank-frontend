import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import InterestDropdown from "../../Listbox/InterestDropdown";
import HinhThucSavingDropdown from "../../Listbox/HinhThucSavingDropdown";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { getSavingType } from "../../../redux/getSavingType/savingTypeSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienGui as setSoTien, setTaiKhoanNguon, setisAuto } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import PopupNotice from "../../Popup/PopupNotice";

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const isAuto = useSelector((state) => state.eDepositSaving.isAuto);
    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const TaiKhoanNguon = useSelector((state) => state.eDepositSaving.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.eDepositSaving.SoTienGui);
    const PhuongThuc = useSelector((state) => state.cDepositSaving.PhuongThuc);
    const listAccounts = useSelector((state) => state.checkCccd.listAccounts);
    const TienGuiTietKiemToiThieu = useSelector((state) => state.rules.TienGuiTietKiemToiThieu);
    const SoTienDuyTriTaiKhoan = useSelector((state) => state.rules.SoTienDuyTriTaiKhoan);

    const [soTienGui, setSoTienGui] = useState(SoTien);
    const [account, setAccount] = useState();
    const [isShowEmptyKyHan, setIsShowEmptyKyHan] = useState(false);
    const [isShowEmptySoTienGui, setIsShowEmptySoTienGui] = useState(false);
    const [isShowEmptyPhuongThuc, setIsShowEmptyPhuongThuc] = useState(false);
    const [isShowPopupToiThieu, setIsShowPopupToiThieu] = useState(false);
    const [isShowPopupSoDu, setIsShowPopupSoDu] = useState(false);


    useEffect(() => {
        dispatch(getSavingType());
    }, []);


    useEffect(() => {
        dispatch(setTaiKhoanNguon(account));
    }, [setAccount, account])

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyKyHan(false);
                setIsShowEmptySoTienGui(false);
                setIsShowEmptyPhuongThuc(false);
                setIsShowPopupToiThieu(false);
                setIsShowPopupSoDu(false);

                if (!KyHan) {
                    setIsShowEmptyKyHan(true);
                }

                if (!soTienGui) {
                    setIsShowEmptySoTienGui(true);
                }

                if (!PhuongThuc) {
                    setIsShowEmptyPhuongThuc(true);
                }

                if (soTienGui && soTienGui < TienGuiTietKiemToiThieu) {
                    setIsShowPopupToiThieu(true);
                }

                if (soTienGui && soTienGui >= TienGuiTietKiemToiThieu && (TaiKhoanNguon.SoDu - soTienGui) < SoTienDuyTriTaiKhoan) {
                    setIsShowPopupSoDu(true);
                }

                if (!soTienGui || !KyHan || !PhuongThuc || soTienGui < TienGuiTietKiemToiThieu || (TaiKhoanNguon.SoDu - soTienGui) < SoTienDuyTriTaiKhoan)
                    return true; // Có lỗi

                dispatch(setSoTien(soTienGui));
                return false; // Không lỗi
            }
        }
    }, [soTienGui, KyHan, PhuongThuc, TaiKhoanNguon])


    let listAccountsObjects = [];

    if (listAccounts) {
        listAccountsObjects = listAccounts.map((account, index) => ({
            ...account,
            name: account.SoTaiKhoan
        }));
    }

    const handleRadioChange = (event) => {
        dispatch(setisAuto(event.target.value));
    };

    return (
        <div className="flex flex-col gap-7">
            {/* Tài khoản nguồn & số dư */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* Tài khoản nguồn */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        {listAccountsObjects.length > 0 && <ConfirmationDropdown people={listAccountsObjects} setSelectedValue={setAccount} />}
                    </div>

                    {/* Số dư */}
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số dư khả dụng</span>
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {TaiKhoanNguon && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon?.SoDu)}</span>}
                    </div>
                </div>
            </div>


            {/* Kỳ hạn gửi & Số tiền & Hình thức */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-3 gap-8">
                    {/* Kỳ hạn gửi */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">
                        Kỳ hạn gửi
                    </span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        {isShowEmptyKyHan && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn kỳ hạn gửi</span>}
                        <InterestDropdown />
                    </div>


                    {/* Số tiền */}
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl  self-center ">Số tiền gửi</span>

                    <div className="col-start-2 row-start-2 col-span-2">
                        {isShowEmptySoTienGui && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số tiền gửi</span>}
                        <input type="number" min={2000}
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soTienGui}
                            onChange={(e) => setSoTienGui(e.target.value)}
                            placeholder="Nhập số tiền"
                        />
                    </div>

                    <span className="col-start-1 row-start-3 text-[#A5ACAE] text-xl  self-center  ">
                        Hình thức trả lãi
                    </span>
                    <div className="col-start-2 row-start-3 col-span-2 ">
                        {isShowEmptyPhuongThuc && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn phương thức trả lãi</span>}
                        <HinhThucSavingDropdown />
                    </div>

                    {/* Tiết kiệm tự động */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Tiết kiệm tự động ?</span>
                    <div className="col-start-2  self-center">
                        <input className="h-4 w-4 accent-[#73C001]" type="radio" name="gioi_tinh" value={'1'} checked={isAuto === '1'} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Có</label>
                    </div>
                    <div className="col-start-3  self-center">
                        <input className="h-4 w-4 accent-[#73C001] " type="radio" name="gioi_tinh" value={'0'} checked={isAuto === '0'} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Không</label>
                        <span className=" text-red-500 text-3xl absolute translate-x-[135px] text-center">*</span>
                    </div>

                </div>
            </div>
            {isShowPopupToiThieu &&
                <PopupNotice showPopup={isShowPopupToiThieu} setShowPopup={setIsShowPopupToiThieu} content={`Số tiền gửi tiết kiệm tối thiểu là ${formatToVND(TienGuiTietKiemToiThieu)}. Vui lòng nhập lại số tiền gửi tiết kiệm. `} />}
            {isShowPopupSoDu &&
                <PopupNotice showPopup={isShowPopupSoDu} setShowPopup={setIsShowPopupSoDu} content={`Số dư tối thiểu duy trì tài khoản là ${formatToVND(SoTienDuyTriTaiKhoan)}. Vui lòng nhập lại số tiền gửi tiết kiệm. `} />}
        </div>
    )
}

export default forwardRef(Initialization);
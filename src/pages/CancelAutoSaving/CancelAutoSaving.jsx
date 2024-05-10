import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../components/Listbox/Listbox";
import InterestDropdown from "../../components/Listbox/InterestDropdown";
import HinhThucSavingDropdown from "../../components/Listbox/HinhThucSavingDropdown";
import formatToVND from "../../utils/formatToVND";
import { useEffect, useState } from "react";
import { getSavingType } from "../../redux/getSavingType/savingTypeSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienGui as setSoTien } from "../../redux/customer/depositSaving/customerDepositSavingSlice";
import { checkAccountExist } from "../../redux/system/checkAccountExist/checkExistSlice";
import PopupNotice from "../../components/Popup/PopupNotice";

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.cDepositSaving.SoTienGui);
    const PhuongThuc = useSelector((state) => state.cDepositSaving.PhuongThuc);

    const [soTienGui, setSoTienGui] = useState(SoTien);
    const [isShowEmptyKyHan, setIsShowEmptyKyHan] = useState(false);
    const [isShowEmptySoTienGui, setIsShowEmptySoTienGui] = useState(false);
    const [isShowEmptyPhuongThuc, setIsShowEmptyPhuongThuc] = useState(false);

    useEffect(() => {
        dispatch(getSavingType());
    }, []);


    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyKyHan(false);
                setIsShowEmptySoTienGui(false);
                setIsShowEmptyPhuongThuc(false);

                if (!KyHan) {
                    setIsShowEmptyKyHan(true);
                }

                if (!soTienGui) {
                    setIsShowEmptySoTienGui(true);
                }

                if (!PhuongThuc) {
                    setIsShowEmptyPhuongThuc(true);
                }

                if (!soTienGui || !KyHan || !PhuongThuc)
                    return true; // Có lỗi

                dispatch(setSoTien(soTienGui));
                return false; // Không lỗi
            }
        }
    }, [soTienGui, KyHan, PhuongThuc])



    return (
        <div className="flex flex-col gap-7">
            {/* Tài khoản nguồn & số dư */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* Tài khoản nguồn */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <DropdownListbox />
                    </div>

                    {/* Số dư */}
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số dư khả dụng</span>
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {TaiKhoanNguon !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon.SoDu)}</span>}                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Initialization);
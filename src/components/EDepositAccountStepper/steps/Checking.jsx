import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { setNoiDung, setTaiKhoanDich, setSoTien, setHinhThuc } from '../../../redux/customer/transfer/transferSlice';
import PopupNotice from "../../Popup/PopupNotice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import { checkCccdExist } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setListAccount } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setTaiKhoanNguon } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import { checkAccountExist } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";

function Checking(props, ref) {
    const dispatch = useDispatch();

    const [isShowPopup, setIsShowPopup] = useState(false);

    //*
    const isExist = useSelector((state) => state.checkAccount.isExist)

    const [taiKhoanDich, setTaiKhoanDich] = useState();
    const [isShowEmptyTKDich, setIsShowEmptyTKDich] = useState(false);

    const checkAccount = (soTK) => {
        if (soTK)
            dispatch(checkAccountExist(soTK));
    }


    //*

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyTKDich(false);
                setIsShowPopup(false);


                if (!taiKhoanDich) {
                    setIsShowEmptyTKDich(true);
                }

                if (!isExist) {
                    setIsShowPopup(true);
                }

                if (!taiKhoanDich || !isExist)
                    return true; // Có lỗi

                return false; // Không lỗi
            }
        }
    }, [taiKhoanDich, isExist])


    return (
        <div className="flex flex-col gap-7">
            {/* Tài khoản đích */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Tài khoản đích</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyTKDich && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập tài khoản đích</span>}
                        <input type="number"
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={taiKhoanDich}
                            onChange={(e) => setTaiKhoanDich(e.target.value)}
                            placeholder="Nhập tài khoản thụ hưởng"
                            onBlur={() => checkAccount(taiKhoanDich)}
                        />
                    </div>

                </div>
            </div>
            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Tài khoản đích không tồn tại. Quý khách vui lòng kiểm tra lại.' />}
        </div>
    )
}

export default forwardRef(Checking);
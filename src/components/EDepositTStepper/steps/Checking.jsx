import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { setNoiDung, setTaiKhoanDich, setSoTien, setHinhThuc } from '../../../redux/customer/transfer/transferSlice';
import PopupNotice from "../../Popup/PopupNotice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import { setCCCD as setcccd } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";
import { checkCccdExist } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setListAccount } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setTaiKhoanNguon } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
function Checking(props, ref) {
    const dispatch = useDispatch();

    const [isShowPopup, setIsShowPopup] = useState(false);

    //*
    const listAccounts = useSelector((state) => state.checkCccd.listAccounts)
    const isExist = useSelector((state) => state.checkCccd.isExist)

    const [cccd, setCCCD] = useState('');

    const [option, setOption] = useState('');
    const [account, setAccount] = useState();
    const [isShowEmptyCCCD, setIsShowEmptyCCCD] = useState(false);

    const checkCCCD = (cccd) => {
        const raw = {
            "CCCD": cccd
        };
        if (cccd) {
            dispatch(checkCccdExist(raw));
        }
    }

    const resetListAccounts = () => {
        dispatch(setListAccount(''));
    }

    //*

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyCCCD(false);
                setIsShowPopup(false);


                if (!cccd) {
                    setIsShowEmptyCCCD(true);
                }

                if (!isExist) {
                    setIsShowPopup(true);
                }

                if (!cccd || !isExist)
                    return true; // Có lỗi

                dispatch(setcccd(cccd));
                return false; // Không lỗi
            }
        }
    }, [cccd, isExist])

    useEffect(() => {
        dispatch(setTaiKhoanNguon(account));
    }, [account, setAccount]);

    const options = [
        { name: "Căng cước công dân" }
    ];

    let listAccountsObjects = [];

    if (listAccounts) {
        listAccountsObjects = listAccounts.map((account, index) => ({
            ...account,
            name: account.SoTaiKhoan
        }));
    }
    console.log("🚀 ~ Initialization ~ options:", options)

    return (
        <div className="flex flex-col gap-7">
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
                            onFocus={() => resetListAccounts()}
                            placeholder="Nhập số giấy tờ tuỳ thân"
                        />
                    </div>
                </div>
            </div>

            {isExist && listAccounts &&
                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        {/* Giấy tờ tuỳ thân */}
                        <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Tài khoản đã có</span>

                        <div className="col-start-2 col-span-2">
                            <div className="flex flex-row-reverse  ">
                                {listAccountsObjects.length > 0 && <ConfirmationDropdown people={listAccountsObjects} setSelectedValue={setAccount} />}
                            </div>
                        </div>
                    </div>
                </div>
            }

            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Thông tin khách hàng không tồn tại. Vui lòng kiểm tra lại.' />}
        </div>
    )
}

export default forwardRef(Checking);
import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { setNoiDung, setTaiKhoanDich, setSoTien, setHinhThuc } from '../../../redux/customer/transfer/transferSlice';
import PopupNotice from "../../Popup/PopupNotice";
import { LoadingFlex as Loading } from "../../Loading/Loading";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import ListboxSavingCCCD from "../../Listbox/ListboxSavingCCCD";
import { setCCCD as setcccd } from "../../../redux/employee/createCustomerAccount/createCustomerAccountSlice";
import { checkCccdExist } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setListAccount } from "../../../redux/system/checkCccdExist/checkCccdExistSlice";
import { setPhieuTietKiem } from "../../../redux/employee/listSaving/listSavingSlice";
import { setTaiKhoanNguon } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import tinhChenhLechNgay from "../../../utils/difDate";
import { fetchAllSavingByAccount, reset } from '../../../redux/employee/listSaving/listSavingSlice';

let chenhLech = '';

function Checking(props, ref) {
    const dispatch = useDispatch();

    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupNotice, setIsShowPopupNotice] = useState(false);
    const [isShowEmptyPhieuTietKiem, setIsShowEmptyPhieuTietKiem] = useState(false);

    //*
    const listAccounts = useSelector((state) => state.checkCccd.listAccounts)
    const isExist = useSelector((state) => state.elistSaving.isExist)
    const elistSavings = useSelector((state) => state.elistSaving.elistSavings)
    const PhieuTietKiem = useSelector((state) => state.elistSaving.PhieuTietKiem);

    const [cccd, setCCCD] = useState('');
    const [selected, setSelected] = useState(PhieuTietKiem);
    const [option, setOption] = useState('');
    const [isShowEmptyCCCD, setIsShowEmptyCCCD] = useState(false);

    const checkCCCD = (cccd) => {
        if (cccd) {  // Kiểm tra xem SoGiayTo có giá trị hay không
            dispatch(fetchAllSavingByAccount(cccd));
          }
    }

    const resetelistSavings = () => {
        dispatch(reset());
    }

    const currentDate = new Date();
    const NgayHienTai = currentDate.toISOString();
    const ngay1 = PhieuTietKiem.NgayMo;
    const ngay2 = NgayHienTai;
    console.log("Chênh lệch giữa hai ngày là:", chenhLech);

    chenhLech = tinhChenhLechNgay(ngay1, ngay2);

    useEffect(() => {
        // Gọi API fetchAllSavingByAccount khi TaiKhoanNguon thay đổi
        if (cccd) {
            dispatch(reset());
          //dispatch(fetchAllSavingByAccount(cccd));
          setSelected(PhieuTietKiem);
        }
      }, [ cccd, dispatch]);

    useEffect(() => {
        if (cccd) {
            dispatch(checkCccdExist(cccd));
        }
    }, [ cccd, dispatch]);


    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyPhieuTietKiem(false);
                setIsShowEmptyCCCD(false);
                setIsShowPopup(false);
                setIsShowPopupNotice(false);

                if (!cccd) {
                    setIsShowEmptyCCCD(true);
                }

                if (!isExist) {
                    setIsShowPopup(true);
                }

                if (!PhieuTietKiem) {
                    setIsShowEmptyPhieuTietKiem(true);
                }

                if (chenhLech < 15) {
                    setIsShowPopupNotice(true);
                }


                if (!cccd || !PhieuTietKiem || !isExist || chenhLech < 15)
                    return true; // Có lỗi

                dispatch(setcccd(cccd));
                dispatch(setPhieuTietKiem(PhieuTietKiem));
                return false; // Không lỗi
            }
        }
    }, [cccd, PhieuTietKiem, isExist])

    const options = [
        { name: "Căn cước công dân" }
    ];

    let elistSavingsObjects = [];

    if (elistSavings) {
        elistSavingsObjects = elistSavings.map((account, index) => ({
            ...account,
            name: account.MaPhieu
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
                            onFocus={() => resetelistSavings()}
                            placeholder="Nhập số giấy tờ tuỳ thân"
                        />
                    </div>
                </div>
            </div>

            {isExist && elistSavings &&
                <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                    <div className="grid grid-cols-3 grid-rows-1 gap-8">
                        {/* Giấy tờ tuỳ thân */}
                        <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Phiếu tiết kiệm</span>
                        <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số tiền gốc gửi</span>
                        <div className="col-start-2 col-span-2">
                            <div className="flex flex-row-reverse  ">
                            {isShowEmptyPhieuTietKiem && <span className="absolute translate-y-[50px] translate-x-[-190px] text-[15px] text-red-600">Quý khách vui lòng chọn phiếu tiết kiệm</span>}
                                {elistSavingsObjects.length > 0 && <ListboxSavingCCCD />}
                            </div>
                        </div>
                        {/* Số dư */}
                        <div className="col-start-2 row-start-2 col-span-2 self-center">
                            {PhieuTietKiem !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(PhieuTietKiem.SoTienGui)}</span>}
                        </div>
                    </div>
                </div>
            }

            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Thông tin khách hàng không tồn tại. Vui lòng kiểm tra lại.' />}
            {isShowPopupNotice && PhieuTietKiem &&
                <PopupNotice showPopup={isShowPopupNotice} setShowPopup={setIsShowPopupNotice} content='Phiếu tiết kiệm này chưa đủ 15 ngày kể từ ngày mở. Không thể thực hiện tất toán phiếu tiết kiệm.' />}
        </div>
    )
}

export { chenhLech };
export default forwardRef(Checking);
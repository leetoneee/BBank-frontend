import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { fetchAllAccountById } from "../../../redux/customer/customerSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setTaiKhoanNguon, setTenTH, setDiaChiTH, setGiayToTH, setSoGiayToTH, setNgayCapTH, setNoiDung, setSoTien, setHinhThuc } from '../../../redux/customer/cashtransfer/cashtransferSlice';
import { checkAccountExist } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import ConfirmationDropdown from '../../Listbox/XacThucDropdown';
import PopupNotice from "../../Popup/PopupNotice";

const GiayTo = [
    { name: 'Căn cước công dân' },
]


function CashInitialization(props, ref) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const TaiKhoanNguon = useSelector((state) => state.withdrawsaving.TaiKhoanNguon);
    const HinhThuc = useSelector((state) => state.cashtransfer.HinhThuc);
    const isExist = useSelector((state) => state.checkAccount.isExist);

    const [isShowPopup, setIsShowPopup] = useState(false);

    useEffect(() => {
        let raw = {
            "MaKhachHang": userId
        };

        dispatch(fetchAllAccountById(raw));
    }, []);

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                // setIsShowEmptyTKDich(false);
                // setIsShowEmptySoTien(false);
                // setIsShowPopup(false);

                // if (!soTKNhan) {
                //     setIsShowEmptyTKDich(true);
                // }

                // if (!soTien) {
                //     setIsShowEmptySoTien(true);
                // }

                // if (!isExist) {
                //     setIsShowPopup(true);
                // }

                // if (!soTKNhan || !soTien || !isExist)
                //     return true; // Có lỗi

                // dispatch(setTaiKhoanDich(soTKNhan));
                // dispatch(setSoTien(soTien));
                // dispatch(setNoiDung(noiDung));
                return false; // Không lỗi
            }
        }
    }, [])

    const handleRadioChange = (event) => {
        dispatch(setHinhThuc(event.target.value));
    };

    // const people = [
    //     { SoTaiKhoan: 'Wade Cooper' },
    //     { SoTaiKhoan: 'Arlene Mccoy' },
    //     { SoTaiKhoan: 'Devon Webb' },
    //     { SoTaiKhoan: 'Tom Cook' },
    //     { SoTaiKhoan: 'Tanya Fox' },
    //     { SoTaiKhoan: 'Hellen Schmidt' },
    // ]


    return (
        <div className="flex flex-col gap-7">
            {/* Tài khoản nguồn & số dư */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* Tài khoản nguồn */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số dư</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <DropdownListbox />
                    </div>
                    {/* Số dư */}
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {TaiKhoanNguon !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon.SoDu)}</span>}
                    </div>
                </div>
            </div>

            {/* Tên, địa chỉ người thụ hưởng, giấy tờ tùy thân, số, ngày cấp*/}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* Tài khoản nguồn */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Phiếu tiết kiệm</span>
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số tiền gốc gửi</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <DropdownListbox />
                    </div>
                    {/* Số dư */}
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {TaiKhoanNguon !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon.SoDu)}</span>}
                    </div>
                </div>
            </div>

            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Quý khách vui lòng nhập đầy đủ thông tin.' />}
        </div>
    )
}

export default forwardRef(CashInitialization);
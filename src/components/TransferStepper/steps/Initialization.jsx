import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { fetchAllAccountById } from "../../../redux/customer/customerSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setNoiDung, setTaiKhoanDich, setSoTien, setHinhThuc } from '../../../redux/customer/transfer/transferSlice';
import { checkAccountExist } from "../../../redux/system/checkAccountExist/checkAccountExistSlice";
import PopupNotice from "../../Popup/PopupNotice";
import { LoadingFlex as Loading } from "../../Loading/Loading";

function Initialization(props, ref) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const ten = useSelector((state) => state.user.ten);

    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const TaiKhoanDich = useSelector((state) => state.transfer.TaiKhoanDich);
    const SoTien = useSelector((state) => state.transfer.SoTien);
    const NoiDung = useSelector((state) => state.transfer.NoiDung);
    const HinhThuc = useSelector((state) => state.transfer.HinhThuc);

    const isExist = useSelector((state) => state.checkAccount.isExist);

    const initNoiDung = () => {
        let noidung = ten.toUpperCase();
        noidung += ' chuyen tien'
        return noidung;
    }

    const [soTKNhan, setSoTKNhan] = useState(TaiKhoanDich);
    const [soTien, setsoTien] = useState(SoTien);
    const [noiDung, setnoiDung] = useState(NoiDung);
    const [isShowEmptyTKDich, setIsShowEmptyTKDich] = useState(false);
    const [isShowEmptySoTien, setIsShowEmptySoTien] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    useEffect(() => {
        let raw = {
            "MaKhachHang": userId
        };

        dispatch(fetchAllAccountById(raw));
    }, []);

    useEffect(() => {
        if (noiDung === "") {
            setnoiDung(initNoiDung());
            dispatch(setNoiDung(initNoiDung()));
        }
    }, [ten]);

    const checkAccount = (soTK) => {
        let raw = {
            "SoTaiKhoan": soTK
        };

        dispatch(checkAccountExist(raw));
        console.log(isExist);
    }

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyTKDich(false);
                setIsShowEmptySoTien(false);
                setIsShowPopup(false);

                if (!soTKNhan) {
                    setIsShowEmptyTKDich(true);
                }

                if (!soTien) {
                    setIsShowEmptySoTien(true);
                }

                if (!isExist) {
                    setIsShowPopup(true);
                }

                if (!soTKNhan || !soTien || !isExist)
                    return true; // Có lỗi

                dispatch(setTaiKhoanDich(soTKNhan));
                dispatch(setSoTien(soTien));
                dispatch(setNoiDung(noiDung));
                return false; // Không lỗi
            }
        }
    }, [soTKNhan, soTien, noiDung, isExist])

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
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số dư khả dụng</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        <DropdownListbox />
                    </div>
                    {/* Số dư */}
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {TaiKhoanNguon !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon.SoDu)}</span>}                    </div>
                </div>
            </div>

            {/* Tài khoản đích */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Tài khoản đích</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyTKDich && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập tài khoản đích</span>}
                        <input type="number"
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soTKNhan}
                            onChange={(e) => setSoTKNhan(e.target.value)}
                            placeholder="Nhập tài khoản thụ hưởng"
                            onBlur={() => checkAccount(soTKNhan)}
                        />
                    </div>

                </div>
            </div>

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
                            onChange={(e) => setsoTien(e.target.value)}
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
                        onChange={(e) => setnoiDung(e.target.value)}
                        maxLength={100}
                    />
                </div>
            </div>
            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Tài khoản đích không tồn tại. Quý khách vui lòng kiểm tra lại.' />}
        </div>
    )
}

export default forwardRef(Initialization);
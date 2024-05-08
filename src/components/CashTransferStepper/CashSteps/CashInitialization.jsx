import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { fetchAllAccountById } from "../../../redux/customer/customerSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setTaiKhoanNguon, setTenTH, setDiaChiTH, setGiayToTH, setSoGiayToTH, setNgayCapTH, setNoiDung, setSoTien, setHinhThuc } from '../../../redux/customer/cashtransfer/cashtransferSlice';
import { checkAccountExist } from "../../../redux/system/checkAccountExist/checkExistSlice";
import ConfirmationDropdown from '../../Listbox/XacThucDropdown';
import PopupNotice from "../../Popup/PopupNotice";

const GiayTo = [
    { name: 'Căn cước công dân' },
]


function CashInitialization(props, ref) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const ten = useSelector((state) => state.user.ten);
    const TaiKhoanNguon = useSelector((state) => state.cashtransfer.TaiKhoanNguon);
    const TenTH = useSelector((state) => state.cashtransfer.TenTH);
    const DiaChiTH = useSelector((state) => state.cashtransfer.DiaChiTH);
    const GiayToTH = useSelector((state) => state.cashtransfer.GiayToTH);
    const SoGiayToTH = useSelector((state) => state.cashtransfer.SoGiayToTH);
    const NgayCapTH = useSelector((state) => state.cashtransfer.NgayCapTH);
    const SoTien = useSelector((state) => state.cashtransfer.SoTien);
    const NoiDung = useSelector((state) => state.cashtransfer.NoiDung);
    const HinhThuc = useSelector((state) => state.cashtransfer.HinhThuc);
    const isExist = useSelector((state) => state.checkAccount.isExist);

    const initNoiDung = () => {
        let noidung = ten.toUpperCase();
        noidung += ' chuyen tien'
        return noidung;
    }

    const [soTien, setsoTien] = useState(SoTien);
    const [noiDung, setnoiDung] = useState(NoiDung);
    const [tenTH, settenTH] = useState(TenTH);
    const [diaChiTH, setdiaChiTH] = useState(DiaChiTH);
    const [giayToTH, setgiayToTH] = useState(GiayToTH);
    const [soGiayToTH, setsoGiayToTH] = useState(SoGiayToTH);
    const [ngayCapTH, setngayCapTH] = useState(NgayCapTH);
    const [isShowEmptyTenTH, setIsShowEmptyTenTH] = useState(false);
    const [isShowEmptyDiaChiTH, setIsShowEmptyDiaChiTH] = useState(false);
    const [isShowEmptyGiayToTH, setIsShowEmptyGiayToTH] = useState(false);
    const [isShowEmptySoGiayToTH, setIsShowEmptySoGiayToTH] = useState(false);
    const [isShowEmptyNgayCapTH, setIsShowEmptyNgayCapTH] = useState(false);
    const [isShowEmptySoTien, setIsShowEmptySoTien] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const [inputType, setInputType] = useState('text');

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
                setIsShowEmptyTenTH(false);
                setIsShowEmptyDiaChiTH(false);
                setIsShowEmptyGiayToTH(false);
                setIsShowEmptySoGiayToTH(false);
                setIsShowEmptyNgayCapTH(false);
                setIsShowEmptySoTien(false);
                setIsShowPopup(false);

                if (!soTien) {
                    setIsShowEmptySoTien(true);
                }

                if (!tenTH) {
                    setIsShowEmptyTenTH(true);
                }

                if (!diaChiTH) {
                    setIsShowEmptyDiaChiTH(true);
                }

                if (!soGiayToTH) {
                    setIsShowEmptySoGiayToTH(true);
                }

                if (!ngayCapTH) {
                    setIsShowEmptyNgayCapTH(true);
                }

                if (!tenTH || !diaChiTH || !soGiayToTH || !ngayCapTH || !soTien) {
                    setIsShowPopup(true);
                    return true
                }

                // if (!soTien || !isExist)
                //     return true; // Có lỗi

                dispatch(setTenTH(tenTH));
                dispatch(setDiaChiTH(diaChiTH));
                dispatch(setGiayToTH(giayToTH));
                dispatch(setSoGiayToTH(soGiayToTH));
                dispatch(setNgayCapTH(ngayCapTH));
                dispatch(setSoTien(soTien));
                dispatch(setNoiDung(noiDung));
                return false; // Không lỗi
            }
        }
    }, [soTien, tenTH, diaChiTH, giayToTH, soGiayToTH, ngayCapTH, noiDung])

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
                        {TaiKhoanNguon !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(TaiKhoanNguon.SoDu)}</span>}
                    </div>
                </div>
            </div>

            {/* Tên, địa chỉ người thụ hưởng, giấy tờ tùy thân, số, ngày cấp*/}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    {/* Tên người thụ hưởng */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center ">Tên người thụ hưởng</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyTenTH && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập tên người thụ hưởng</span>}
                        <input
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={tenTH}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                settenTH(newValue);
                                if (newValue.trim() !== '') {
                                    setIsShowEmptyTenTH(false);
                                } else {
                                    setIsShowEmptyTenTH(true);
                                }
                            }}
                            placeholder="Nhập tên người thụ hưởng"
                        />
                    </div>

                    {/* Địa chỉ người thụ hưởng */}
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl  self-center ">Địa chỉ người thụ hưởng</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyDiaChiTH && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập địa chỉ người thụ hưởng</span>}
                        <input
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={diaChiTH}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setdiaChiTH(newValue);
                                if (newValue.trim() !== '') {
                                    setIsShowEmptyDiaChiTH(false);
                                } else {
                                    setIsShowEmptyDiaChiTH(true);
                                }
                            }}
                            placeholder="Nhập địa chỉ người thụ hưởng"
                        />
                    </div>

                    {/* Giấy tờ tùy thân */}
                    <span className="col-start-1 row-start-3 text-[#A5ACAE] text-xl  self-center ">Giấy tờ tùy thân</span>
                    <div className="col-start-2 col-span-2">
                        <ConfirmationDropdown people={GiayTo} setSelectedValue={setgiayToTH}/>
                    </div>

                    {/* Số giấy tờ tùy thân */}
                    <span className="col-start-1 row-start-4 text-[#A5ACAE] text-xl  self-center ">Số</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptySoGiayToTH && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng nhập số giấy tờ tùy thân</span>}
                        <input type="number"
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soGiayToTH}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setsoGiayToTH(newValue);
                                if (newValue.trim() !== '') {
                                    setIsShowEmptySoGiayToTH(false);
                                } else {
                                    setIsShowEmptySoGiayToTH(true);
                                }
                            }}
                            placeholder="Nhập số giấy tờ tùy thân"
                        />
                    </div>

                    {/* Ngày cấp */}
                    <span className="col-start-1 row-start-5 text-[#A5ACAE] text-xl  self-center ">Nhập ngày cấp</span>
                    <div className="col-start-2 col-span-2">
                        {isShowEmptyNgayCapTH && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn ngày cấp</span>}
                        <input
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={ngayCapTH}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setngayCapTH(newValue);
                                if (newValue.trim() !== '') {
                                    setIsShowEmptyNgayCapTH(false);
                                } else {
                                    setIsShowEmptyNgayCapTH(true);
                                }
                            }}
                            placeholder="Nhập ngày cấp"
                            onFocus={() => setInputType("date")}
                            onBlur={() => setInputType("text")}
                            type={inputType}
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
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Quý khách vui lòng nhập đầy đủ thông tin.' />}
        </div>
    )
}

export default forwardRef(CashInitialization);
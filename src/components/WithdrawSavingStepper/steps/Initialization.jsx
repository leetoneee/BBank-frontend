import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import ListboxSaving from "../../Listbox/ListboxSaving";
import formatToVND from "../../../utils/formatToVND";
import PopupNotice from "../../Popup/PopupNotice";
import { useEffect, useState } from "react";
import { fetchAllAccountById } from "../../../redux/customer/customerSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setPhieuTietKiem } from "../../../redux/customer/listSaving/listSavingSlice";
import { withdrawSaving } from "../../../redux/customer/withdrawsavingSlice/withdrawsavingSlice";
import { } from '../../../redux/customer/withdrawsavingSlice/withdrawsavingSlice';

let chenhLech = '';

export function tinhChenhLechNgay(date1, date2) {
    const ngay1 = new Date(date1).getTime(); // Chuyển đổi ngày 1 sang đối tượng Date
    const ngay2 = new Date(date2).getTime(); // Chuyển đổi ngày 2 sang đối tượng Date

    // Tính toán chênh lệch thời gian (tính bằng mili-giây)
    const diff = (ngay2 - ngay1);

    // Chuyển đổi chênh lệch thời gian từ mili-giây sang ngày
    const ngayChenhLech = Math.floor(diff / (1000 * 60 * 60 * 24));
    // Trả về chuỗi kết quả
    return ngayChenhLech;
}

// export function tinhChenhLechNgay(date1, date2) {
//     const ngay1 = new Date(date1); // Chuyển đổi ngày 1 sang đối tượng Date
//     const ngay2 = new Date(date2); // Chuyển đổi ngày 2 sang đối tượng Date

//     // Tính toán chênh lệch thời gian (tính bằng mili-giây)
//     const diff = (ngay2 - ngay1);

//     // Chuyển đổi chênh lệch thời gian từ mili-giây sang ngày
//     const ngayChenhLech = new Date(diff);

//     // Lấy các thành phần của chênh lệch thời gian
//     const ngay = ngayChenhLech.getUTCDate() - 1;

//     // Trả về chuỗi kết quả
//     return ngay;
// }

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.userId);
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);
    const PhieuTietKiem = useSelector((state) => state.listSaving.PhieuTietKiem);

    const [isShowEmptyPhieuTietKiem, setIsShowEmptyPhieuTietKiem] = useState(false);
    const [isShowPopupNotice, setIsShowPopupNotice] = useState(false);

    const currentDate = new Date();
    const NgayHienTai = currentDate.toISOString();

    useEffect(() => {
        let raw = {
            "MaKhachHang": userId
        };

        dispatch(fetchAllAccountById(raw));
    }, []);

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyPhieuTietKiem(false);
                setIsShowPopupNotice(false);

                if (!PhieuTietKiem) {
                    setIsShowEmptyPhieuTietKiem(true);
                }

                if (chenhLech < 15) {
                    setIsShowPopupNotice(true);
                }

                if (!PhieuTietKiem || chenhLech < 15) {
                    return true; // Có lỗi
                }

                dispatch(setPhieuTietKiem(PhieuTietKiem));
                return false; // Không lỗi
            },

        }
    }, [PhieuTietKiem])

    const ngay1 = PhieuTietKiem.NgayMo;
    const ngay2 = NgayHienTai;

    chenhLech = tinhChenhLechNgay(ngay1, ngay2);
    console.log("Chênh lệch giữa hai ngày là:", chenhLech);

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

            {/* DS phiếu tiết kiệm và số tiền*/}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-2 gap-8">
                    {/* DS phiếu tiết kiệm */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Phiếu tiết kiệm</span>
                    <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Số tiền gốc gửi</span>
                    <div className="col-start-2 row-start-1 col-span-2 ">
                        {isShowEmptyPhieuTietKiem && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn kỳ hạn gửi</span>}
                        <ListboxSaving />
                    </div>
                    {/* Số dư */}
                    <div className="col-start-2 row-start-2 col-span-2 self-center">
                        {PhieuTietKiem !== "" && <span className="text-white font-[500] text-[18px] font-museo-slab-100  ">{formatToVND(PhieuTietKiem.SoTienGui)}</span>}
                    </div>
                </div>
            </div>
            {isShowPopupNotice &&
                <PopupNotice showPopup={isShowPopupNotice} setShowPopup={setIsShowPopupNotice} content='Phiếu tiết kiệm này chưa đủ 15 ngày kể từ ngày mở. Không thể thực hiện tất toán phiếu tiết kiệm.' />}
        </div>
    )
}
export { chenhLech };
export default forwardRef(Initialization);
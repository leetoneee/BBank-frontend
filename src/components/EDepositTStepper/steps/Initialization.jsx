import { useDispatch, useSelector } from "react-redux";
import DropdownListbox from "../../Listbox/Listbox";
import InterestDropdown from "../../Listbox/InterestDropdown";
import HinhThucSavingDropdown from "../../Listbox/HinhThucSavingDropdown";
import formatToVND from "../../../utils/formatToVND";
import { useEffect, useState } from "react";
import { getSavingType } from "../../../redux/getSavingType/savingTypeSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienGui as setSoTien, setTaiKhoanNguon } from "../../../redux/employee/depositSaving/employeeDepositSavingSlice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import { formatDateSaving } from "../../../utils/formatDateAndTime";


function Initialization(props, ref) {
    const dispatch = useDispatch();

    const KyHan = useSelector((state) => state.cDepositSaving.LoaiTietKiem);
    const TaiKhoanNguon = useSelector((state) => state.eDepositSaving.TaiKhoanNguon);
    const SoTien = useSelector((state) => state.eDepositSaving.SoTienGui);
    const PhuongThuc = useSelector((state) => state.cDepositSaving.PhuongThuc);
    const listAccounts = useSelector((state) => state.checkCccd.listAccounts)
    const NguoiDung = useSelector((state) => state.checkCccd.NguoiDung)

    const [soTienGui, setSoTienGui] = useState(SoTien);
    const [account, setAccount] = useState();
    const [isShowEmptyKyHan, setIsShowEmptyKyHan] = useState(false);
    const [isShowEmptySoTienGui, setIsShowEmptySoTienGui] = useState(false);
    const [option, setOption] = useState('');

    const date = new Date();

    const options = [
        { name: "Lãi nhập gốc" }
    ];

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyKyHan(false);
                setIsShowEmptySoTienGui(false);

                if (!KyHan) {
                    setIsShowEmptyKyHan(true);
                }

                if (!soTienGui) {
                    setIsShowEmptySoTienGui(true);
                }

                if (!soTienGui || !KyHan)
                    return true; // Có lỗi

                dispatch(setSoTien(soTienGui));
                return false; // Không lỗi
            }
        }
    }, [soTienGui, KyHan])

    const formatDate = (date) => {
        let newDate = new Date(date);
        return formatDateSaving(newDate);
    }

    let listAccountsObjects = [];

    if (listAccounts) {
        listAccountsObjects = listAccounts.map((account, index) => ({
            ...account,
            name: account.SoTaiKhoan
        }));
    }

    return (
        <div className="flex flex-col gap-7">
            {/* Thông tin khách hàng */}
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="flex flex-col gap-8">
                    {/* Họ tên */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center  ">
                            Tên người mở tài khoản tiết kiệm
                        </span>
                        <div className="col-start-2 col-span-2 text-red-600 self-center text-right flex flex-col ">
                            <span className="text-xl font-bold">{(NguoiDung.HoTen).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Địa chỉ */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Địa chỉ
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.DiaChi}
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            Căn cước công dân
                        </span>
                    </div>

                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Số CCCD */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Số giấy tờ tuỳ thân
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {NguoiDung.CCCD}
                        </span>
                    </div>


                    <div className="border-b-2 border-b-white h-[2px] w-full self-center"></div>

                    {/* Nghề nghiệp */}
                    <div className="grid grid-cols-2 grid-rows-1 gap-8">
                        <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">
                            Ngày mở phiếu tiết kiệm
                        </span>
                        <span className="col-start-2 col-span-2 text-white text-xl self-center text-right ">
                            {formatDate(date)}
                        </span>
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
                        <ConfirmationDropdown people={options} setSelectedValue={setOption} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Initialization);
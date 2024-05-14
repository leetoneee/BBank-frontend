import { useDispatch, useSelector } from "react-redux";
import uitPattern from '../../assets/icons/uitPattern.svg'
import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import { fetchAllAccountById } from "../../redux/customer/customerSlice";
import { LongTooltip } from "../../components/Tooltip/LongTooltip";
import { useNavigate } from 'react-router-dom';
import DropdownListbox from "../../components/Listbox/Listbox";
import InterestDropdown from "../../components/Listbox/InterestDropdown";
import HinhThucSavingDropdown from "../../components/Listbox/HinhThucSavingDropdown";
import formatToVND from "../../utils/formatToVND";
import { useEffect, useState } from "react";
import { getSavingType } from "../../redux/getSavingType/savingTypeSlice";
import { forwardRef, useImperativeHandle } from "react";
import { setSoTienGui as setSoTien } from "../../redux/customer/depositSaving/customerDepositSavingSlice";
import { checkAccountExist } from "../../redux/system/checkAccountExist/checkAccountExistSlice";
import PopupNotice from "../../components/Popup/PopupNotice";

function CancelAutoSaving(props, ref) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.userId);
    const PhieuTietKiem = useSelector((state) => state.listSaving.listAccounts);
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);

    const [isShowEmptyPhieuTietKiem, setIsShowEmptyPhieuTietKiem] = useState(false);

    useEffect(() => {
        let raw = {
            "MaKhachHang": userId
        };

        dispatch(fetchAllAccountById(raw));
    }, []);

    // useImperativeHandle(ref, () => {
    //     return {
    //         validateInputs() {
    //             setIsShowEmptyPhieuTietKiem(false);

    //             if (!PhieuTietKiem) {
    //                 setIsShowEmptyPhieuTietKiem(true);
    //                 return true;
    //             }

    //             return false; // Không lỗi
    //         }
    //     }
    // }, [PhieuTietKiem])

    const [buttonState, setButtonState] = useState(true);

    const changeButtonState = () => {
        if(buttonState)
        setButtonState(!buttonState);
    };

    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
        <div className="col-start-1 col-span-2 z-50">
            <UserInfo />
        </div>
        <div className="col-end-12 col-span-9 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30">
                <Header />
            </div>

            {/* article */}
            <div className="w-auto overflow-auto flex flex-col gap-4">
                <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center" />

                <div className="bg-[#26383C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen">
                    <div className="w-1/2 self-center ">
                        {/* Title */}
                        <div className="w-full">
                            <h1 className="mt-20 text-[40px]
                                    text-white font-bold  ">
                                Hủy tiết kiệm tự động
                            </h1>
                            <div className="2xl:mt-[23px] text-[20px]
                                    text-[#B0B5B6] flex flex-row">
                                <span onClick={() => navigate('../home')}
                                    className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                <p>&nbsp;&gt;&nbsp;</p>
                                <span onClick={() => navigate('../home/saving-group')}
                                    className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Tiết kiệm </span>
                                <p>&nbsp;&gt;&nbsp;</p>
                                <p className="text-[#72BF00] hover:cursor-auto"> Hủy tiết kiệm tự động </p>
                            </div>
                        </div>
                        <div className="2xl:mt-[40px] w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                            <div className="grid grid-cols-3 grid-rows-2 gap-8">
                                {/* Tài khoản nguồn */}
                                <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                                <span className="col-start-1 row-start-2 text-[#A5ACAE] text-xl self-center">Phiếu tiết kiệm</span>
                                <div className="col-start-2 row-start-1 col-span-2 ">
                                    <DropdownListbox />
                                </div>
                                {/* Chọn phiếu tiết kiệm */}
                                <div className="col-start-2 row-start-2 col-span-2 self-center">
                                {isShowEmptyPhieuTietKiem && <span className="absolute translate-y-[50px] text-[15px] text-red-600">Quý khách vui lòng chọn phương thức trả lãi</span>}
                                    <DropdownListbox />
                                </div>
                            </div>
                        </div>

                        {/* Nút tìm kiếm */}
                        <div className=" flex justify-center  mt-4 mb-8 ">
                            <button 
                                    className=" mt-8 text-2xl bg-gradient-to-r from-[#57B122] to-[#09812E] hover:from-[#09812E] hover:to-[#57B122] text-white py-2 px-14  rounded-[15px] font-bold cursor-pointer hover:bg-[#475255]/[60%] transition duration-200 ease-in-out">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    
                    {/* Thông tin phiếu tiết kiệm */}
                    <div className="w-3/5 bg-[#26383C] rounded-[10px] py-10 px-10 self-center">
                        <div className="flex flex-col gap-8">

                            {/* Tài khoản nguồn và nút select */}
                            <div className="grid grid-cols-2 grid-rows-1 gap-8">
                                <div className="col-start-1">
                                    <span className=" text-[#A5ACAE] text-xl  self-center  ">
                                        Tài khoản nguồn
                                    </span>
                                    <span className=" ml-10 text-white text-xl  self-center text-right ">
                                        {TaiKhoanNguon.SoTaiKhoan}
                                    </span>
                                </div>
                                <div className="col-start-2 justify-self-end">
                                    <span className=" text-[#A5ACAE] text-xl">
                                        Gia hạn tự động
                                    </span>
                                    <button onClick={changeButtonState} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:ml-[20px] 2xl:mt-[5px]
                                                    border-[1px] border-white rounded-[20px]  
                                                    ${buttonState ? ' bg-[#73C001] border-none' : ''}`}>
                                            <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                    border-white border-[1px] rounded-full
                                                    ${buttonState ? 'bg-white transform translate-x-4' : ''}`}>
                                            </div>
                                    </button>
                                </div>
                            </div>
                            
                            {/* article */}
                            <div className="grid grid-flow-col justify-stretch">
                                <span className=" text-[#A5ACAE] text-xl   ">
                                    Phiếu tiết kiệm
                                </span>
                                <span className=" text-[#A5ACAE] text-xl  ">
                                    Số dư gốc
                                </span>
                                <span className=" text-[#A5ACAE] text-xl justify-self-center ">
                                    Ngày gửi
                                </span>
                                <span className=" text-[#A5ACAE] text-xl justify-self-end ">
                                    Ngày đến hạn
                                </span>
                            </div>

                            {/* Infomation  */}
                            <div className="grid grid-flow-col justify-stretch">
                                <span className=" text-[#A5ACAE] text-xl   ">
                                    Phiếu tiết kiệm
                                </span>
                                <span className=" text-[#A5ACAE] text-xl  ">
                                    Số dư gốc
                                </span>
                                <span className=" text-[#A5ACAE] text-xl justify-self-center ">
                                    Ngày gửi
                                </span>
                                <span className=" text-[#A5ACAE] text-xl justify-self-end ">
                                    Ngày đến hạn
                                    {/* {(TaiKhoanDich.HoTen).toUpperCase()} */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    )
}

export default CancelAutoSaving;
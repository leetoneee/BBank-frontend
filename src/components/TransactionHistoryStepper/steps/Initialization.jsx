import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import PopupNotice from "../../Popup/PopupNotice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";
import DropdownListbox from "../../Listbox/Listbox";
import { setThoiGian, setStartDate as SetStartDate, setEndDate as SetEndDate, setTaiKhoanNguon } from "../../../redux/customer/getTransactionHistory/getTransactionHistorySlice";
import { getTransactionHistory } from "../../../redux/customer/getTransactionHistory/getTransactionHistorySlice";
function Initialization(props, ref) {
    const dispatch = useDispatch();

    //!
    const TaiKhoanNguon = useSelector((state) => state.transfer.TaiKhoanNguon);

    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10)); // set default value to today's date
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10)); // set default value to today's date


    const [option, setOption] = useState('');
    const options = [
        { id: 0, name: "7 ngày gần nhất", value: 7 },
        { id: 1, name: "30 ngày gần nhất", value: 30 },
        { id: 2, name: "Thời gian khác", value: '' }
    ];
    //!

    const [isShowPopup, setIsShowPopup] = useState(false);

    useEffect(() => {
        if (!option) {
            dispatch(setThoiGian(options[0]));
        }
        dispatch(setThoiGian(option))
    }, [option, setOption])

    useEffect(() => {
        dispatch(setTaiKhoanNguon(TaiKhoanNguon))
    }, [TaiKhoanNguon])

    //*


    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
    };

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value);
    };


    //*
    const createTransaction = () => {
        const raw = {
            "SoTaiKhoan": TaiKhoanNguon.SoTaiKhoan,
            "recent": option?.value,
            "startDate": startDate,
            "endDate": endDate
        };
        console.log("🚀 ~ createTransaction ~ raw:", raw)

        return dispatch(getTransactionHistory(raw));
    }

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowPopup(false)
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);

                if (option.id === 2 && (endDateObj < startDateObj || endDateObj - startDateObj > 30 * 24 * 60 * 60 * 1000)) {
                    // Show error message or warning
                    setIsShowPopup(true);
                    return true; // Có lỗi
                }
                dispatch(SetEndDate(endDate));
                dispatch(SetStartDate(startDate));
                return false; // Không lỗi
            },
            createTransaction
        }
    }, [startDate, endDate, option, TaiKhoanNguon])


    return (
        <div className="flex flex-col gap-7">
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 gap-8">
                    {/* Tài khoản nguồn */}
                    <span className="col-start-1 row-start-1 text-[#A5ACAE] text-xl  self-center  ">Tài khoản nguồn</span>
                    <div className="col-start-2 row-start-1 col-span-2 z-50">
                        <DropdownListbox />
                    </div>


                    {/* Giấy tờ tuỳ thân */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">
                        Thời gian
                    </span>

                    <div className="col-start-2 col-span-2">
                        <div className="flex flex-row-reverse  ">
                            <ConfirmationDropdown people={options} setSelectedValue={setOption} />
                            <span className=" text-red-500 text-3xl absolute translate-x-6 translate-y-3">*</span>
                        </div>
                    </div>

                    {/* Ngày bắt đầu */}
                    {option && option.id === 2 &&
                        <>
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">Ngày bắt đầu</span>
                            <input type="date"
                                className="col-start-2 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                value={startDate}
                                placeholder="dd-mm-yyyy"
                                onChange={handleChangeStartDate}
                            />
                        </>
                    }


                    {/* Ngày kết thuc */}
                    {option && option.id === 2 &&
                        <>
                            <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">Ngày kết thúc</span>
                            <input type="date"
                                className="col-start-2 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                                value={endDate}
                                placeholder="dd-mm-yyyy"
                                onChange={handleChangeEndDate}
                            />
                        </>
                    }

                </div>
            </div>

            {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Ngày bắt đầu phải sớm hơn ngày kết thúc và thời gian tìm kiếm giới hạn trong 30 ngày.' />}
        </div>
    )
}

export default forwardRef(Initialization);
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import PopupNotice from "../../Popup/PopupNotice";
import { setNgayDangKy, setHoTen as sethoten, setBirthday as setbirthday, setGioiTinh, setSoDT as setsdt, setCCCD as setcccd, setDiaChi as setdiachi, setNgheNghiep as setnghenghiep, setEmail as setemail } from "../../../redux/employee/createCustomerProfile/createCustomerProfileSlice";
import ConfirmationDropdown from "../../Listbox/XacThucDropdown";

function Initialization(props, ref) {
    const dispatch = useDispatch();

    const DoTuoiToiThieu = useSelector((state) => state.rules.DoTuoiToiThieu);
    //!
    const HoTen = useSelector((state) => state.createProfile.HoTen)
    const Birthday = useSelector((state) => state.createProfile.Birthday)
    const GioiTinh = useSelector((state) => state.createProfile.GioiTinh);
    const SoDT = useSelector((state) => state.createProfile.SoDT);
    const CCCD = useSelector((state) => state.createProfile.CCCD);
    const DiaChi = useSelector((state) => state.createProfile.DiaChi);
    const NgheNghiep = useSelector((state) => state.createProfile.NgheNghiep);
    const Email = useSelector((state) => state.createProfile.Email);
    const [isShowPopupTuoi, setIsShowPopupTuoi] = useState(false);

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // set default value to today's date
    const [hoTen, setHoTen] = useState(HoTen);
    const [birthday, setBirthday] = useState(() => {
        let date = new Date(Birthday);
        let formattedDate = date.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return Birthday ? formattedDate : '';
    });

    const [soDT, setSoDT] = useState(SoDT);
    const [option, setOption] = useState('');
    const [cccd, setCCCD] = useState(CCCD);
    const [diaChi, setDiaChi] = useState(DiaChi);
    const [ngheNghiep, setNgheNghiep] = useState(NgheNghiep)
    const [email, setEmail] = useState(Email)

    const [isShowEmptyTen, setIsShowEmptyTen] = useState(false);
    const [isShowEmptyBirthday, setIsShowEmptyBirthday] = useState(false);
    const [isShowEmptySDT, setIsShowEmptySDT] = useState(false);
    const [isShowEmptyCCCD, setIsShowEmptyCCCD] = useState(false);
    const [isShowEmptyDiaChi, setIsShowEmptyDiaChi] = useState(false);
    const [isShowEmptyNgheNghiep, setIsShowEmptyNgheNghiep] = useState(false);

    //!

    // const [isShowPopup, setIsShowPopup] = useState(false);

    useEffect(() => {
        let date = new Date();
        dispatch(setNgayDangKy(date.toLocaleString()))
    }, [])
    //*
    const handleChangeDate = (event) => {
        let date = new Date(event.target.value)
        dispatch(setNgayDangKy(date.toLocaleString()));
        setDate(event.target.value);
    };

    const handleChangeBirthday = (event) => {
        dispatch(setbirthday(event.target.value))
        setBirthday(event.target.value);
    };

    //*

    // const checkAccount = (soTK) => { //!checkCCCD unique
    //     let raw = {
    //         "SoTaiKhoan": soTK
    //     };

    //     dispatch(checkAccountExist(raw));
    //     console.log(isExist);
    // }

    useImperativeHandle(ref, () => {
        return {
            validateInputs() {
                setIsShowEmptyTen(false);
                setIsShowEmptyBirthday(false);
                setIsShowEmptySDT(false);
                setIsShowEmptyCCCD(false);
                setIsShowEmptyDiaChi(false);
                setIsShowEmptyNgheNghiep(false);
                setIsShowPopupTuoi(false);
                // setIsShowPopup(false);

                if (!hoTen) {
                    setIsShowEmptyTen(true);
                }

                if (!birthday) {
                    setIsShowEmptyBirthday(true);
                }

                if (!soDT) {
                    setIsShowEmptySDT(true);
                }

                if (!cccd) {
                    setIsShowEmptyCCCD(true);
                }

                if (!diaChi) {
                    setIsShowEmptyDiaChi(true);
                }

                if (!ngheNghiep) {
                    setIsShowEmptyNgheNghiep(true);
                }

                if (birthday && age < DoTuoiToiThieu){
                    setIsShowPopupTuoi(true);
                }

                if (!hoTen || !birthday || !soDT || !diaChi || !cccd || !ngheNghiep || age < DoTuoiToiThieu)
                    return true; // Có lỗi

                dispatch(sethoten(hoTen));
                dispatch(setsdt(soDT));
                dispatch(setcccd(cccd));
                dispatch(setdiachi(diaChi));
                dispatch(setnghenghiep(ngheNghiep));
                dispatch(setemail(email))
                return false; // Không lỗi
            }
        }
    }, [hoTen, birthday, soDT, diaChi, email, cccd])

    const handleRadioChange = (event) => {
        dispatch(setGioiTinh(event.target.value));
    };

    const options = [
        { name: "Căn cước công dân" }
    ];

    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        
        // Nếu tháng hiện tại nhỏ hơn tháng sinh hoặc tháng hiện tại bằng tháng sinh nhưng ngày hiện tại nhỏ hơn ngày sinh
        // thì tuổi giảm đi 1
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
    const age = calculateAge(birthday);
    console.log("🚀 ~ Initialization ~ age:", age)

    return (
        <div className="flex flex-col gap-7">
            <div className="w-full bg-[#26383C] rounded-[10px] py-10 px-10">
                <div className="grid grid-cols-3 grid-rows-10 gap-8">
                    {/* Ngày đăng ký */}
                    <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">Ngày đăng ký</span>
                    <input type="date"
                        className="col-start-2 col-span-2 rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                        value={date}
                        placeholder="dd-mm-yyyy"
                        onChange={handleChangeDate}
                    />

                    {/* Họ và tên */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Họ và tên</span>
                    <div className="col-start-2  col-span-2 ">
                        {isShowEmptyTen && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập họ tên khách hàng</span>}
                        <input type="text"
                            className="rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={hoTen}
                            onChange={(e) => setHoTen(e.target.value)}
                            placeholder="Nhập họ và tên khách hàng"
                            maxLength={100}
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Ngày sinh */}
                    <span className="col-start-1 text-[#A5ACAE] text-xl  self-center ">Ngày sinh</span>
                    <div className="col-start-2  col-span-2 ">
                        {isShowEmptyBirthday && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập ngày sinh khách hàng</span>}
                        <input type="text"
                            className="rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={birthday}
                            placeholder="Nhập ngày sinh khách hàng"
                            onFocus={(e) => e.target.type = 'date'}
                            onChange={handleChangeBirthday}
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Giới tính */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Giới tính</span>
                    <div className="col-start-2  self-center">
                        <input className="h-4 w-4 accent-[#73C001]" type="radio" name="gioi_tinh" value={'1'} checked={GioiTinh === '1'} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Nam</label>
                    </div>
                    <div className="col-start-3  self-center">
                        <input className="h-4 w-4 accent-[#73C001] " type="radio" name="gioi_tinh" value={'0'} checked={GioiTinh === '0'} onChange={handleRadioChange} />
                        <label className="pl-2 text-white text-[18px]" htmlFor="html">Nữ</label>
                        <span className=" text-red-500 text-3xl absolute translate-x-[158px] text-center">*</span>
                    </div>

                    {/* Số điện thoại */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Số điện thoại</span>

                    <div className="col-start-2 col-span-2">
                        {isShowEmptySDT && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập số điện thoại</span>}
                        <input type="number" min={2000}
                            className=" rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={soDT}
                            onChange={(e) => setSoDT(e.target.value)}
                            placeholder="Nhập số điện thoại khách hàng"
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Giấy tờ tuỳ thân */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Giấy tờ tuỳ thân</span>

                    <div className="col-start-2 col-span-2">
                        <div className="flex flex-row-reverse  ">
                            <ConfirmationDropdown people={options} setSelectedValue={setOption} />
                            <span className=" text-red-500 text-3xl absolute translate-x-6 translate-y-3">*</span>
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
                            placeholder="Nhập số giấy tờ tuỳ thân"
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Địa chỉ */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Địa chỉ</span>
                    <div className="col-start-2  col-span-2 ">
                        {isShowEmptyDiaChi && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập địa chỉ</span>}
                        <input type="text"
                            className="rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={diaChi}
                            onChange={(e) => setDiaChi(e.target.value)}
                            placeholder="Nhập địa chỉ khách hàng"
                            maxLength={100}
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Nghề nghiệp */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Nghề nghiệp</span>
                    <div className="col-start-2  col-span-2 ">
                        {isShowEmptyNgheNghiep && <span className="absolute translate-y-[50px] text-[15px] text-red-600"> Vui lòng nhập nghề nghiệp</span>}

                        <input type="text"
                            className="rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={ngheNghiep}
                            onChange={(e) => setNgheNghiep(e.target.value)}
                            placeholder="Nhập nghề nghiệp khách hàng"
                            maxLength={100}
                        />
                        <span className=" text-red-500 text-3xl absolute translate-x-3 translate-y-2">*</span>
                    </div>

                    {/* Email */}
                    <span className="col-start-1  text-[#A5ACAE] text-xl  self-center ">Email</span>
                    <div className="col-start-2  col-span-2 ">
                        <input type="email"
                            className="rounded-[5px] w-full text-xl py-2 pl-3 pr-10 text-[#7AC014] "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập Email khách hàng"
                            maxLength={100}
                        />
                    </div>
                </div>
            </div>

            {/* {isShowPopup &&
                <PopupNotice showPopup={isShowPopup} setShowPopup={setIsShowPopup} content='Tài khoản đích không tồn tại. Quý khách  vui lòng kiểm tra lại.' />} */}
            {isShowPopupTuoi &&
                <PopupNotice showPopup={isShowPopupTuoi} setShowPopup={setIsShowPopupTuoi} content= {`Độ tuổi tối thiểu để mở tài khoản là ${DoTuoiToiThieu}. Hiện tại, quý khách vẫn chưa đủ tuổi để mở tài khoản ngân hàng. Xin cảm ơn. `} />}
        </div>
    )
}

export default forwardRef(Initialization);
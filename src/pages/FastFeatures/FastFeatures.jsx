import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Carousel from '../../components/Carousel/Carousel';
import slide1 from '../../assets/icons/slide1.svg';
import slide2 from '../../assets/icons/slide2.svg';
import uitPattern from '../../assets/icons/uitPattern.svg'
import ChuyenTienBBank from '../../assets/icons/Choose_ChucNang_ChuyenTienBBank.svg'
import ChuyenTienMat from '../../assets/icons/Choose_ChucNang_ChuyenTienMat.svg'
import HuyTietKiemTuDong from '../../assets/icons/Choose_ChucNang_HuyTietKiemTuDong.svg'
import MoTietKiem from '../../assets/icons/Choose_ChucNang_MoTietKiem.svg'
import TatToanTietKiem from '../../assets/icons/Choose_ChucNang_TatToanTietKiem.svg'
import TietKiemTuDong from '../../assets/icons/Choose_ChucNang_TietKiemTuDong.svg'
// import readMoney from "../../utils/n2vi";
import { increment, decrement } from '../../redux/selectBtn/selectBtnSlice'
import PopupNotice from '../../components/Popup/PopupNotice'
import { useNavigate } from 'react-router-dom';
// import PopupConfirm from '../../components/Popup/PopupConfirm'

const FastFeatures = () => {
    const count = useSelector((state) => state.counter.value);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonStates, setButtonStates] = useState({
        button1: false,
        button2: false,
        button3: false,
        button4: false,
        button5: false,
        button6: false,
    });

    const changeButtonState = (buttonName) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [buttonName]: !prevState[buttonName], // Đảo ngược trạng thái của nút được click
        }));
    };

    const handleButtonSelect = (buttonName) => {
        if (buttonStates[buttonName]) {
            changeButtonState(buttonName);
            // Gửi action đến Redux store bằng cách dispatch action creator
            dispatch(decrement());
        }
        if (count < 3 && buttonStates[buttonName] == false) {
            changeButtonState(buttonName);
            dispatch(increment());
        }
        if (count === 3 && buttonStates[buttonName] == false) {
            setShowPopup(true);
        }
    };

    return (
        <>
            <div>
                <div className="grid grid-cols-11 grid-flow-col-dense">
                    <div className="col-start-1 col-span-2">
                        <UserInfo />
                    </div>
                    <div className="col-end-12 col-span-9 flex flex-col">
                        <div className="sticky top-0">
                            <Header />
                        </div>
                        <div className="relative w-full h-full flex flex-col justify-center content-center">
                            <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center" />
                            <div className="w-full h-full absolute grid grid-cols-2 bg-[#40494C] bg-opacity-70">

                                {/* Grid 1 */}
                                <div className="col-start-0 col-span-1 w-full overflow-y-auto no-scrollbar">
                                    <h1 className="2xl:mt-[100px] 2xl:text-[45px] 2xl:ml-[100px]
                                            text-white font-semibold  ">
                                        Lựa chọn chức năng nổi bật
                                    </h1>
                                    <div className="2xl:mt-[23px] 2xl:text-[20px] 2xl:ml-[100px]
                                            text-[#B0B5B6] flex flex-row">
                                        <span onClick={() => navigate('../home')}
                                            className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                        <p>&nbsp;&gt;&nbsp;</p>
                                        <span onClick={() => navigate('../setting')}
                                            className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"> Cài đặt </span>
                                        <p>&nbsp;&gt;&nbsp;</p>
                                        <p className="text-[#72BF00] hover:cursor-auto"> Lựa chọn chức năng nổi bật </p>
                                    </div>

                                    {/* Chuyển tiền */}
                                    <p className="2xl:mt-[203px] 2xl:ml-[100px] 2xl:text-[30px]
                                            text-white ">Chuyển tiền</p>
                                    <div className="2xl:my-[20px] 2xl:ml-[92px] 2xl:mr-[25px]
                                                bg-[#24373C] rounded-[20px] flex flex-col">

                                        {/* Chuyển tiền trong BBank */}
                                        <div className="2xl:my-[35px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Chuyển tiền trong BBank</p>
                                            <button onClick={() => handleButtonSelect('button1')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                        border-[1px] border-white rounded-[20px]
                                                        ${buttonStates['button1'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full 
                                                        ${buttonStates['button1'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Chuyển tiền mặt
                                        <div className="2xl:w-[95%] h-[0.25px] bg-[#879194] mx-[20px] mt-[14px]"></div>
                                        <div className="2xl:mt-[14px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Chuyển tiền mặt</p>
                                            <button onClick={() => handleButtonSelect('button2')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                        border-[1px] border-white rounded-[20px]
                                        ${buttonStates['button2'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full
                                            ${buttonStates['button2'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div> */}
                                    </div>

                                    {/* Tiết kiệm */}
                                    <p className="2xl:mt-[60px] 2xl:ml-[100px] 2xl:text-[30px]
                                            text-white ">Tiết kiệm</p>
                                    <div className="2xl:mt-[20px] 2xl:ml-[92px] 2xl:mr-[25px] 
                                                bg-[#24373C] rounded-[20px] flex flex-col">

                                        {/* Mở tiết kiệm */}
                                        <div className="2xl:mt-[35px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Mở tiết kiệm</p>
                                            <button onClick={() => handleButtonSelect('button3')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                        border-[1px] border-white rounded-[20px] 
                                                        ${buttonStates['button3'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full
                                                        ${buttonStates['button3'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Tất toán tiết kiệm */}
                                        <div className="2xl:w-[95%] h-[0.25px] bg-[#879194] mx-[20px] mt-[14px]"></div>
                                        <div className="2xl:mt-[14px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Tất toán tiết kiệm</p>
                                            <button onClick={() => handleButtonSelect('button4')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                        border-[1px] border-white rounded-[20px]
                                                        ${buttonStates['button4'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full
                                                        ${buttonStates['button4'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Tiết kiệm tự động
                                        <div className="2xl:w-[95%] h-[0.25px] bg-[#879194] mx-[20px] mt-[14px]"></div>
                                        <div className="2xl:mt-[14px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Tiết kiệm tự động</p>
                                            <button onClick={() => handleButtonSelect('button5')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                        border-[1px] border-white rounded-[20px]
                                                        ${buttonStates['button5'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full
                                                        ${buttonStates['button5'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div> */}

                                        {/* Hủy tiết kiệm tự động */}
                                        <div className="2xl:w-[95%] h-[0.25px] bg-[#879194] mx-[20px] mt-[14px]"></div>
                                        <div className="2xl:mt-[14px] 2xl:mb-[20px] 2xl:w-full flex flex-row justify-between">
                                            <p className="text-[25px] 2xl:ml-[20px] text-[#879194] font-medium">Hủy tiết kiệm tự động</p>
                                            <button onClick={() => handleButtonSelect('button6')} className={`2xl:w-[40px] 2xl:h-[25px] 2xl:mr-[20px] 2xl:mt-[5px]
                                                        border-[1px] border-white rounded-[20px]
                                                        ${buttonStates['button6'] ? ' bg-[#73C001] border-none' : ''}`}>
                                                <div className={`2xl:w-[16px] 2xl:h-[16px] 2xl:ml-[3px]
                                                        border-white border-[1px] rounded-full
                                                        ${buttonStates['button6'] ? 'bg-white transform translate-x-4' : ''}`}>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Grid 2 */}
                                {/* Chức năng đã chọn */}
                                <div className="col-end-0 col-span-1 w-full">
                                    <p className="2xl:mt-[425px] 2xl:ml-[25px] 2xl:text-[30px]
                                            text-white ">Chức năng đã chọn</p>
                                    <div className="2xl:mt-[20px] 2xl:ml-[25px] 2xl:mr-[103px] 2xl:h-[350px] 
                                                bg-[#24373C] rounded-[20px] flex flex-col">

                                        {/* Header */}
                                        <div className="grid grid-cols-2">
                                            <p className="2xl:text-[22px] 2xl:ml-[39px] 2xl:mt-[37px] 2xl:mb-[23px] text-[#879194]">{count}/3 chức năng</p>
                                            <div className="col-end-0 col-span-1 flex flex-row">
                                                <button className="2xl:w-[117px] 2xl:h-[30px] 2xl:ml-[50px] 2xl:mt-[34px] 2xl:text-[15px]
                                                            text-white font-bold  bg-[#48585B] rounded-[10px]
                                                            hover:bg-[#778284]"> Khôi phục
                                                </button>
                                                <button className="2xl:w-[66px] 2xl:h-[30px] 2xl:ml-[40px] 2xl:mt-[34px] 2xl:text-[15px]
                                                            text-white font-bold bg-gradient-to-r from-[#52AE23] via-[#349C28] to-[#0F852E] rounded-[10px]
                                                            hover:from-[#349C28] hover:to-[#0F852E]">Lưu
                                                </button>
                                            </div>
                                        </div>

                                        <div className="2xl:w-full h-[1px] bg-[#879194]"></div>

                                        {/* Icons */}
                                        <div className='mt-[27px] flex flex-row'>
                                            {buttonStates['button1'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[77px] 2xl:h-[104px] 2xl:ml-[40px]'
                                                        src={ChuyenTienBBank}
                                                        alt="Chuyển tiền BBank" />
                                                    <button onClick={() => handleButtonSelect('button1')} className='absolute top-0 right-0 rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                            {buttonStates['button2'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[111px] 2xl:h-[101px] 2xl:ml-[40px]'
                                                        src={ChuyenTienMat}
                                                        alt="Chuyển tiền mặt" />
                                                    <button onClick={() => handleButtonSelect('button2')} className='absolute top-0 right-[11px] rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                            {buttonStates['button3'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[104px] 2xl:h-[101px] 2xl:ml-[35px]'
                                                        src={MoTietKiem}
                                                        alt="Mở tiết kiệm" />
                                                    <button onClick={() => handleButtonSelect('button3')} className='absolute top-0 right-[11px] rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                            {buttonStates['button4'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[87px] 2xl:h-[112px] 2xl:ml-[45px]'
                                                        src={TatToanTietKiem}
                                                        alt="Tất toán tiết kiệm" />
                                                    <button onClick={() => handleButtonSelect('button4')} className='absolute top-0 right-[0px] rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                            {buttonStates['button5'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[81px] 2xl:h-[111px] 2xl:ml-[50px]'
                                                        src={TietKiemTuDong}
                                                        alt="Tiết kiệm tự động" />
                                                    <button onClick={() => handleButtonSelect('button5')} className='absolute top-0 right-[0px] rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                            {buttonStates['button6'] && (
                                                <div className='relative'>
                                                    <img className='2xl:w-[108px] 2xl:h-[112px] 2xl:ml-[40px]'
                                                        src={HuyTietKiemTuDong}
                                                        alt="Hủy tiết kiệm tự động" />
                                                    <button onClick={() => handleButtonSelect('button6')} className='absolute top-0 right-[8px] rounded-full w-[27px] h-[27px]' />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {showPopup && <PopupNotice showPopup={showPopup} setShowPopup={setShowPopup} content='Số lượng chức năng yêu thích không vượt quá 3. Vui lòng chọn chức năng Quý khách yêu thích nhất và bỏ chọn các chức năng còn lại' />}
        </>

    )
}

export default FastFeatures;
import React, { useEffect, useState } from "react";
import logo from '../../assets/icons/logo.svg';
import avatar from '../../assets/icons/avatar.svg';
import phone from '../../assets/icons/phone.svg';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAccount } from "../../redux/user/userSlice";
import formatToVND from "../../utils/formatToVND";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lastLoginTime = useSelector((state) => state.auth.lastLoginTime);
    const listAccounts = useSelector((state) => state.customer.listAccounts);
    const currentAccount = useSelector((state) => state.user.currentAccount);
    const ten = useSelector((state) => state.user.ten);
    const [showBalance, setShowBalance] = useState(false);

    useEffect(() => {
        dispatch(setCurrentAccount(listAccounts[0]));
    }, [])

    return (
        <div className="sticky top-0 bg-[#404040]/[70%] px-7 py-9 w-auto min-h-screen max-h-max min-w-full
                            grid grid-flow-row auto-rows-max place-items-center gap-4">
            {/* Logo */}
            <div className="flex items-center mb-[22px]">
                <img src={logo} alt="" className="w-[72px] mr-2" />
                <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[50px] select-none mr-7 font-museo-slab-500">BBANK</span>
            </div>

            {/* User Infomation */}
            <div className="w-full flex flex-col text-center rounded-[20px] bg-gradient-to-b from-[#2C4044]/[50%] to-[#2C4044]">
                <img src={avatar} alt="" className="h-16 mt-4" />
                <span className="text-white mt-2 select-none">Xin chào</span>
                <span className="text-white mt-[2px] font-bold text-lg select-none">{ten.toUpperCase()}</span>
                <span className="text-white mt-6 text-[10px] select-none  ">Lần đăng nhập gần nhất</span>
                <span className="text-white mb-[19px] text-[10px] select-none">{lastLoginTime}</span>
            </div>

            {/* Balance */}
            <div className="w-full flex flex-col px-5 pt-5 rounded-[20px] bg-gradient-to-b from-[#2C4044]/[50%] to-[#2C4044]">
                <div className="flex flex-row justify-between">
                    <span className="text-white mt-2 text-[13px] font-bold">Danh sách tài khoản/thẻ</span>
                    <span className="text-[#72BF00] mt-2 text-[14px] font-normal hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Chi tiết</span>
                </div>
                <span className="text-white mt-[18px] text-[13px] font-normal">Tài khoản thanh toán</span>
                <div className="flex flex-row justify-between">
                    <span className="text-white mt-[5px] text-[17px] font-bold">{!currentAccount ? "" : currentAccount.SoTaiKhoan}</span>
                    <div className="text-[#62A110] hover:bg-[#62A110] hover:text-white bg-[#4E5E62] rounded-full p-[2px] self-center"
                        onClick={() => navigate('/user/home/account/transaction-history')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>

                <span className="text-white mt-[23px] text-[13px] font-normal">Số dư</span>
                {
                    showBalance ?
                        (
                            <div className="flex flex-row mb-3">
                                <div className="text-white hover:text-[#62A110] bg-[#4E5E62] p-1 rounded-full" onClick={() => setShowBalance(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-current">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-white ml-2 self-center ">{!currentAccount ? "" : formatToVND(currentAccount.SoDu)}</span>
                            </div>
                        )
                        : (
                            <div className="flex flex-row mb-3">
                                <div className="text-white hover:text-[#62A110] bg-[#4E5E62] p-1 rounded-full" onClick={() => setShowBalance(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-current">
                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>
                                </div>
                                <span className="text-white ml-2 self-center">********</span>
                            </div>
                        )
                }
            </div>

            {/* Contact */}
            <div className="w-full flex flex-row text-center rounded-[20px] bg-gradient-to-b from-[#2C4044]/[50%] to-[#2C4044] py-6 pl-5 hover:bg-gradient-to-t hover:from-[#2C4044]/[50%] hover:to-[#2C4044]">
                <img src={phone} alt="" className="h-10 mr-3" />
                <div className="flex flex-col text-left  ">
                    <span className="text-[#C3C8CA] text-sm  select-none">Dịch vụ khách hàng 24/7</span>
                    <span className="text-[#72BF00] text-xl select-auto ">999-999-999</span>
                </div>
            </div>

            {/* Feature */}
            <div className="w-full flex flex-col space-y-6 text-center rounded-[20px] bg-gradient-to-b from-[#2C4044]/[50%] to-[#2C4044] py-6 px-5 hover:bg-gradient-to-t hover:from-[#2C4044]/[50%] hover:to-[#2C4044]">
                <div className="flex flex-row justify-between text-left text-white hover:text-[#A1A9AC] ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>
                    <span className="text-white text-xl select-auto self-center">Tính lãi tiết kiệm</span>
                    <div className="text-[#62A110] hover:bg-[#62A110] hover:text-white bg-[#4E5E62] rounded-full p-[2px] self-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-row justify-between text-left text-white hover:text-[#A1A9AC]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    <span className="text-white text-xl select-auto self-center">Tính lịch trả nợ</span>
                    <div className="text-[#62A110] hover:bg-[#62A110] hover:text-white bg-[#4E5E62] rounded-full p-[2px] self-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default React.memo(UserInfo);
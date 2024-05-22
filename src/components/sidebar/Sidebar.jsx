import homeIcon from '../../assets/icons/homeIcon.svg';
import settingIcon from '../../assets/icons/settingIcon.svg';
import contactIcon from '../../assets/icons/contactIcon.svg'
import tienichIcon from '../../assets/icons/tienichIcon.svg';
import exitIcon from '../../assets/icons/exitIcon.svg';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '../Tooltip/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAuth } from '../../redux/authentication/authSlice';
import { logout } from '../../redux/authentication/logoutSlice';
import PopupConfirm from '../Popup/PopupConfirm';
import { useState } from 'react';
import { reset as resetUser } from '../../redux/user/userSlice';
import { reset as resetCustomer } from '../../redux/customer/customerSlice';
import { reset as resetTransfer } from '../../redux/customer/transfer/transferSlice';

const navigation = [
    { name: 'Home', href: 'home', icon: homeIcon, tooltip: 'Trang chủ', current: true },
    { name: 'Utilities', href: 'utilities', icon: tienichIcon, tooltip: 'Tiện ích', current: false },
    { name: 'Setting', href: 'setting', icon: settingIcon, tooltip: 'Cài đặt', current: false },
    { name: 'Contact', href: 'contact', icon: contactIcon, tooltip: 'Liên hệ', current: false },
    // { name: 'Exit', href: '/login', icon: exitIcon, tooltip: 'Thoát', current: false },
]

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activeLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] w-16 h-16 p-4 hover:bg-[#83C46C] bg-[#00381A] group relative flex justify-center';
    const normalLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] w-16 h-16 p-4 hover:bg-[#83C46C] group relative flex justify-center';

    const [isShowPopup, setIsShowPopup] = useState(false);

    const handleLogout = () => {
        dispatch(resetUser());
        dispatch(resetCustomer());
        dispatch(resetTransfer());
        dispatch(logoutAuth());
        dispatch(logout());
        navigate('/login', { replace: true });
    }


    return (
        <div>
            <div className='sticky top-0 flex flex-row'>
                <div className="flex flex-col items-center justify-between px-2 h-screen py-8 space-y-8 bg-gradient-to-b from-[#404040]/[50%] to-[#CDE1DF]">
                    <div className="flex flex-col items-center space-y-4">
                        {
                            navigation.slice(0, 3).map((item, index) => {
                                return (
                                    <Tooltip key={index} position="top" content={item.tooltip}>
                                        <NavLink to={item.href}
                                            className={({ isActive }) => isActive ? activeLink : normalLink}>
                                            <img src={item.icon} alt="" />
                                        </NavLink>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>


                    <div className="flex flex-col items-center space-y-4">
                        {
                            navigation.slice(3, 4).map((item, index) => {
                                return (
                                    <Tooltip key={index} position='top' content={item.tooltip}>
                                        <NavLink to={item.href}
                                            className={({ isActive }) => isActive ? activeLink : normalLink}>
                                            <img src={item.icon} alt="" />
                                        </NavLink>
                                    </Tooltip>
                                )
                            })
                        }
                        <Tooltip position='top' content='Thoát'>
                            <button className={normalLink} onClick={() => setIsShowPopup(true)}>
                                <img src={exitIcon} alt="" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div >
            {isShowPopup &&
                <PopupConfirm showPopup={isShowPopup} setShowPopup={setIsShowPopup} handleClickComfirm={handleLogout} content='Bạn có chắc chắn muốn thoát khỏi trang này không?' />}
        </div >
    )
}

export default Sidebar;
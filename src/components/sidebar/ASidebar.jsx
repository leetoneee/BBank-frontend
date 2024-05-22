import React, { useState } from 'react'
import { classNames } from '../classNames/classNames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'
import logo from '../../assets/icons/logo.svg';
import { reset as resetUser } from '../../redux/user/userSlice';
import { reset as resetCustomer } from '../../redux/customer/customerSlice';
import { reset as resetTransfer } from '../../redux/customer/transfer/transferSlice';
import { logout } from '../../redux/authentication/logoutSlice'
import { useDispatch } from 'react-redux';
import PopupConfirm from '../Popup/PopupConfirm';

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



export default function ASidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isShowPopup, setIsShowPopup] = useState(false);

    const handleLogout = () => {
        dispatch(resetUser());
        dispatch(resetCustomer());
        dispatch(resetTransfer());
        dispatch(logout());
        navigate('/login', { replace: true });
    }

    return (
        <div className="bg-neutral-900 w-64 p-3 flex flex-col justify-centern sticky left-0 top-0 z-30">
            {/* Logo */}
            <div className="flex items-center self-center ">
                <img src={logo} alt="" className="w-[44px] mr-2" />
                <span className="bg-gradient-to-r from-[#9747FF] via-[#6493F0] to-[#31E1E1] inline-block text-transparent bg-clip-text text-[32px] select-none mr-7 font-museo-slab-500">BBANK</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={() => setIsShowPopup(true)}>
                    <span className="text-3xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
            {isShowPopup &&
                <PopupConfirm showPopup={isShowPopup} setShowPopup={setIsShowPopup} handleClickComfirm={handleLogout} content='Bạn có chắc chắn muốn thoát khỏi trang này không?' />}
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className="text-3xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}
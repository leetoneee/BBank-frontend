import homeIcon from '../../assets/icons/homeIcon.svg';
import settingIcon from '../../assets/icons/settingIcon.svg';
import contactIcon from '../../assets/icons/contactIcon.svg'
import tienichIcon from '../../assets/icons/tienichIcon.svg';
import exitIcon from '../../assets/icons/exitIcon.svg';
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Home', href: '/', icon: homeIcon, tooltip: 'Trang chủ', current: true },
    { name: 'Utilities', href: '/utilities', icon: settingIcon, tooltip: 'Tiện ích', current: false },
    { name: 'Setting', href: '/setting', icon: tienichIcon, tooltip: 'Cài đặt', current: false },
    { name: 'Contact', href: '/contact', icon: contactIcon, tooltip: 'Liên hệ', current: false },
    { name: 'Exit', href: '/login', icon: exitIcon, tooltip: 'Thoát', current: false },
]

const Sidebar = () => {

    const activeLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] hover:bg-[#83C46C] bg-[#00381A] group relative';
    const normalLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] hover:bg-[#83C46C] group relative';
    function handleLogout() {
        if (window.confirm('Are you sure you want to log out?')) {

            alert('You have been logged out');

            history.push('/login');
        }
    }


    return (
        <div className='flex flex-row fixed'>
            <div className="flex flex-col items-center justify-between w-20 h-screen py-8 space-y-8 bg-gradient-to-b from-[#404040] to-[#CDE1DF]">
                <div className="flex flex-col items-center space-y-4">
                    {
                        navigation.slice(0, 3).map((item, index) => {
                            return (
                                <NavLink key={index} to={item.href}
                                    className={({ isActive }) => isActive ? activeLink : normalLink}>
                                    <div className="absolute bottom-[30%] left-[calc(100%+4rem)] -translate-x-[50%] hidden group-hover:block w-auto">
                                        <svg class="absolute bottom-[calc(30%-4px)] left-[calc(-50%-0.4rem)] h-4 w-full text-[#767676]" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                                            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" transform="rotate(90 127.5 127.5)" />
                                        </svg>
                                        <div className="bottom-full right-0 rounded bg-[#767676] px-4 py-1 text-xs text-white whitespace-nowrap">
                                            {item.tooltip}
                                        </div>
                                    </div>
                                    <img src={item.icon} alt="" />
                                </NavLink>
                            )
                        })
                    }
                </div>


                <div className="flex flex-col items-center space-y-4">
                    {
                        navigation.slice(3, 5).map((item, index) => {
                            return (
                                <NavLink key={index} to={item.href} onClick={index === 1 ? handleLogout : null}
                                    className={({ isActive }) => isActive ? activeLink : normalLink}>
                                    <div className="absolute bottom-[30%] left-[calc(100%+4rem)] -translate-x-[50%] hidden group-hover:block w-auto">
                                        <svg class="absolute bottom-[calc(30%-4px)] left-[calc(-50%-0.4rem)] h-4 w-full text-[#767676]" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                                            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" transform="rotate(90 127.5 127.5)" />
                                        </svg>
                                        <div className="bottom-full right-0 rounded bg-[#767676] px-4 py-1 text-xs text-white whitespace-nowrap">
                                            {item.tooltip}
                                        </div>
                                    </div>
                                    <img src={item.icon} alt="" />
                                </NavLink>

                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Sidebar;
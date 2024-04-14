import homeIcon from '../../assets/icons/homeIcon.svg';
import settingIcon from '../../assets/icons/settingIcon.svg';
import contactIcon from '../../assets/icons/contactIcon.svg'
import tienichIcon from '../../assets/icons/tienichIcon.svg';
import exitIcon from '../../assets/icons/exitIcon.svg';
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Home', href: '/', icon: homeIcon, current: true },
    { name: 'Utilities', href: '/utilities', icon: settingIcon, current: false },
    { name: 'Setting', href: '/setting', icon: tienichIcon, current: false },
    { name: 'Contact', href: '/contact', icon: contactIcon, current: false },
    { name: 'Exit', href: '/login', icon: exitIcon, current: false },
]

const Sidebar = () => {

    const activeLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] hover:bg-[#83C46C] bg-[#00381A]';
    const normalLink = 'drop-shadow-lg transition-colors duration-200 rounded-[20px] hover:bg-[#83C46C]';
    function handleLogout() {
        if (window.confirm('Are you sure you want to log out?')) {

            alert('You have been logged out');

            history.push('/login');
        }
    }

    return (
        <div className='flex flex-row'>
            <div className="flex flex-col items-center justify-between w-20 h-screen py-8 space-y-8 bg-gradient-to-b from-[#404040] to-[#CDE1DF]">
                <div className="flex flex-col items-center space-y-4">
                    {
                        navigation.slice(0, 3).map((item, index) => {
                            return (
                                <NavLink key={index} to={item.href}
                                    className={({ isActive }) => isActive ? activeLink : normalLink}>
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
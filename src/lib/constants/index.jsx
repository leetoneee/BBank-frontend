import {
    HiOutlineViewGrid,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { FaUserTie } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'employees',
        label: 'Employees',
        path: '/employees',
        icon: <FaUserTie />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'accounts',
        label: 'Accounts',
        path: '/accounts',
        icon: <MdAccountBalance />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <FaMoneyBillTransfer />
    },
    {
        key: 'rules',
        label: 'Rules',
        path: '/rules',
        icon: <HiOutlineDocumentText />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
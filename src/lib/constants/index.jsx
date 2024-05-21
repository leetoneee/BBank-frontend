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
        path: 'dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'accounts',
        label: 'Accounts',
        path: 'accounts',
        icon: <MdAccountBalance />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: 'transactions',
        icon: <FaMoneyBillTransfer />
    },
    {
        key: 'rules',
        label: 'Rules',
        path: 'rules',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'Chức năng',
        label: 'Chức năng',
        path: 'features',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'Phân quyền',
        label: 'Phân quyền',
        path: 'roles',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'Nhóm người dùng',
        label: 'Nhóm người dùng',
        path: 'group-user',
        icon: <HiOutlineDocumentText />
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'support',
        label: 'Help & Support',
        path: 'support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
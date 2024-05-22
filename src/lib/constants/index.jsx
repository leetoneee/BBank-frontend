import {
    HiOutlineViewGrid,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { MdAccountBalance, MdOutlineFeaturedPlayList, MdOutlineSavings } from "react-icons/md";
import { FaMoneyBillTransfer, FaUsers } from "react-icons/fa6";
import { TiFlowParallel } from "react-icons/ti";
import { VscSourceControl, VscGroupByRefType  } from "react-icons/vsc";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: 'dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'users',
        label: 'Người dùng',
        path: 'users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'accounts',
        label: 'Tài khoản',
        path: 'accounts',
        icon: <MdAccountBalance />
    },
    {
        key: 'savings',
        label: 'Phiếu tiết kiệm',
        path: 'savings',
        icon: <MdOutlineSavings />
    },
    {
        key: 'saving-types',
        label: 'Loại tiết kiệm',
        path: 'saving-types',
        icon: <VscGroupByRefType />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: 'transactions',
        icon: <FaMoneyBillTransfer />
    },
    {
        key: 'rules',
        label: 'Tham số',
        path: 'rules',
        icon: <TiFlowParallel />
    },
    {
        key: 'Chức năng',
        label: 'Chức năng',
        path: 'features',
        icon: <MdOutlineFeaturedPlayList />
    },
    {
        key: 'Phân quyền',
        label: 'Phân quyền',
        path: 'roles',
        icon: <VscSourceControl />
    },
    {
        key: 'Nhóm người dùng',
        label: 'Nhóm người dùng',
        path: 'group-user',
        icon: <FaUsers />
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
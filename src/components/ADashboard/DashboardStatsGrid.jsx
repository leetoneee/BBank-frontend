import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { MdAccountCircle } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineAccountBalance } from "react-icons/md";
import axios from '../../services/axios'

export default function DashboardStatsGrid() {
    const [result, setResult] = useState();

    useEffect(() => {
        axios.get('/dashboard/statistic')
            .then(res => {
                setResult(res.data.result)
            })
    }, []);

    return (
        <div className="flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-20 w-20 flex items-center justify-center bg-sky-500">
                    <MdAccountCircle className="text-4xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-4xl text-gray-500 font-light">Tổng số người dùng</span>
                    <div className="flex items-center">
                        <strong className="text-6xl text-gray-700 font-semibold">{result?.NguoiDung?.SoLuong}</strong>
                        <span className="text-3xl text-green-500 pl-2">+{result?.NguoiDung?.Moi}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-20 w-20 flex items-center justify-center bg-orange-600">
                    <FaMoneyBillTransfer className="text-4xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-4xl text-gray-500 font-light">Tổng số giao dịch</span>
                    <div className="flex items-center">
                        <strong className="text-6xl text-gray-700 font-semibold">{result?.GiaoDich?.SoLuong}</strong>
                        <span className="text-3xl text-green-500 pl-2">+{result?.GiaoDich?.Moi}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-20 w-20 flex items-center justify-center bg-yellow-400">
                    <MdOutlineAccountBalance className="text-4xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-4xl text-gray-500 font-light">Tổng số tài khoản</span>
                    <div className="flex items-center">
                        <strong className="text-6xl text-gray-700 font-semibold">{result?.TaiKhoan?.SoLuong}</strong>
                        <span className="text-3xl text-green-500 pl-2">+{result?.GiaoDich?.Moi}</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-300 flex items-center">{children}</div>
}
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { setYear } from '../../redux/admin/savingRevenue/getSavingRevenueSlice'
import { useSelector, useDispatch } from 'react-redux'
import ConfirmationDropdown from '../Listbox/XacThucDropdown'
import { getSavingRevenue } from '../../redux/admin/savingRevenue/getSavingRevenueSlice'
import formatToVND from '../../utils/formatToVND'

export default function StatisticChart() {
    const dispatch = useDispatch();

    const year = useSelector((state) => state.savingRevenue.year);
    const revenueByMonth = useSelector((state) => state.savingRevenue.revenueByMonth);
    const isSuccess = useSelector((state) => state.savingRevenue.isSuccess);

    const [option, setOption] = useState('');
    const [formattedData, setFormattedData] = useState('');

    const start = 2017;

    const options = Array.from({ length: new Date().getFullYear() - start + 1 }, (_, i) => {
        return { name: new Date().getFullYear() - i }
    })

    useEffect(() => {
        if (!option) {
            dispatch(setYear(options[0]));
        }
        dispatch(setYear(option?.name))
    }, [option, setOption])

    useEffect(() => {
        dispatch(getSavingRevenue(year))
    }, [year])


    useEffect(() => {
        let formatted = null;

        if (revenueByMonth) {
            formatted = revenueByMonth.map((item) => ({
                ...item,
                month: `Tháng ${item.Thang}`,
            }));
        }

        setFormattedData(formatted);

    }, [revenueByMonth])


    return (
        <div className=" h-[40rem] bg-white p-4 rounded-sm border border-gray-300 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold self-center text-4xl ">DOANH THU TIẾT KIỆM</strong>
            <div className='absolute w-36  -right-0 -translate-x-5 -translate-y-[25px]    '>
                <ConfirmationDropdown people={options} setSelectedValue={setOption} />
            </div>
            <div className="mt-28  w-full flex-1 text-xl">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={formattedData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 50,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={CustomTooltip} />
                        <Legend />
                        <Bar dataKey="TongThu" fill="#0ea5e9" />
                        <Bar dataKey="TongChi" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const transactionAmount = payload[0].payload.transactionAmount;
        const Thu = payload[0].payload.TongThu;
        const Chi = payload[0].payload.TongChi;

        return (
            <div className='p-4 bg-white flex flex-col gap-4 rounded-md'>
                <p className='text-medium text-xl'>{label}</p>
                <p className='text-base text-[#0ea5e9] '>
                    Tổng thu: {formatToVND(Thu)}
                </p>
                <p className='text-base text-[#ea580c] '>
                    Tổng chi: {formatToVND(Chi)}
                </p>
            </div>
        )
    }
}
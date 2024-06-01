'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush,
} from 'recharts';
import { formatDateSaving } from '../../utils/formatDateAndTime';
import { formatToMoney } from '../../utils/formatToVND';
import { classNames } from '../classNames/classNames';

function TransHisChart({ data }) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart width={500} height={400} data={data} margin={{ right: 30, left: 30 }}>
                <YAxis tick={{ stroke: 'white', strokeWidth: 1 }} />
                <XAxis dataKey="date" tick={{ stroke: 'white' }} tickSize='4' />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip content={CustomTooltip} />
                <Brush travellerWidth={5} />
                <Line
                    type='monotone'
                    dataKey='moneyAfterTransaction'
                    stroke='#02FEFA'
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const transactionAmount = payload[0].payload.transactionAmount;
        const time = payload[0].payload.time;
        const bienDong = payload[0].payload.bienDong;
        const date = payload[0].payload.ThoiGian;

        return (
            <div className='p-4 bg-white flex flex-col gap-4 rounded-md'>
                <p className='text-medium text-xl'>{formatDateSaving(date)}</p>
                <p className='text-base text-blue-500 '>
                    Lúc: {time}
                </p>
                <p className={classNames('text-base', bienDong === '+' ? 'text-[#71BD00]' : 'text-red-500')}>
                    Biến động: {bienDong + formatToMoney(transactionAmount)}
                </p>
                <p className='text-base text-blue-500 '>
                    Số dư:
                    <span className='ml-2'>{formatToMoney(payload[0].value)}</span>
                </p>
            </div>
        )
    }
}

export default TransHisChart;
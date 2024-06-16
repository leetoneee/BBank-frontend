import React from 'react'
import DashboardStatsGrid from '../../components/ADashboard/DashboardStatsGrid'
import StatisticChart from '../../components/ADashboard/StatisticChart'
import { socket } from '../../services/socket';
import { useSelector } from 'react-redux';
function ADashboard() {
    const maNhom = useSelector((state) => state.user.maNhom);

    useEffect(() => {
        socket.emit('join-room', 1);
    }, [socket])

    return (
        <div className="flex flex-col gap-4 mt-4">
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full  self-center">
                <StatisticChart />
                {/* <BuyerProfilePieChart /> */}
            </div>
            <div className="flex flex-row gap-4 w-full">
                {/* <RecentOrders /> */}
                {/* <PopularProducts /> */}
            </div>
        </div>)
}

export default ADashboard
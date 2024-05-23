import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ECustomerGroup from '../pages/ECustomerGroup/ECustomerGroup'
import EProfileCustomer from '../pages/EProfileCustomer/EProfileCustomer'
import EHome from '../pages/EHome/EHome'
import EAccountCustomer from '../pages/EAccountCustomer/EAccountCustomer'
import EServiceGroup from '../pages/EServiceGroup/EServiceGroup'
import EDepositSaving from '../pages/EDepositSaving/EDepositSaving'
import EDepositSavingT from '../pages/EDepositSavingT/EDepositSavingT'
import EDepositAccount from '../pages/EDepositAccount/EDepositAccount'
import EWithdrawAccount from '../pages/EWithdrawAccount/EWithdrawAccount'
import EWithdrawSaving from '../pages/EWithdrawSaving/EWithdrawSaving'
import ESavingDate from '../pages/ESavingDate/ESavingDate'
import EStatisticGroup from '../pages/EStatisticGroup/EStatisticGroup'
import CalcInterest from '../pages/CalcInterest/CalcInterest'
import EStatement from '../pages/EStatement/EStatement'

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<EHome />} />
            <Route path='home/customer-group' element={<ECustomerGroup />} />
            <Route path='home/customer-group/profile' element={<EProfileCustomer />} />
            <Route path='home/customer-group/account' element={<EAccountCustomer />} />
            <Route path='home/service-group' element={<EServiceGroup />} />
            <Route path='home/service-group/deposit-account' element={<EDepositAccount />} />
            <Route path='home/service-group/withdraw-account' element={<EWithdrawAccount />} />
            <Route path='home/service-group/deposit-saving' element={<EDepositSaving />} />
            <Route path='home/service-group/deposit-saving-traditional' element={<EDepositSavingT />} />
            <Route path='home/service-group/withdraw-saving' element={<EWithdrawSaving />} />

            <Route path='home/statistic-group' element={<EStatisticGroup />} />
            <Route path='home/statistic-group/saving-date' element={<ESavingDate />} />
            <Route path='home/statistic-group' element={<EStatisticGroup />} />
            <Route path='home/calc-interest' element={<CalcInterest />} />
            <Route path='home/statistic-group/statement' element={<EStatement />} />
        </Routes>
    )
}

export default EmployeeRoutes
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

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<EHome />} />
            <Route path='home/customer-group' element={<ECustomerGroup />} />
            <Route path='home/customer-group/profile' element={<EProfileCustomer />} />
            <Route path='home/customer-group/account' element={<EAccountCustomer />} />
            <Route path='home/service-group' element={<EServiceGroup />} />
            <Route path='home/service-group/deposit-account' element={<EDepositAccount />} />
            <Route path='home/service-group/deposit-saving' element={<EDepositSaving />} />
            <Route path='home/service-group/deposit-saving-traditional' element={<EDepositSavingT />} />
        </Routes>
    )
}

export default EmployeeRoutes
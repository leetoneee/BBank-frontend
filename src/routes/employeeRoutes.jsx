import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ECustomerGroup from '../pages/ECustomerGroup/ECustomerGroup'
import EProfileCustomer from '../pages/EProfileCustomer/EProfileCustomer'
import EHome from '../pages/EHome/EHome'
import EAccountCustomer from '../pages/EAccountCustomer/EAccountCustomer'
function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<EHome />} />
            <Route path='home/customer-group' element={<ECustomerGroup />} />
            <Route path='home/customer-group/profile' element={<EProfileCustomer />} />
            <Route path='home/customer-group/account' element={<EAccountCustomer />} />
        </Routes>
    )
}

export default EmployeeRoutes
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import EHome from '../pages/EHome/EHome'
import ESaving from '../pages/ESaving/ESaving'

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<EHome />} />
            <Route exact path='home/saving-group/saving' element={<ESaving />} />
        </Routes>
    )
}

export default EmployeeRoutes
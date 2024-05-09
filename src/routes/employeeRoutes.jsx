import React from 'react'
import { Route, Routes } from 'react-router-dom'

import EHome from '../pages/EHome/EHome'

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<EHome />} />
        </Routes>
    )
}

export default EmployeeRoutes
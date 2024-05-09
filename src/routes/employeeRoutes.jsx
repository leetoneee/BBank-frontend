import React from 'react'
import Home from '../pages/Home/Home'
import { Route, Routes } from 'react-router-dom'

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='home' element={<Home />} />
        </Routes>
    )
}

export default EmployeeRoutes
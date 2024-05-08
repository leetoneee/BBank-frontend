import React from 'react'
import Home from '../pages/Home/Home'

function EmployeeRoutes() {
    return (
        <Routes>
            <Route path='dashboard' element={<Home />} />
        </Routes>
    )
}

export default EmployeeRoutes
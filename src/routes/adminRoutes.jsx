import React from 'react'
import Home from '../pages/Home/Home';

function AdminRoutes() {
    return (
        <Routes>
            <Route path='dashboard' element={<Home />} />
        </Routes>
    )
}

export default AdminRoutes;
import { Route, Routes } from 'react-router-dom';
import React from 'react'
import Admin from '../pages/Admin/Admin';

function AdminRoutes() {
    return (
        <Routes>
            <Route path='dashboard' element={<Admin />} />
        </Routes>
    )
}

export default AdminRoutes;
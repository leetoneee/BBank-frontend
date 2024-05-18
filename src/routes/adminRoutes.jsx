import { Route, Routes } from 'react-router-dom';
import React from 'react'
import Admin from '../pages/Admin/Admin';
import AAccount from '../pages/ATable/AAccount';
import Add from '../pages/ATable/Add';
import Edit from '../pages/ATable/Edit';
function AdminRoutes() {
    return (
        <Routes>
            <Route path='dashboard' element={<AAccount />} />
            <Route path='employees' element={<AAccount />} />
            <Route path='customers' element={<AAccount />} />
            <Route path='accounts' element={<AAccount />} />
            <Route exact path='accounts/creat' element={<Add />} />
            <Route exact path='accounts/update' element={<Edit />} />
        </Routes>
    )
}

export default AdminRoutes;
import { Route, Routes } from 'react-router-dom';
import React from 'react'
import Admin from '../pages/Admin/Admin';
import AAccount from '../pages/ATable/AAcount/AAccount';
import AddAcount from '../pages/ATable/AAcount/Add';
import EditAccount from '../pages/ATable/AAcount/Edit';
import AFeatures from '../pages/ATable/AFeatures/AFeatures';
import AddFeatures from '../pages/ATable/AFeatures/Add';
import EditFeatures from '../pages/ATable/AFeatures/Edit';
import ARoles from '../pages/ATable/ARoles/ARoles';
import AddRoles from '../pages/ATable/ARoles/Add';
import EditRoles from '../pages/ATable/ARoles/Edit';
import AGroupUser from '../pages/ATable/AGroupUser/AGroupUser';
import AddGroupUser from '../pages/ATable/AGroupUser/Add';
import EditGroupUser from '../pages/ATable/AGroupUser/Edit';
function AdminRoutes() {
    return (
        <Routes>
            <Route path='dashboard' element={<AAccount />} />
            <Route path='employees' element={<AAccount />} />
            <Route path='customers' element={<AAccount />} />
            <Route path='accounts' element={<AAccount />} />
            <Route exact path='accounts/create' element={<AddAcount />} />
            <Route exact path='accounts/update' element={<EditAccount />} />

            <Route path='features' element={<AFeatures />} />
            <Route path='features/create' element={<AddFeatures />} />
            <Route exact path='features/update' element={<EditFeatures />} />

            <Route path='roles' element={<ARoles />} />
            <Route path='roles/create' element={<AddRoles />} />
            <Route path='roles/update' element={<EditRoles />} />

            <Route path='group-user' element={<AGroupUser />} />
            <Route path='group-user/create' element={<AddGroupUser />} />
            <Route path='group-user/update' element={<EditGroupUser />} />
        </Routes>
    )
}

export default AdminRoutes;
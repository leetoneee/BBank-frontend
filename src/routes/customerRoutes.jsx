
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Transfer from '../pages/Transfer/Transfer';
import FastFeatures from '../pages/FastFeatures/FastFeatures';
import SavingGroup from '../pages/SavingGroup/SavingGroup';

function CustomerRoutes() {

    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route exact path='home/transfer' element={<Transfer />} />
            <Route exact path='home/saving' element={<SavingGroup />} />
            <Route exact path='utilities' element={<Home />} />
            <Route exact path='setting' element={<Home />} />
            <Route exact path='setting/fastfeatures' element={<FastFeatures />} />
            <Route exact path='contact' element={<Home />} />
        </Routes>
    )
}

export default CustomerRoutes;

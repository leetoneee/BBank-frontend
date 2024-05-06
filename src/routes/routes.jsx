
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login';
import Transfer from '../pages/Transfer/Transfer';
import FastFeatures from '../pages/FastFeatures/FastFeatures';
function NavPage() {

    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route exact path='home/transfer' element={<Transfer />} />
            <Route exact path='utilities' element={<Home />} />
            <Route exact path='setting' element={<Home />} />
            <Route exact path='setting/fastfeatures' element={<FastFeatures />} />
            <Route exact path='contact' element={<Home />} />
        </Routes>
    )
}

export default NavPage;

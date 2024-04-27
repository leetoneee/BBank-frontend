
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login';
import FastFeatures from '../pages/FastFeatures/FastFeatures';

function NavPage() {

    return (
        <Routes>
            <Route exact path='home' element={<Home />} />
            <Route exact path='utilities' element={<Home />} />
            <Route exact path='setting' element={<FastFeatures />} />
            <Route exact path='contact' element={<Home />} />
        </Routes>
    )
}

export default NavPage;


import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login';
import Transfer from '../pages/Transfer/Transfer';
function NavPage() {

    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route exact path='utilities' element={<Transfer />} />
            <Route exact path='setting' element={<Home />} />
            <Route exact path='contact' element={<Home />} />
            <Route exact path='home/transfer' element={<Transfer />} />
        </Routes>
    )
}

export default NavPage;


import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login';

function NavPage() {

    return (
        <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/utilities' element={<Home />} />
        </Routes>
    )
}

export default NavPage;

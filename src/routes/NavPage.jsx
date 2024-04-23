
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home'

function NavPage() {

    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/utilities' element={<Home />} />
        </Routes>
    )
}

export default NavPage;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Home/Home'

function NavPage() {

    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/utilities' element={<Home />} />
            </Routes>
        </div>

    )
}

export default NavPage;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import Home from '../Home/Home'

function NavPage() {

    return (
        <Router>
            <div className='flex flex-row'>
                <Sidebar />
                <div>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/utilities' element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default NavPage

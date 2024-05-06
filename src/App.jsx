
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Transfer from './pages/Transfer/Transfer';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import FastFeatures from './pages/FastFeatures/FastFeatures'

function App(props) {

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path=':userId/*' element={<MainLayout />}>
        <Route path='home' element={<Home />} />
        <Route exact path='utilities' element={<Home />} />
        <Route exact path='setting' element={<Home />} />
        <Route exact path='setting/fastfeatures' element={<FastFeatures />} />
        <Route exact path='contact' element={<Home />} />
        <Route exact path='home/transfer' element={<Transfer />} />
      </Route>
    </Routes>

  )
}

export default App

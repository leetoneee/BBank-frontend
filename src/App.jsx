
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App(props) {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/user' element={<MainLayout />}>
        <Route index path='home' element={<Home />} />
        <Route path='utilities' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App

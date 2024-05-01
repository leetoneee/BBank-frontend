
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import Transfer from './pages/Transfer/Transfer';
function App(props) {

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path=':userId/*' element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route path='home' element={<Home />} />
        <Route exact path='utilities' element={<Home />} />
        <Route exact path='setting' element={<Home />} />
        <Route exact path='contact' element={<Home />} />
        <Route exact path='home/transfer' element={<Transfer />} />
      </Route>
    </Routes>
  )
}

export default App

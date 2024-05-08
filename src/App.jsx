
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import CustomerRoutes from './routes/customerRoutes';
import EmployeeRoutes from './routes/employeeRoutes';
import AdminRoutes from './routes/adminRoutes';
import Home from './pages/Home/Home';
import { useSelector } from 'react-redux';
import Admin from './pages/Admin/Admin';

function App(props) {

  const maNhom = useSelector((state) => state.user.maNhom);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='admin' element={<Admin />}>
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="employee" element={<Home />} />
      </Route>
      <Route path=':userId/*' element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route path="*" element={<CustomerRoutes />} />
      </Route>
    </Routes>
  )
}

export default App

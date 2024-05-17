
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import Login from './pages/Login/Login';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import CustomerRoutes from './routes/customerRoutes';
import EmployeeRoutes from './routes/employeeRoutes';
import AdminRoutes from './routes/adminRoutes';
import { useSelector } from 'react-redux';
import Admin from './pages/Admin/Admin';
import NoMatch from './pages/NoMatch/NoMatch';

function App(props) {

  const maNhom = useSelector((state) => state.user.maNhom);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      {maNhom === 1 &&
        <Route path='admin/*' element={<AdminLayout />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      }
      {maNhom === 2 &&
        <Route path='employee/*' element={<EmployeeLayout />}>
          <Route path="*" element={<EmployeeRoutes />} />
        </Route>
      }
      {maNhom === 3 &&
        <Route path='user/*' element={<MainLayout />}>
          <Route path="*" element={<CustomerRoutes />} />
        </Route>
      }
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}

export default App


import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import Login from './pages/Login/Login';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import CustomerRoutes from './routes/customerRoutes';
import EmployeeRoutes from './routes/employeeRoutes';
import AdminRoutes from './routes/adminRoutes';
import { useSelector, useDispatch } from 'react-redux';
import Admin from './pages/Admin/Admin';
import NoMatch from './pages/NoMatch/NoMatch';
import { setUser } from './redux/authentication/authSlice';
import { reLoginUser, setIsLoginSuccess } from './redux/authentication/reLoginSlice';
import { useEffect } from 'react';
import { setTen, setUserId, setMaNhom } from './redux/user/userSlice';
import { setLastLoginTime } from './redux/authentication/authSlice';
import { getTransactionType } from './redux/system/getTransactionType/getTransactionTypeSlice';
import formatDateLogin from './utils/formatDateAndTime';
import { fetchAllAccountById } from './redux/customer/customerSlice';

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maNhom = useSelector((state) => state.user.maNhom);
  const user = useSelector((state) => state.reLogin.user);
  const isLoginSuccess = useSelector((state) => state.reLogin.isLoginSuccess);

  useEffect(() => {
    if (window.location.pathname !== "/login") {
      dispatch(reLoginUser());
    }
  }, []);

  const dispatchFetchAllAccount = () => {
    dispatch(fetchAllAccountById());
  }

  useEffect(() => {
    const handleSpinner = async () => {
      if (isLoginSuccess === true) {
        // Navigate to Home page
        dispatch(setUser(user));
        const currentTime = formatDateLogin(new Date());
        dispatch(setLastLoginTime(currentTime));
        dispatchFetchAllAccount();
        dispatch(getTransactionType());
        dispatch(setTen(user.HoTen));
        dispatch(setUserId(user.MaNguoiDung));
        dispatch(setMaNhom(user.MaNhom));
        // await spinner(2000);
        if (user.MaNhom === 3) {
          navigate(`/user/home`, { replace: true });
          return;
        }
        if (user.MaNhom === 2) {
          navigate(`/employee/home`, { replace: true });
          return;
        }
        if (user.MaNhom === 1) {
          navigate(`/admin/dashboard`, { replace: true });
          return;
        }
      }
      if (isLoginSuccess === false) {
        dispatch(setIsLoginSuccess(''));
        setIsShowPopup(true);
      }
    };

    handleSpinner();
  }, [isLoginSuccess]);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      {maNhom === 1 &&
        <Route path='admin/*' element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      }
      {maNhom === 2 &&
        <Route path='employee/*' element={<RequireAuth><EmployeeLayout /></RequireAuth>}>
          <Route path="*" element={<EmployeeRoutes />} />
        </Route>
      }
      {maNhom === 3 &&
        <Route path='user/*' element={<RequireAuth><MainLayout /></RequireAuth>}>
          <Route path="*" element={<CustomerRoutes />} />
        </Route>
      }
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}

export default App

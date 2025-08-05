import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';
import { PrivateRoute } from './Components/Global/PrivateRoute';
import { EmployeeManager } from './Pages/EmployeeManager';
import { ClientManager } from './Pages/ClientManager';
import { CreateClient } from './Pages/CreateClient';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoute role={['user_admin', 'user_empleado']}><Dashboard/></PrivateRoute>}/>
        <Route path='/employeeManager' element={<PrivateRoute role={'user_admin'}><EmployeeManager/></PrivateRoute>}/>
        <Route path='/clientManager' element={<PrivateRoute role={['user_admin', 'user_empleado']}><ClientManager/></PrivateRoute>}/>
        <Route path='/createClient' element={<PrivateRoute role={'user_admin'}><CreateClient/></PrivateRoute>}/>
        <Route path='/' element={<Navigate to="/login" />}/>
      </Routes>
    </>
  )
}



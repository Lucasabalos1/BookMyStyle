import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';
import { PrivateRoute } from './Components/Global/PrivateRoute';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoute role={['user_admin', 'user_empleado']}  ><Dashboard/></PrivateRoute>}/>
        <Route path='/' element={<Navigate to="/login" />}/>
      </Routes>
    </>
  )
}



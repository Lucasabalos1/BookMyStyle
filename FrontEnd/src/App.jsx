import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Navigate to="/login" />}/>
      </Routes>
    </>
  )
}



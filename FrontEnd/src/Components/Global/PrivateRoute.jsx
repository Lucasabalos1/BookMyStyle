import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children, role}) => {
  
  const user_data = JSON.parse(localStorage.getItem("User_data"))
  
  if (!user_data) {
    return <Navigate to="/login" />;
  }

  if (!role.includes(user_data.rol)) {
    return <Navigate to="/login" />;
  }
  
  return children
}


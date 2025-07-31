import styles from './Logout.module.css'
import { useNavigate } from 'react-router-dom';

export const Logout = ({show}) => {
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("User_data");
    navigate('/login')
  }

  return (
    <>
      <div className={`${styles.logoutMenuContainer} ${show ? styles.show : ''}`} onClick={logoutUser}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <h3>Cerrar sesion</h3>
      </div>
    </>
  )
}


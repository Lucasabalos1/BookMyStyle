import styles from "./NotFound.module.css"
import { NavLink } from "react-router-dom"

export const NotFound = () => {
  return (
    <>
        <div className={styles.messageContainer}>
            <h1>404</h1>
            <h4>Pagina no encontrada, por favor vuelva al dashboard</h4>
            <NavLink to='/dashboard' className={styles.returnBtn}>Volver</NavLink>
        </div>      
    </>
  )
}
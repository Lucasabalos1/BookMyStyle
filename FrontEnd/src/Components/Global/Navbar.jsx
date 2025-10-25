import styles from './Navbar.module.css'
import logo from '../../assets/BookmystyleLogoInverso.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Navbar = ({show, toggleNavbar}) => {
  
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User_data"))

    if(!user){
        return;
    }

    if (user.rol != "user_admin") {
        setIsVisible(false)
    }


  })

  return (
    <>

        <div className={`${styles.modalBackground} ${show ? styles.showBackground : ""}`}>
            <div className={`${styles.navbarContainer} ${show ? styles.showNavbar : ""}`}>
                <div className={styles.closeModalContainer} onClick={toggleNavbar}>
                    <i className="fa-solid fa-backward"></i>
                </div>
                
                <div className={styles.logoContainer}>
                    <img src={logo} alt="logo-web" />
                </div>

                <div className={styles.pagesContainer}>
                    
                    <div className={styles.sectionContainer}>
                        <h2 className={styles.sectionTitle}>Clientes</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/clientManager' className={styles.navLink}>
                                    <i className="fa-solid fa-user-group"></i>
                                    <h3>Ver clientes</h3>
                                </NavLink>
                            </div>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/createClient' className={styles.navLink}>
                                    <i className="fa-solid fa-plus"></i>
                                    <h3>Añadir clientes</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={`${isVisible ? styles.sectionContainer : styles.hideNav}`}>
                        <h2 className={styles.sectionTitle}>Empleados</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/employeeManager' className={styles.navLink}>
                                    <i className="fa-solid fa-user-tie"></i>
                                    <h3>Gestionar empleados</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionContainer}>
                        <h2 className={styles.sectionTitle}>Turnos</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/createAppointment' className={styles.navLink}>
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <h3>Crear turnos</h3>
                                </NavLink>
                            </div>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/appointmentManager' className={styles.navLink}>
                                    <i className="fa-solid fa-list"></i>
                                    <h3>Ver turnos</h3>
                                </NavLink>
                            </div>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/appointmentHistory' className={styles.navLink}>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    <h3>Historial de turnos</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionContainer}>
                        <h2 className={styles.sectionTitle}>Servicios</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/serviceManager' className={styles.navLink}>
                                    <i className="fa-solid fa-star"></i>
                                    <h3>Gestion de servicios</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionContainer}>
                        <h2 className={styles.sectionTitle}>Metricas</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/metricsPage' className={styles.navLink}>
                                    <i className="fa-solid fa-signal"></i>
                                    <h3>Gestion de metricas</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={`${isVisible ? styles.sectionContainer : styles.hideNav}`}>
                        <h2 className={styles.sectionTitle}>Configuracion</h2>
                        <div className={styles.sectionNavListContainer}>
                            <div className={styles.sectionNavContainer}>
                                <NavLink to='/workManager' className={styles.navLink}>
                                    <i className="fa-solid fa-gear"></i>
                                    <h3>Gestion de peluqueria</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

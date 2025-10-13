import { useState } from 'react'
import styles from './Header.module.css'
import { Logout } from './Logout'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/dashboard")
  }

  const toggleMenu = () => {
    setShowLogoutMenu(!showLogoutMenu)
  }

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <>
      <header>
        <nav>
            <div className={styles.rowHeaderContent}>
              <div className={styles.hamburgerContainer} onClick={toggleNavbar} aria-label='boton_hamburgesa'>
                <i className="fa-solid fa-bars"></i>
              </div>

              <div className={styles.rightSection}>
                <div className={styles.homeContainer} onClick={goToHome} aria-label='boton_home'>
                  <i className="fa-solid fa-house-user"></i>
                </div>
                
                <div className={styles.userContainer} onClick={toggleMenu} aria-label='boton_logout'>
                  <i className="fa-solid fa-user"></i>
                  <Logout show={showLogoutMenu} />
                </div>
              </div>
            </div>

            <Navbar show={showNavbar} toggleNavbar={toggleNavbar} />

        </nav>
      </header>
    </>
  )
}


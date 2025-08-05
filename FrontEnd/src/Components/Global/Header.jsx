import { useState } from 'react'
import styles from './Header.module.css'
import { Logout } from './Logout'
import { Navbar } from './Navbar'

export const Header = () => {

  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

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
            <div className={styles.rowHeaderContent} onClick={toggleNavbar}>
              <div className={styles.hamburgerContainer}>
                <i className="fa-solid fa-bars"></i>
              </div>

              <div className={styles.userContainer} onClick={toggleMenu}>
                <i className="fa-solid fa-user"></i>
                <Logout show={showLogoutMenu} />
              </div>
            </div>

            <Navbar show={showNavbar} toggleNavbar={toggleNavbar} />

        </nav>
      </header>
    </>
  )
}


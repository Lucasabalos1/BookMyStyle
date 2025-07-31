import { useState } from 'react'
import styles from './Header.module.css'
import { Logout } from './Logout'
export const Header = () => {

  const [showLogoutMenu, setShowLogoutMenu] = useState(false)

  const toggleMenu = () => {
    setShowLogoutMenu(!showLogoutMenu)
  }

  return (
    <>
      <header>
        <nav>
            <div className={styles.rowHeaderContent}>
              <div className={styles.hamburgerContainer}>
                <i className="fa-solid fa-bars"></i>
              </div>

              <div className={styles.userContainer} onClick={toggleMenu}>
                <i className="fa-solid fa-user"></i>
                <Logout show={showLogoutMenu} />
              </div>
            </div>
        </nav>
      </header>
    </>
  )
}


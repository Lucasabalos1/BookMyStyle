import styles from './Header.module.css'

export const Header = () => {
  return (
    <>
      <header>
        <nav>
            <div className={styles.rowHeaderContent}>
              <div className={styles.hamburgerContainer}>
                <i class="fa-solid fa-bars"></i>
              </div>

              <div className={styles.userContainer}>
                <i class="fa-solid fa-circle-user"></i>
              </div>
            </div>
        </nav>
      </header>
    </>
  )
}


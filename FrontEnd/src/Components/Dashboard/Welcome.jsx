import styles from './Welcome.module.css'

export const Welcome = () => {
  
  // Falta agregar la logica que me trae el usuario

  return (
    <>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContainer}>
            <div className={styles.welcomeMessage}>
                <h1>BOOKMYSTYLE</h1>
                <h2>Bienvenido *inserte nombre de usuario*</h2>
            </div>
        </div>
      </section>
    </>
  )
}


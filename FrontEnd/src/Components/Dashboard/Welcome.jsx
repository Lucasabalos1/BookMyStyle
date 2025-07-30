import styles from './Welcome.module.css'

export const Welcome = () => {
  
  const user = JSON.parse(localStorage.getItem("User_data"))

  return (
    <>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContainer}>
            <h1>BOOKMYSTYLE</h1>
            <h2>Bienvenido {user.usuario}</h2>
        </div>
      </section>
    </>
  )
}


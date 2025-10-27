import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <h3>© 2025 BookMyStyle. Todos los derechos reservados.</h3>
        <a href="">
          <h3>Visita mi portfolio</h3>
        </a>
      </div>
    </>
  )
}
import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Sección Principal */}
        <div className={styles.footerSection}>
          <h2 className={styles.brandName}>BookMyStyle</h2>
          <p className={styles.description}>
            Plataforma profesional para gestionar turnos, clientes y servicios de tu peluqueria.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Enlaces Útiles</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Turnos</a></li>
            <li><a href="#">Clientes</a></li>
            <li><a href="#">Servicios</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Desarrollador</h3>
          <p className={styles.developerText}>
            Desarrollado por <strong>Lucas Abalos</strong>
          </p>
          <a 
            href="https://abalos-lucas-portfolio-web.vercel.app/" 
            className={styles.portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Portfolio →
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 BookMyStyle. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
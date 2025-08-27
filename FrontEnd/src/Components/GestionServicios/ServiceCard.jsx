import styles from './serviceCard.module.css'

export const ServiceCard = ({service}) => {
  return (
    <>
      <article className={styles.cardContainer}>
        <div className={styles.headerCard}>
            <span className={styles.serviceName}>{service.nombre}</span>
        </div>

        <hr />

        <div className={styles.infoServiceContainer}>
            <div className={styles.timeContainer}>
                <i className="fa-solid fa-clock"></i>
                <span className={styles.timeService}>{service.tiempo} min</span>
            </div>
            <span className={styles.separator}></span>
            <div className={styles.priceContainer}>
                <i className="fa-solid fa-dollar-sign"></i>
                <span className={styles.priceService}>{service.precio}</span>
            </div>
        </div>

        <div className={styles.buttonsContainer}>
            <button className={styles.editBtn}>Editar</button>
            <button className={styles.deleteBtn}>Eliminar</button>
        </div>
      </article>
    </>
  )
}
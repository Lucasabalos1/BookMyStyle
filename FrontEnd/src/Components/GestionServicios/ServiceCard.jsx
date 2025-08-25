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
                <span className={styles.timeService}>{service.tiempo} minutos</span>
            </div>
            <span className={styles.separator}></span>
            <div className={styles.priceContainer}>
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
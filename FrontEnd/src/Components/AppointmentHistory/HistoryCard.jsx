import styles from "./HistoryCard.module.css"

export const HistoryCard = ({Appointment}) => {
  return (
    <>
      <article className={styles.cardContainer}>
        <div className={styles.headerCard}>
            <div className={styles.serviceName}>
                <i className="fa-solid fa-star"></i>
                <p>{Appointment.servicio.nombre}</p>
            </div>
            <div className={styles.serviceDateContainer}>
                <div className={styles.serviceDate}>
                    <i className="fa-solid fa-calendar"></i>
                    <p>{Appointment.fecha}</p>
                </div>
                <div className={styles.serviceTime}>
                    <i className="fa-solid fa-clock"></i>
                    <p>{Appointment.hora}</p>
                </div>
            </div>
        </div>

        <div className={styles.priceContainer}>
            <div className={styles.priceTitle}>
                <i className="fa-solid fa-dollar-sign"></i>
                <p>Precio final:</p>
            </div>
            <span className={styles.price}>$6000</span>
        </div>

        <div className={styles.infoAppointmentContainer}>
          <div className={styles.infoBlock}>
            <div className={styles.logoContainer}>
              <i className="fa-solid fa-user-check"></i>
            </div>
            <div className={styles.infoCont}>
              <span className={styles.sectionTitle}>Atendido por</span>
              <span className={styles.sectionInfo}>{`${Appointment.empleado.nombre} ${Appointment.empleado.apellido}`}</span>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.logoContainer}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className={styles.infoCont}>
              <span className={styles.sectionTitle}>Cliente</span>
              <span className={styles.sectionInfo}>{`${Appointment.cliente.nombre} ${Appointment.cliente.apellido}`}</span>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.logoContainer}>
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className={styles.infoCont}>
              <span className={styles.sectionTitle}>Telefono</span>
              <span className={styles.sectionInfo}>1123443232</span>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
import styles from "./AppointmentCard.module.css"

export const AppointmentCard = ({show}) => {
  return (
    <>
        <div className={`${styles.modalBackground} ${show ? styles.showCard : ""}`}>
            <article className={styles.cardContainer}>
                <div className={styles.headerCont}>
                    <h2 className={styles.cardTitle}>BOOKMYSTYLE - TURNO</h2>
                    <button className={styles.closeBtn}>X</button>
                </div>
                <section className={styles.appointmentInfoCont}>
                    <span className={styles.infoTitleCont}>
                        <i className="fa-solid fa-circle-info"></i>    
                        <h3 className={styles.infoTitle}>Informacion del turno</h3>
                    </span>
                    <div className={styles.appointmentInfo}>
                        <ul className={styles.ulInfoCont}>
                            <li className={styles.liInfoCont}>
                                <i className="fa-solid fa-calendar"></i>
                                <p>Fecha: 14/12/2025</p>
                            </li>
                            <li className={styles.liInfoCont}>
                                <i className="fa-solid fa-clock"></i>
                                <p>Hora: 12:30 - 13:30</p>
                            </li>
                            <li className={styles.liInfoCont}>
                                <i className="fa-solid fa-scissors"></i>
                                <p>Servicio: Corte de pelo</p>
                            </li>
                            <li className={styles.liInfoCont}>
                                <i className="fa-solid fa-dollar"></i>
                                <p>Precio: 8000$</p>
                            </li>
                            <li className={styles.liInfoCont}>
                                <i className="fa-solid fa-person"></i>
                                <p>Atendido por: Eduardo Vasquez</p>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className={styles.appointmentUserCont}>
                    <span className={styles.userInfoTitleCont}>
                        <i className="fa-solid fa-user"></i>    
                        <h3 className={styles.infoTitle}>Informacion del cliente</h3>
                    </span>
                    <div className={styles.appointmentClientInfo}>
                        <ul className={styles.ulClientInfoCont}>
                            <li className={styles.liClientInfoCont}>
                                <i className="fa-solid fa-id-card"></i>
                                <p>Nombre y apellido: Jose Perez</p>
                            </li>
                            <li className={styles.liClientInfoCont}>
                                <i className="fa-solid fa-clock"></i>
                                <p>Sexo: Masculino</p>
                            </li>
                            <li className={styles.liClientInfoCont}>
                                <i className="fa-solid fa-phone"></i>
                                <p>Telefono: 1212121212</p>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className={styles.buttonsControlerSection}>
                    <button className={styles.editBtn}>Editar</button>
                    <button className={styles.cancelBtn}>Cancelar</button>
                    <button className={styles.completeBtn}>Completar</button>
                </section>
            </article>
        </div>      
    </>
  )
}
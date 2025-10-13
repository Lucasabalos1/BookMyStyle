import styles from "./AppointmentCard.module.css"
import { AppointmentConfirmModal } from './AppointmentConfirmModal'
import { AppointmentCancelModal } from './AppointmentCancelModal'
import { useState } from "react"
import { AppointmentEditModal } from "./AppointmentEditModal"

export const AppointmentCard = ({show, handleData, toggleModalCard, refreshAppointments}) => {
  
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const toggleConfirmModal = () =>{
    setShowConfirmModal(!showConfirmModal)
  }

  const toggleCancelModal = () =>{ 
    setShowCancelModal(!showCancelModal)
  }

  const toggleEditModal = () =>{ 
    setShowEditModal(!showEditModal)
  }
  return (
    <>
        <div className={`${styles.modalBackground} ${show ? styles.showCard : ""}`}>
            <article className={styles.cardContainer}>
                <div className={styles.headerCont}>
                    <h2 className={styles.cardTitle}>BOOKMYSTYLE - TURNO</h2>
                    <button className={styles.closeBtn} onClick={toggleModalCard}>X</button>
                </div>
                <section className={styles.appointmentInfoCont}>
                    <span className={styles.infoTitleCont}>
                        <i className="fa-solid fa-circle-info"></i>    
                        <h3 className={styles.infoTitle}>Informacion del turno</h3>
                    </span>
                    <div className={styles.appointmentInfo}>
                        <ul className={styles.ulInfoCont}>
                            <li className={styles.liInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-calendar"></i>
                                    <span>Fecha:</span>
                                </div>
                                <span>{handleData.fecha}</span>
                            </li>
                            <li className={styles.liInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-clock"></i>
                                    <span>Hora:</span>
                                </div>
                                <span>{handleData.start && handleData.end ? `${handleData.start.getHours()}:${handleData.start.getMinutes() >= 10 ? handleData.start.getMinutes() : handleData.start.getMinutes() + "0"} - ${handleData.end.getHours()}:${handleData.end.getMinutes()}` : ""}</span>
                            </li>
                            <li className={styles.liInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-scissors"></i>
                                    <span>Servicio:</span>
                                </div>
                                <span>{handleData.servicio}</span>
                            </li>
                            <li className={styles.liInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-dollar"></i>
                                    <span>Precio:</span>
                                </div>
                                <span>{Number(handleData.precio).toFixed(0)}$</span>
                            </li>
                            <li className={styles.liInfoCont}>
                                 <div className={styles.liLabel}>
                                    <i className="fa-solid fa-person"></i>
                                    <span>Atendido por:</span>
                                </div>
                                <span>{handleData.empleado}</span>
                            </li>

                            <li className={styles.liInfoCont}>
                                 <div className={styles.liLabel}>
                                    <i className="fa-solid fa-chart-simple"></i>
                                    <span>Estado:</span>
                                </div>
                                <span>{handleData.estado}</span>
                            </li>

                            <li className={styles.liInfoCont}>
                                 <div className={styles.liLabel}>
                                    <i className="fa-solid fa-message"></i>
                                    <span>Nota:</span>
                                </div>
                                <span>{handleData.note !== "" ? handleData.note : "Sin nota"}</span>
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
                                 <div className={styles.liLabel}>
                                    <i className="fa-solid fa-id-card"></i>
                                    <span>Cliente:</span>
                                </div>
                                <span>{handleData.cliente}</span>
                            </li>
                            <li className={styles.liClientInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-mars-and-venus"></i>
                                    <span>Sexo:</span>
                                </div>
                                <p>{handleData.genero}</p>
                            </li>
                            <li className={styles.liClientInfoCont}>
                                <div className={styles.liLabel}>
                                    <i className="fa-solid fa-phone"></i>
                                    <span>Telefono:</span>
                                </div>
                                <p>{handleData.telefono}</p>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className={styles.buttonsControlerSection}>
                    <button className={styles.editBtn} onClick={toggleEditModal} disabled={handleData.estado === "completado" || handleData.estado === "cancelado"} >Editar</button>
                    <button className={styles.cancelBtn} onClick={toggleCancelModal} disabled={handleData.estado === "completado" || handleData.estado === "cancelado"}>Cancelar</button>
                    <button className={styles.completeBtn} onClick={toggleConfirmModal} disabled={handleData.estado === "completado" || handleData.estado === "cancelado"}>Completar</button>
                </section>
            </article>
            <AppointmentConfirmModal show={showConfirmModal} toggleConfirmModal={toggleConfirmModal} appointmentId={handleData.id} refreshAppointments={refreshAppointments}  />
            <AppointmentCancelModal show={showCancelModal} toggleCancelModal={toggleCancelModal} appointmentId={handleData.id} refreshAppointments={refreshAppointments}  />
            <AppointmentEditModal show={showEditModal} toggleEditModal={toggleEditModal} appointmentId={handleData.id} refreshAppointments={refreshAppointments}    />
        </div>      
    </>
  )
}
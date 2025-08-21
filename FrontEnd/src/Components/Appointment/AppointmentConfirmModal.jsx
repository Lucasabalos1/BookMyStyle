import styles from "./AppointmentControlerModal.module.css"

export const AppointmentConfirmModal = ({show, toggleConfirmModal, appointmentId, refreshAppointments}) => {
  
  const handleCompleteAppointment = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/completarTurno/${appointmentId}`,{
        method: "PATCH"
      })

      const data = await response.json()

      if (data.success) {
        alert("El turno se marco como completado")
        toggleConfirmModal()
        refreshAppointments()
        window.location.reload();

      }else{
        alert("El turno no pude se marcado como completado")
      }
      } catch (error) {
        console.log("Hubo un error al conectar con el servidor", error)      
      }
  }
  
  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.modalContainer}>
            <h2>¿Estas seguro que desea completar el turno?</h2>
            <div className={styles.buttonsControler}>
                <button className={styles.rejectedBtn} onClick={toggleConfirmModal}>NO</button>
                <button className={styles.acceptBtn} onClick={handleCompleteAppointment}>SI</button>
            </div>
        </div>
      </div>
    </>
  )
}


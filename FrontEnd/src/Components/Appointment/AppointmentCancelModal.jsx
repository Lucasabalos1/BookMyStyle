import styles from "./AppointmentControlerModal.module.css"

export const AppointmentCancelModal = ({show, toggleCancelModal, appointmentId, refreshAppointments}) => {
  
  const handleCancelAppointment = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cancelarTurno/${appointmentId}`,{
        method: "PATCH"
      })

      const data = await response.json()

      if (data.success) {
        alert("El turno se marco como cancelado")
        toggleCancelModal()
        refreshAppointments()
        window.location.reload();

      }else{
        alert("El turno no pude se marcado como cancelado")
      }
      } catch (error) {
        console.log("Hubo un error al conectar con el servidor", error)      
      }
  }
  
  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.modalContainer}>
            <h2>¿Estas seguro que desea cancelar el turno?</h2>
            <div className={styles.buttonsControler}>
                <button className={styles.rejectedBtn} onClick={toggleCancelModal}>NO</button>
                <button className={styles.acceptBtn} onClick={handleCancelAppointment}>SI</button>
            </div>
        </div>
      </div>
    </>
  )
}
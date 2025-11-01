import styles from "./AppointmentControlerModal.module.css"
import Swal from "sweetalert2"

export const AppointmentConfirmModal = ({show, toggleConfirmModal, appointmentId, refreshAppointments}) => {
  
  const handleCompleteAppointment = async() => {
    try {
      const response = await fetch(`https://bookmystyle.onrender.com/completarTurno/${appointmentId}`,{
        method: "PATCH"
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'El turno se marco como completado',
          confirmButtonColor: '#FF4ED2'
        })
        toggleConfirmModal()
        refreshAppointments()
        setTimeout(() =>{
          window.location.reload();
        }, 1000)

      }else{
        Swal.fire({
          icon: 'error',
          title: 'El turno no puede ser marcado como completado',
          text: 'Refresca la pagina e intentelo de nuevo',
          confirmButtonColor: '#FF4ED2'
        })
      }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error por parte del servidor',
          text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
          confirmButtonColor: '#FF4ED2'
        })
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


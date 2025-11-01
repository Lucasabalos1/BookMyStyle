import styles from "./AppointmentControlerModal.module.css"
import Swal from "sweetalert2"

export const AppointmentCancelModal = ({show, toggleCancelModal, appointmentId, refreshAppointments}) => {
  
  const handleCancelAppointment = async() => {
    try {
      const response = await fetch(`https://bookmystyle.onrender.com/cancelarTurno/${appointmentId}`,{
        method: "PATCH"
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'El turno a sido cancelado correctamente',
          text: 'Verifica el calendario para confirmar la cancelacion',
          confirmButtonColor: '#FF4ED2'
        })
        toggleCancelModal()
        refreshAppointments()
        setTimeout(() =>{
          window.location.reload();
        }, 1000)

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al cancelar un turno',
          text: 'Por favor refresque la pagina y vuelva a intentarlo',
          confirmButtonColor: '#FF4ED2'
        })
      }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al cancelar un turno',
          text: 'Por favor refresque la pagina y vuelva a intentarlo',
          confirmButtonColor: '#FF4ED2'
        })
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
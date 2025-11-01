import styles from "./DeleteServiceModal.module.css"
import Swal from "sweetalert2"

export const DeleteServiceModal = ({show, toggleDeleteModal, service,getServices}) => {
  
  const deleteService = async () => {
    try {
      const response = await fetch(`https://bookmystyle.onrender.com/deleteServices/${service.id}`,{
          method: "DELETE"
      })

      const data = await response.json()

      if(data.success){
        Swal.fire({
          icon: 'success',
          title: 'Se elimino el servicio correctamente',
          confirmButtonColor: '#FF4ED2'
        })
        toggleDeleteModal()
        getServices()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al eliminar el servicio',
          text: 'Por favor, refresque la pagina e intentelo nuevamente',
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
      console.log("Hubo un error al conectarse con el servidor", error)
    }
  }

  return (
    <>
      <div className={`${styles.modalBackgrond} ${show ? styles.showModal : ""}`}>
        <article className={styles.modalContainer}>
            <span>¿Estas seguro que quieres eliminar a este servicio?</span>
            <div className={styles.buttonsContainer}>
                <button className={styles.rejectedButton} onClick={toggleDeleteModal}>Cancelar</button>
                <button className={styles.acceptButton} onClick={deleteService  }>Aceptar</button>
            </div>
        </article>
      </div>      
    </>
  )
}
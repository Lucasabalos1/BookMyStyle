import styles from "./DeleteServiceModal.module.css"

export const DeleteServiceModal = ({show, toggleDeleteModal, service,getServices}) => {
  
  const deleteService = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/deleteServices/${service.id}`,{
            method: "DELETE"
        })

        const data = await response.json()

        if(data.success){
            alert("Se Elimino el servicio correctamente")
            toggleDeleteModal()
            getServices()
        }else{
            alert("Hubo un error al eliminar el servicio ")
        }  
    } catch (error) {
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
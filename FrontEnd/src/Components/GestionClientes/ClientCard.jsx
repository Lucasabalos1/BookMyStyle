import styles from "./ClientCard.module.css"
import { useState } from "react"
import { DeleteClientModal } from "./DeleteClientModal"
import { EditClientModal } from "./EditClientModal"

export const ClientCard = ({client, getClients}) => {
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const toggleEditModal = () =>{
    setShowEditModal(!showEditModal)
  }

  const deleteClient = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/eliminarCliente/${client.id}`,{
        method: "DELETE"
      })
      const data = await response.json()

      if(data.success){
        alert("Se elimino el cliente con exito")
        toggleDeleteModal()
        getClients()
      }else{
        alert("No se pudo eliminar el cliente")
      }
    } catch (error) {
      console.log("Hubo un error al conectar con el servidor", error)
    }
  }
  
  return (
    <>
      <article className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <p>{`${client.nombre} ${client.apellido}`}</p>
          <span className={`${(client.genero === "Masculino") ? styles.genreMaleLabel : styles.genreFemaleLabel}`}>{client.genero}</span>
        </div>
        <div className={styles.phoneContainer}>
          <i className="fa-solid fa-phone"></i>
          <p>{client.telefono}</p>
        </div>
        <div className={styles.buttonsControlerContainer}>
            <button className={styles.editButton} onClick={toggleEditModal}>Editar</button>
            <button className={styles.deleteButton} onClick={toggleDeleteModal}>Eliminar</button>
        </div>
      </article>

      <DeleteClientModal show={showDeleteModal} toggleDeleteModal={toggleDeleteModal} deleteClient={deleteClient} />
      <EditClientModal show={showEditModal} toggleEditModal={toggleEditModal} client={client} getClients={getClients}/>
    </>
  )
}

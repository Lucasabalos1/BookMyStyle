import styles from './serviceCard.module.css'
import { EditServiceModal } from './EditServiceModal'
import { useState } from 'react'
import { DeleteServiceModal } from './DeleteServiceModal'

export const ServiceCard = ({service, getServices}) => {
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  const toggleEditModal = () => {
    setShowEditModal(prev => !prev)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(prev => !prev)
  }


  return (
    <>
      <article className={styles.cardContainer}>
        <div className={styles.headerCard}>
            <span className={styles.serviceName}>{service.nombre}</span>
        </div>

        <hr />

        <div className={styles.infoServiceContainer}>
            <div className={styles.timeContainer}>
                <i className="fa-solid fa-clock"></i>
                <span className={styles.timeService}>{service.tiempo} min</span>
            </div>
            <span className={styles.separator}></span>
            <div className={styles.priceContainer}>
                <i className="fa-solid fa-dollar-sign"></i>
                <span className={styles.priceService}>{service.precio}</span>
            </div>
        </div>

        <div className={styles.buttonsContainer}>
            <button className={styles.editBtn} onClick={toggleEditModal}>Editar</button>
            <button className={styles.deleteBtn} onClick={toggleDeleteModal}>Eliminar</button>
        </div>
      </article>
    <EditServiceModal show={showEditModal} toggleEditModal={toggleEditModal} service={service} getServices={getServices}/>
    <DeleteServiceModal show={showDeleteModal} toggleDeleteModal={toggleDeleteModal} service={service} getServices={getServices} />
    </>
  )
}
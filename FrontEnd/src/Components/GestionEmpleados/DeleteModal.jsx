import styles from "./DeleteModal.module.css"

export const DeleteModal = ({show, toggleDeleteModal, deleteEmployee}) => {
  return (
    <>
      <div className={`${styles.modalBackgrond} ${show ? styles.showModal : ""}`}>
        <article className={styles.modalContainer}>
            <span>¿Estas seguro que quieres eliminar a este empleado?</span>
            <div className={styles.buttonsContainer}>
                <button className={styles.rejectedButton} onClick={toggleDeleteModal}>Cancelar</button>
                <button className={styles.acceptButton} onClick={deleteEmployee}>Aceptar</button>
            </div>
        </article>
      </div>
    </>
  )
}

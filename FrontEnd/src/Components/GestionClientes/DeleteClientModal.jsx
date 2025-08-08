import styles from "./DeleteClientModal.module.css"

export const DeleteClientModal = ({show, toggleDeleteModal, deleteClient}) => {
  return (
    <>
      <section className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.modalContainer}>
            <h3>¿Seguro que quieres eliminar al cliente?</h3>
            <div className={styles.buttonsContainer}>
                <button className={styles.rejectedButton} onClick={toggleDeleteModal}>Cancelar</button>
                <button className={styles.acceptButton} onClick={deleteClient}>Aceptar</button>
            </div>
        </div>
      </section>
    </>
  )
}
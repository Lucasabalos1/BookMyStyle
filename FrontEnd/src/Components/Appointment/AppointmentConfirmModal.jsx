import styles from "./AppointmentConfirmModal.module.css"

export const AppointmentConfirmModal = ({show, toggleConfirmModal}) => {
  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.modalContainer}>
            <h2>¿Estas seguro que desea completar el turno?</h2>
            <div className={styles.buttonsControler}>
                <button className={styles.rejectedBtn} onClick={toggleConfirmModal}>NO</button>
                <button className={styles.acceptBtn}>SI</button>
            </div>
        </div>
      </div>
    </>
  )
}


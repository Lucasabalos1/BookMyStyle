import styles from "./AppointmentCancelModal.module.css"

export const AppointmentCancelModal = ({show, toggleCancelModal}) => {
  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.modalContainer}>
            <h2>¿Estas seguro que desea cancelar el turno?</h2>
            <div className={styles.buttonsControler}>
                <button className={styles.rejectedBtn} onClick={toggleCancelModal}>NO</button>
                <button className={styles.acceptBtn}>SI</button>
            </div>
        </div>
      </div>
    </>
  )
}
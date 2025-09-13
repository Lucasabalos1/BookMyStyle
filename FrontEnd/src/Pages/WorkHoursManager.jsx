import styles from "./WorkHoursManager.module.css"
import { Header } from "../Components/Global/Header"
import { DayCard } from "../Components/WorkMangar/DayCard"

export const WorkHoursManager = () => {
  
  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <h2>Gestion de peluqueria</h2>
        </div>

        <section className={styles.managerContainer}>
            <div className={styles.headerContainer}>
                <h3 className={styles.headerTitle}>Configuracion de dias y horarios de atencion</h3>
                <p className={styles.subtitle}>Configura los días y horarios en que tu peluquería estará abierta al público</p>
            </div>

            <div className={styles.scheduleContainer}>
                <DayCard/>
                <DayCard/>
                <DayCard/>
                <DayCard/>
                <DayCard/>
                <DayCard/>
                <DayCard/>
            </div>

            <div className={styles.confirmSaveBtn}>
              <button className={styles.saveBtn}>Guardar Cambios</button>
            </div>
        </section>
      </div>
    </>
  )
}
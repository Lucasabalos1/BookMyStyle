import styles from './AppointmentManager.module.css'
import { Header } from "../Components/Global/Header"
import { AppointmentCard } from '../Components/Appointment/AppointmentCard'
export const AppointmentManager = () => {
  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <h1>Gestion de turnos</h1>
        <AppointmentCard show={true}/>
      </div>
    </>
  )
}

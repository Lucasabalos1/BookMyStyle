import styles from "./AppointmentsHistoryPage.module.css"
import { Header } from "../Components/Global/Header"
import { HistoryFilter } from "../Components/AppointmentHistory/HistoryFilter"
import { HistoryCard } from "../Components/AppointmentHistory/HistoryCard"
import { useEffect, useState } from "react"

export const AppointmentsHistoryPage = () => {
  
  const [historyAppointments, setHistoryAppointments] = useState([])
  
  const [clientInputSelected, setClientInputSelected] = useState("")
  const [employeeInputSelected, setEmployeeInputSelected] = useState("")
  const [DateInputSelected, setDateInputSelected] = useState("")

  const getAppointmentHistory = async() => {
    try {
      const params = new URLSearchParams()
      if (clientInputSelected) params.append("cliente", clientInputSelected);
      if (employeeInputSelected) params.append("empleado", employeeInputSelected);
      if (DateInputSelected) params.append("fecha", DateInputSelected);

      const response = await fetch(`http://localhost:5000/turnos/historial?${params.toString()}`)
      const data = await response.json()
  
      if(data.success){
        setHistoryAppointments(data.data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAppointmentHistory()
  }, [clientInputSelected, employeeInputSelected, DateInputSelected])

  return (
    <>
        <Header/>
        <div className={styles.mainContainer}>
            <h2 className='titleSection'>Historial de turnos</h2>
            <HistoryFilter setClientInputSelected={setClientInputSelected} setEmployeeInputSelected={setEmployeeInputSelected} setDateInputSelected={setDateInputSelected}/>
            <section className={styles.appointmentsContainer}>
              {historyAppointments.length > 0 ? 
                historyAppointments.map((Appointment) => (
                  <HistoryCard key={Appointment.id} Appointment={Appointment} />
              ))
              : <h3 className={styles.noDataMsg}>No se encontraron turnos con ese filtro</h3>
              }
</section>
        </div>
    </>
  )
}
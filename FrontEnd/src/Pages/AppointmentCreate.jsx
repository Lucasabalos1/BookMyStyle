import styles from "./AppointmentCreate.module.css"
import { Header } from "../Components/Global/Header"
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];

export const AppointmentCreate = () => {
  
  const [dateValue, setDateValue] = useState("")
  const [timeValue, setTimeValue] = useState("")
  const [serviceValue, setServiceValue] = useState("")
  const [clientValue, setClientValue] = useState("")
  const [employeeValue, setEmployeeValue] = useState("")
  const [noteValue, setNoteValue] = useState("")

  const [clientlist, setClientList] = useState([])
  const [serviceList, setServiceList] = useState([])

  const onInputChange = (event) => {
    (event.target.name === "date") ? setDateValue(event.target.value) :
    (event.target.name === "time") ? setTimeValue(event.target.value) :
    (event.target.name === "service") ? setServiceValue(event.target.value) :
    (event.target.name === "client") ? setClientValue(event.target.value) :
    setNoteValue(event.target.value)

  }

  const clearInputs = () => {
    setDateValue("")
    setTimeValue("")
    setServiceValue("")
    setClientValue("")
    setNoteValue("")
  }

  const validateSchedule = () => {
      const schedule = JSON.parse(localStorage.getItem("schedule"))

      if (!schedule) {
        Swal.fire({
          icon: 'error',
          title: 'Todavia no se configuraron los dias y horarios',
          text: 'Por favor dirigirse a configuracion de peluqueria',
          confirmButtonColor: '#FF4ED2'
        })
        return false
      }

      const date = new Date(dateValue)

      const day = days[date.getDay()]
      console.log(date.getDay())
      console.log(day)
      const item = schedule.find(d => d.dia === day)
      
      if(!item.datos.estaAbierto){
        Swal.fire({
          icon: 'error',
          title: `El dia ${day} la peluqueria se encuentra cerrada.`,
          confirmButtonColor: '#FF4ED2'
        })
        return false;
      }

      if (timeValue < item.datos.Desde || timeValue > item.datos.Hasta) {
        Swal.fire({
          icon: 'error',
          title: `Se encuentra fuera de los limites de atencion`,
          text: `ingrese un valor entre las ${item.datos.Desde} y las ${item.datos.Hasta}`,
          confirmButtonColor: '#FF4ED2'
        })
        return false;
      }

      return true
  }

  const onSubmitAppointment = async (event) => {
    event.preventDefault()

    if (!validateSchedule()) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/addTurno",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: dateValue,
          hora: timeValue,
          estado: "confirmado",
          nota: noteValue,
          empleado: employeeValue.id,
          cliente: clientValue,
          servicio: serviceValue
        })
      });

      const data = await response.json()
      
      if(data.success){
        Swal.fire({
          icon: 'success',
          title: `Turno creado con exito`,
          text: `Por favor revise el calendario para confirma que el turno impacto en el sistema`,
          confirmButtonColor: '#FF4ED2'
        })
        clearInputs()
      }else{
        Swal.fire({
          icon: 'error',
          title: `Hubo un error al crear el turno`,
          text: `Por favor revise los datos ingresado y asegurate que no haya un turno en este horario`,
          confirmButtonColor: '#FF4ED2'
        })
      }

    } catch (error) {
      console.log("Hubo un error en el servidor", error)
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error por parte del servidor',
        text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
        confirmButtonColor: '#FF4ED2'
      })
    }
  }

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem('User_data'))
    setEmployeeValue(user)

    try {
      const responseClient = await fetch("http://127.0.0.1:5000/getClients")
      const dataClient = await responseClient.json()

      setClientList(dataClient.data)

      const responseService = await fetch("http://127.0.0.1:5000/getServices")
      const dataService = await responseService.json()

      setServiceList(dataService.data)
   }catch (error) {
      console.log("Hubo un error en el servidor", error)
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error por parte del servidor al obtener los datos',
        text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
        confirmButtonColor: '#FF4ED2'
      })
    }   
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <h2 className="titleSection">Carga de turnos</h2>
        <section className={styles.formContainer}>
          <p className={styles.formTitle}>Complete el formulario con los datos del turno</p>
          <form onSubmit={onSubmitAppointment}>
            <div className={styles.blockContainer}>
              <label htmlFor="date">Fecha</label>
              <input type="date" name="date" id="date" value={dateValue} onChange={onInputChange}/>
            </div>

            <div className={styles.blockContainer}>
              <label htmlFor="time">Hora</label>
              <input type="time" name="time" id="time" min={"9:00"} max={"23:30"} value={timeValue} onChange={onInputChange}/>
            </div>

            <div className={styles.blockContainer}>
              <label htmlFor="service">Servicio</label>
              <select name="service" id="service" value={serviceValue} onChange={onInputChange}>
                <option value="">Seleccione el servicio</option>
                {serviceList.map((service) => (
                  <option key={service.id} value={service.id}>{service.nombre}</option>
                ))}
              </select>
            </div>

            <div className={styles.blockContainer}>
                <label htmlFor="client">Cliente</label>
              <select name="client" id="client" value={clientValue} onChange={onInputChange}>
                <option value="">Seleccione el cliente</option>
                {clientlist.map((client) => (
                  <option key={client.id} value={client.id}>{`${client.nombre} ${client.apellido}`}</option>
                ))}
              </select>
            </div>

            <div className={styles.blockContainer}>
              <label htmlFor="Employee">Empleado</label>
              <input type="text" value={employeeValue.usuario} disabled={true}/>
            </div>

            
            <div className={styles.blockContainer}>
              <label htmlFor="Employee">Estado</label>
              <input type="text" value={"confirmado"} disabled={true}/>
            </div>

            
            <div className={`${styles.blockContainer} ${styles.note}`}>
            <label htmlFor="note">Nota</label>
              <input
                name="note"
                id="note"
                placeholder="Ingrese una nota (opcional)"
                value={noteValue}
                onChange={onInputChange}
              />
            </div>
            <button className={styles.confirmAppointment}>Confirmar turno</button>

          </form>
        </section>
      </div>

    </>
  )
}
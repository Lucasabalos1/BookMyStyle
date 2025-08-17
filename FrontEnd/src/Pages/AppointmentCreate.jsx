import styles from "./AppointmentCreate.module.css"
import { Header } from "../Components/Global/Header"
import { useEffect, useState } from "react"

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
    setEmployeeValue("")
    setNoteValue("")
  }

  const onSubmitAppointment = async (event) => {
    event.preventDefault()

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
        alert("Turno creado con exito")
        clearInputs()
      }else{
        alert("Error al crear el turno")
      }

    } catch (error) {
      console.log("Hubo un error al conectar con el servidor", error)
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
      console.log("Hubo un error al conectarse con el servidor", error)
    }   
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <h2>Carga de turnos</h2>
        <section className={styles.formContainer}>
          <p className={styles.formTitle}>Complete el formulario con los datos del turno</p>
          <form onSubmit={onSubmitAppointment}>
            <div className={styles.blockContainer}>
              <label htmlFor="date">Fecha</label>
              <input type="date" name="date" id="date" value={dateValue} onChange={onInputChange}/>
            </div>

            <div className={styles.blockContainer}>
              <label htmlFor="time">Hora</label>
              <input type="time" name="time" id="time" min={"9:00"} max={"20:00"} value={timeValue} onChange={onInputChange}/>
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
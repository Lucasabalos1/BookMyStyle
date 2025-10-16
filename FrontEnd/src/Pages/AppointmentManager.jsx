import styles from './AppointmentManager.module.css'
import { Header } from "../Components/Global/Header"
import { AppointmentCard } from '../Components/Appointment/AppointmentCard'
import { AppointmentCalendar } from '../Components/Appointment/AppointmentCalendar'
import { useEffect, useState } from 'react'
export const AppointmentManager = () => {
  
  const [appointments, setAppointments] = useState([])
  const [clientlist, setClientList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  
  const [events, setEvents] = useState([])

  const [showCard, setShowCard] = useState(false)
  const [handleData, setHandleData] = useState([])

  const getAppointments = async () => {
    const response = await fetch("http://127.0.0.1:5000/getTurnos")
    const data = await response.json()

    setAppointments(data.data)
  }

  const getData = async () => {
    try {

      const responseEmployee = await fetch("http://127.0.0.1:5000/getWorkers")
      const dataEmployee = await responseEmployee.json()

      setEmployeeList(dataEmployee.data)

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

  const getEvents = () => {
    const formatedAppointments = appointments.map((appointment) => {

      const client = clientlist.find(c => c.id === Number(appointment.cliente));
      const clientName = client ? `${client.nombre} ${client.apellido}` : "Cliente desconocido";
      const clientGenre = client ? client.genero : "Genero desconocido"; 
      const clientPhone = client ? client.telefono : "Telefono desconocido";

      const employee = employeeList.find(e => e.id === Number(appointment.empleado));
      const employeeName = employee ? employee.nombre : "Empleado desconocido";

      const service = serviceList.find(s => s.id === Number(appointment.servicio));
      const serviceName = service ? service.nombre : "Servicio desconocido";
      const duration = service ? service.tiempo : 30;
      const servicePrice = service ? service.precio : "Precio desconocido";

      const start = `${appointment.fecha}T${appointment.hora}`;
      const startDate = new Date(start);

      const endDate = new Date(startDate.getTime() + duration * 60000);
      const end = `${appointment.fecha}T${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

      return {
        id: appointment.id,
        title: `${clientName} - ${serviceName}`,
        start,
        end,
        extendedProps: {
          estado: appointment.estado,
          note: appointment.note,
          empleado: `${employeeName}`,
          cliente: `${clientName}`,
          servicio: `${serviceName}`,
          precio: `${servicePrice}`,
          fecha: appointment.fecha,
          genero: `${clientGenre}`,
          telefono: `${clientPhone}`
        }
      };
    });

    setEvents(formatedAppointments);
  };

  const toggleModalCard = () => {
    setShowCard(!showCard)
  }

  const handleEventClick = (clickInfo) => {
    const data = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      ...clickInfo.event.extendedProps
    }

    setHandleData(data)
    toggleModalCard()
  }

  const refreshAppointments = async () => {
    await getAppointments(); 
    getEvents();             
  };

  useEffect(() => {
    getAppointments();
    getData();
  }, []);

  useEffect(() => {
    if (appointments.length > 0 && clientlist.length > 0 && serviceList.length > 0) {
      getEvents();
    }
  }, [appointments, clientlist, serviceList]);

  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <h2 className='titleSection'>Gestion de turnos</h2>

        <AppointmentCalendar
          events={events}
          onEventClick={handleEventClick} 
        />        
      </div>
      <AppointmentCard show={showCard} handleData={handleData} toggleModalCard={toggleModalCard} refreshAppointments={refreshAppointments}/>

    </>
  )
}

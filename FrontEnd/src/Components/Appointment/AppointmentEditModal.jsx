import styles from "./AppointmentEditModal.module.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const AppointmentEditModal = ({show, toggleEditModal, appointmentId, refreshAppointments}) => {
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [clientValue, setClientValue] = useState("");
  const [employeeValue, setEmployeeValue] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const [clientlist, setClientList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const onInputChange = (event) => {
    event.target.name === "date"
      ? setDateValue(event.target.value)
      : event.target.name === "time"
      ? setTimeValue(event.target.value)
      : event.target.name === "service"
      ? setServiceValue(event.target.value)
      : event.target.name === "client"
      ? setClientValue(event.target.value)
      : setNoteValue(event.target.value);
  };

  const clearInputs = () => {
    setDateValue("");
    setTimeValue("");
    setServiceValue("");
    setClientValue("");
    setEmployeeValue("");
    setNoteValue("");
  };

  const onSubmitAppointment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://bookmystyle.onrender.com/editTurno/${appointmentId}`, {
        method: "PUT",
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
          servicio: serviceValue,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'El turno fue editado correctamente',
          confirmButtonColor: '#FF4ED2'
        })
        clearInputs();
        refreshAppointments();
        toggleEditModal();
        setTimeout(() =>{
          window.location.reload();
        }, 1000)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al editar el turno',
          text: 'Por favor, revise que ingreso los datos correctamente',
          confirmButtonColor: '#FF4ED2'
        })
      }
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error por parte del servidor',
          text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
          confirmButtonColor: '#FF4ED2'
        })
        console.log("Hubo un error al conectar con el servidor", error);
    }
  };

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("User_data"));
    setEmployeeValue(user);

    try {
      const responseClient = await fetch("https://bookmystyle.onrender.com/getClients");
      const dataClient = await responseClient.json();

      setClientList(dataClient.data);

      const responseService = await fetch("https://bookmystyle.onrender.com/getServices");
      const dataService = await responseService.json();

      setServiceList(dataService.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error por parte del servidor',
        text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
        confirmButtonColor: '#FF4ED2'
      })
      console.log("Hubo un error al conectarse con el servidor", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showCard : ""}`}>
        <section className={styles.formContainer}>
        <div className={styles.headerCont}>
            <p className={styles.formTitle}>
                Complete el formulario para editar el turno
            </p>
            <button className={styles.exitBtn} onClick={toggleEditModal}>X</button>
        </div>
        <form onSubmit={onSubmitAppointment}>
          <div className={styles.blockContainer}>
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              name="date"
              id="date"
              value={dateValue}
              onChange={onInputChange}
              required
            />
          </div>

          <div className={styles.blockContainer}>
            <label htmlFor="time">Hora</label>
            <input
              type="time"
              name="time"
              id="time"
              min={"9:00"}
              max={"20:00"}
              value={timeValue}
              onChange={onInputChange}
              required
            />
          </div>

          <div className={styles.blockContainer}>
            <label htmlFor="service">Servicio</label>
            <select
              name="service"
              id="service"
              value={serviceValue}
              onChange={onInputChange}
              required
            >
              <option value="">Seleccione el servicio</option>
              {serviceList.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.blockContainer}>
            <label htmlFor="client">Cliente</label>
            <select
              name="client"
              id="client"
              value={clientValue}
              onChange={onInputChange}
              required
            >
              <option value="">Seleccione el cliente</option>
              {clientlist.map((client) => (
                <option
                  key={client.id}
                  value={client.id}
                >{`${client.nombre} ${client.apellido}`}</option>
              ))}
            </select>
          </div>

          <div className={styles.blockContainer}>
            <label htmlFor="Employee">Empleado</label>
            <input type="text" value={employeeValue.usuario} disabled={true} required/>
          </div>

          <div className={styles.blockContainer}>
            <label htmlFor="Employee">Estado</label>
            <input type="text" value={"confirmado"} disabled={true} required/>
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
          <button className={styles.confirmAppointment}>Editar turno</button>
        </form>
      </section>
      </div>
    </>
  );
};

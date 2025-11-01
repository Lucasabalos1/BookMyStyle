import { useEffect, useState } from "react"
import styles from "./HistoryFilter.module.css"
import Swal from "sweetalert2"

export const HistoryFilter = ({setClientInputSelected, setEmployeeInputSelected, setDateInputSelected}) => {
  
  const [clientList, setClientList] = useState([])
  const [employeeList, setEmployeeList] = useState([])

  const [clientValue, setClientValue] = useState("")
  const [employeeValue, setEmployeeValue] = useState("")
  const [dataValue, setDataValue] = useState("")


const fetchList = async (url, setter, errorMsg) => {
  try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setter(data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: `${errorMsg}`,
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
      console.log("Hubo un error al conectar con el servidor", error)
    }
  }

  const onInputChange = (event) => {
    if (event.target.name === "cliente") {
      setClientValue(event.target.value)
      setClientInputSelected(event.target.value)
    }
    if (event.target.name === "empleado") {
      setEmployeeValue(event.target.value)
      setEmployeeInputSelected(event.target.value)
    }
    if (event.target.name === "fecha") {
      setDataValue(event.target.value)
      setDateInputSelected(event.target.value)
    }
  }

  const clearFilters = () => {
    setClientValue("")
    setEmployeeValue("")
    setDataValue("")
    setClientInputSelected("")
    setEmployeeInputSelected("")
    setDateInputSelected("")
  }

  useEffect(() => {
    fetchList("https://bookmystyle.onrender.com/getClients", setClientList, "Hubo un error al traer los clientes")
    fetchList("https://bookmystyle.onrender.com/getWorkers", setEmployeeList, "Hubo un error al traer los empleados")
  }, [])

  return (
    <>
      <section className={styles.filterContainer}>
        <h2 className={styles.filterTitle}>Filtros</h2>
        <div className={styles.inputsContainer}>
            <div className={styles.inputBlock}>
                <label htmlFor="cliente">Cliente</label>
                <select name="cliente" id="cliente" onChange={onInputChange} value={clientValue}>
                    <option value="">Seleccione el cliente</option>
                    {clientList.map((client) => (
                      <option key={client.id} value={client.id}>{`${client.nombre} ${client.apellido}`}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputBlock}>
                <label htmlFor="empleado">Empleado</label>
                <select name="empleado" id="empleado" onChange={onInputChange} value={employeeValue}>
                    <option value="">Seleccione el empleado</option>
                    {employeeList.map((employee) => (
                      <option key={employee.id} value={employee.id}>{`${employee.nombre} ${employee.apellido}`}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputBlock}>
                <label htmlFor="fecha">Fecha</label>
                <input type="date" name="fecha" placeholder="Seleccione una fecha" onChange={onInputChange} value={dataValue}/>
            </div>
        </div>
        <div className={styles.clearBtnContainer}>
          <button className={styles.clearBtn} onClick={clearFilters}>Limpiar Filtros</button>
        </div>
      </section>
    </>
  )
}

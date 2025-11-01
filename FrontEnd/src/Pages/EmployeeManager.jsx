import { useEffect, useState } from "react"
import { Header } from "../Components/Global/Header"
import { EmployeeCard } from "../Components/GestionEmpleados/EmployeeCard"
import { CreateEmployeeModal } from "../Components/GestionEmpleados/CreateEmployeeModal"
import styles from "./EmployeeManager.module.css"
import Swal from "sweetalert2"
import { Footer } from "../Components/Global/Footer"

export const EmployeeManager = () => {
  
  const [employees, setEmployees] = useState([])
  const [showCreateModal, setshowCreateModal] = useState(false)

  const toggleCreateModal = () => {
    setshowCreateModal(prev => !prev)
  }

  const getEmployee = async () => {
    try {
      const response = await fetch("https://bookmystyle.onrender.com/getWorkers")
      const data = await response.json()
      if(data.success){
        setEmployees(data.data)
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

  useEffect(() => {
      getEmployee()
  },[])
  
  return (
    <>
      <Header/>

      <div className={styles.mainContainer}>
        <h2 className='titleSection'>Gestion de empleados</h2>
        <hr/>
        <div className={styles.addEmployeeButtonContainer}>
          <button className={styles.addEmployeeButton} onClick={toggleCreateModal}>Agregar empleado</button>
        </div>
        <section className={styles.employeeCardsContainer}>
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} getEmployee={getEmployee} />
          ))}
        </section>

        <CreateEmployeeModal show={showCreateModal} toggleCreateModal={toggleCreateModal} onEmployeeCreated={getEmployee}/>
      </div>
      <Footer />
    </>
  )
}

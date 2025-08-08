import { useEffect, useState } from "react"
import { Header } from "../Components/Global/Header"
import { EmployeeCard } from "../Components/GestionEmpleados/EmployeeCard"
import { CreateEmployeeModal } from "../Components/GestionEmpleados/CreateEmployeeModal"
import styles from "./EmployeeManager.module.css"


export const EmployeeManager = () => {
  
  const [employees, setEmployees] = useState([])
  const [showCreateModal, setshowCreateModal] = useState(false)

  const toggleCreateModal = () => {
    setshowCreateModal(!showCreateModal)
  }

  const getEmployee = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getWorkers")
      const data = await response.json()
      if(data.success){
        setEmployees(data.data)
      }
    } catch (error) {
      console.log("Error al conectar con el servidor", error)      
    }
  }

  useEffect(() => {
      getEmployee()
  },[])
  
  return (
    <>
      <Header/>

      <div className={styles.mainContainer}>
        <h2>Gestion de empleados</h2>
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
    </>
  )
}

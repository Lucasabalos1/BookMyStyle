import styles from "./EmployeeCard.module.css"
import { EditEmployeeModal } from "./EditEmployeeModal"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"
const userRolMap = {
    "user_admin": "Administrador",
    "user_empleado": "Empleado"
}

export const EmployeeCard = ({employee, getEmployee}) => {
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const deleteEmployee = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/eliminarEmpleado/${employee.id}`,{
            method: "DELETE"
        })
        const data = await response.json()

        if(data.success){
            alert("Empleado eliminado con exito")
            getEmployee()
        }else{
            alert("Error al tratar de eliminar al empleado")
        }
    } catch (error) {
        console.log("Hubo un error al conectar con el servidor", error)
    }
  }

  return (
    <>
      <article className={styles.employeeCard}>
        <div className={styles.employeeInfo}>
            <p>{`${employee.nombre} ${employee.apellido}`}</p>
            <p>{employee.correo}</p>
            <p>{userRolMap[employee.rol]}</p>
        </div>

        <div className={styles.buttonsContainer}>
            <button className={styles.editEmployee} onClick={toggleEditModal}>Editar</button>
            <button className={styles.deleteEmployee} onClick={toggleDeleteModal}>Eliminar</button>
        </div>
      </article>
      <EditEmployeeModal show={showEditModal} toggleEditModal={toggleEditModal} employee={employee} getEmployee={getEmployee}/>
      <DeleteModal show={showDeleteModal} toggleDeleteModal={toggleDeleteModal} deleteEmployee={deleteEmployee}/>
    </>
  )
}
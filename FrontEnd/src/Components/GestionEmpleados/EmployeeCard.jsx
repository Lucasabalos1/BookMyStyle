import styles from "./EmployeeCard.module.css"
import { EditEmployeeModal } from "./EditEmployeeModal"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"
import Swal from "sweetalert2"

const userRolMap = {
    "user_admin": "Administrador",
    "user_empleado": "Empleado"
}

export const EmployeeCard = ({employee, getEmployee}) => {
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleEditModal = () => {
    setShowEditModal(prev => !prev)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(prev => !prev)
  }

  const deleteEmployee = async() => {
    try {
      const user_actual = JSON.parse(localStorage.getItem("User_data"))

      if(user_actual.id === employee.id){
        Swal.fire({
          icon: 'warning',
          title: 'No puedes eliminar al empleado actual',
          confirmButtonColor: '#FF4ED2'
        })
        toggleDeleteModal()
        return;
      }
      

      const response = await fetch(`https://bookmystyle.onrender.com/eliminarEmpleado/${employee.id}`,{
          method: "DELETE"
      })
      const data = await response.json()

      if(data.success){
        Swal.fire({
          icon: 'success',
          title: 'El empleado a sido eliminado con exito',
          confirmButtonColor: '#FF4ED2'
        })
          getEmployee()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al eliminar el empleado',
          text: 'Por favor, refresque la pagina e intentelo nuevamente',
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
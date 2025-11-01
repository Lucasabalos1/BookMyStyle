import styles from "./CreateEmployeeModal.module.css"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const userRolMap = {
    "Administrador": "user_admin",
    "Empleado": "user_empleado"
}

export const EditEmployeeModal = ({show, toggleEditModal,employee, getEmployee}) => {
  
  const [emailEditValue, setEmailEditValue] = useState("")
  const [passwordEditValue, setPasswordEditValue] = useState("")
  const [nameEditValue, setNameEditValue] = useState("")
  const [lastNameEditValue, setLastNameEditValue] = useState("")
  const [rolEditValue, setRolEditValue] = useState("")
    
  const onInputChange = (event) => {
  
    (event.target.name === "correoEdit") ? setEmailEditValue(event.target.value) :
    (event.target.name === "passwordEdit") ? setPasswordEditValue(event.target.value) :
    (event.target.name === "nameEdit") ? setNameEditValue(event.target.value) :
    (event.target.name === "lastNameEdit") ? setLastNameEditValue(event.target.value) :
    setRolEditValue(event.target.value)
  }
  
  const clearInputs = () => {
      setEmailEditValue("")
      setPasswordEditValue("")
      setNameEditValue("")
      setLastNameEditValue("")
      setRolEditValue("")
  }

  const setActualValues = () => {
    setEmailEditValue(employee.correo)
    setNameEditValue(employee.nombre)
    setLastNameEditValue(employee.apellido)
  }

  useEffect(() => {
    setActualValues()
  },[])

  const onSubmitEmployee = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`https://bookmystyle.onrender.com/editarEmpleado/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailEditValue,
          password: passwordEditValue,
          nombre: nameEditValue,
          apellido: lastNameEditValue,
          rol: userRolMap[rolEditValue]
        })
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'El empleado se edito correctamente',
          confirmButtonColor: '#FF4ED2'
        })
        toggleEditModal()
        clearInputs()
        getEmployee()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al editar al empleado',
          text: 'Por favor, refresque la pagina e intentelo de nuevo',
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
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.formCreateContainer}>
            <form onSubmit={onSubmitEmployee}>
                <div className={styles.closeBtnContainer}>
                    <button type="button" className={styles.closeBtn} onClick={toggleEditModal}>X</button>
                </div>
                <h2>Complete los datos para editar al empleado</h2>
      
                <label htmlFor="correoEdit">Email</label>
                <input type="email" name="correoEdit"  placeholder="Ingrese el correo del nuevo empleado" value={emailEditValue} onChange={onInputChange} required />
      
                <label htmlFor="passwordEdit">Contraseña</label>
                <input type="password" name="passwordEdit"  placeholder="Ingrese la contraseña del nuevo empleado" value={passwordEditValue} onChange={onInputChange} minLength={3} maxLength={32} required />
      
                <label htmlFor="nameEdit">Nombre</label>
                <input type="text" name="nameEdit"  placeholder="Ingrese el nombre del nuevo empleado" value={nameEditValue} onChange={onInputChange} minLength={3} maxLength={32} required/>
      
                <label htmlFor="lastNameEdit">Apellido</label>
                <input type="text" name="lastNameEdit"  placeholder="Ingrese el apellido del nuevo empleado" value={lastNameEditValue} onChange={onInputChange} minLength={3} maxLength={32} required/>
                      
                <label htmlFor="rolEdit">Rol</label>
                <select name="rolEdit"  value={rolEditValue} onChange={onInputChange} required>
                    <option value="">Selecciona un rol para el empleado</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                </select>
      
                <button className={styles.addEmployeeButton}>Editar empleado</button>
            </form>
        </div>
    </div>
    </>
  )
}

import { useState } from "react"
import styles from "./CreateEmployeeModal.module.css"
import Swal from "sweetalert2";

const userRolMap = {
    "Administrador": "user_admin",
    "Empleado": "user_empleado"
}

export const CreateEmployeeModal = ({show, toggleCreateModal, onEmployeeCreated}) => {

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [rolValue, setRolValue] = useState("")
  
  const onInputChange = (event) => {

    (event.target.name === "correo") ? setEmailValue(event.target.value) :
    (event.target.name === "password") ? setPasswordValue(event.target.value) :
    (event.target.name === "name") ? setNameValue(event.target.value) :
    (event.target.name === "lastName") ? setLastNameValue(event.target.value) :
    setRolValue(event.target.value)
  }

  const clearInputs = () => {
    setEmailValue("")
    setPasswordValue("")
    setNameValue("")
    setLastNameValue("")
    setRolValue("")
  }

  const onSubmitEmployee = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:5000/addEmpleado',{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          nombre: nameValue,
          apellido: lastNameValue,
          rol: userRolMap[rolValue]
        })
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Empleado creado con exito',
          confirmButtonColor: '#FF4ED2'
        })
        toggleCreateModal()
        onEmployeeCreated()
        clearInputs()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al crear un empleado',
          text: 'Revisa los datos, algo puede estar mal',
          confirmButtonColor: '#FF4ED2'
        })
      }
    } catch (error) {
      console.log("Hubo un error al conectarse con el servidor", error)
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error por parte del servidor',
        text: 'No te preocupes, no es tu culpa, vuelve a intentarlo en 1 minuto',
        confirmButtonColor: '#FF4ED2'
      })
    }
    
  }

  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`}>
        <div className={styles.formCreateContainer}>
            <form onSubmit={onSubmitEmployee}>
                <div className={styles.closeBtnContainer}>
                    <button type="button" className={styles.closeBtn} onClick={toggleCreateModal}>X</button>
                </div>
                <h2>Complete los datos para el nuevo empleado</h2>

                <label htmlFor="correo">Email</label>
                <input type="email" name="correo" id="correo" placeholder="Ingrese el correo del nuevo empleado" value={emailValue} onChange={onInputChange} required/>

                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Ingrese la contraseña del nuevo empleado" value={passwordValue} onChange={onInputChange} required/>

                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" id="name" placeholder="Ingrese el nombre del nuevo empleado" value={nameValue} onChange={onInputChange} required/>

                <label htmlFor="lastName">Apellido</label>
                <input type="text" name="lastName" id="lastName" placeholder="Ingrese el apellido del nuevo empleado" value={lastNameValue} onChange={onInputChange} required/>
                
                <label htmlFor="rol">Rol</label>
                <select name="rol" id="rol" value={rolValue} onChange={onInputChange} required>
                    <option value="">Selecciona un rol para el empleado</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                </select>

                <button className={styles.addEmployeeButton}>Agregar empleado</button>
            </form>
        </div>
      </div>
    </>
  )
}
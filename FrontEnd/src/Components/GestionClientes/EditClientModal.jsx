import { useEffect, useState } from "react"
import styles from "./EditClientModal.module.css"
import Swal from "sweetalert2"

export const EditClientModal = ({show, toggleEditModal, client, getClients}) => {
  
  const [nameEditValue, setNameEditValue] = useState("")
  const [lastNameEditValue, setLastNameEditValue] = useState("")
  const [phoneEditValue, setPhoneEditValue] = useState("")
  const [genreEditValue, setGenreEditValue] = useState("")
  
  const onInputChange = (event) => {
    (event.target.name === "name") ? setNameEditValue(event.target.value) :
    (event.target.name === "lastName") ? setLastNameEditValue(event.target.value) :
    (event.target.name === "phone") ? setPhoneEditValue(event.target.value) :
    setGenreEditValue(event.target.value)
  } 

  const clearInputs = () => {
    setNameEditValue("")
    setLastNameEditValue("")
    setPhoneEditValue("")
    setGenreEditValue("")
  }

  const setActualValues = () => {
    setNameEditValue(client.nombre)
    setLastNameEditValue(client.apellido)
    setPhoneEditValue(client.telefono)
    setGenreEditValue(client.genero)
  }

  //Arreglar bug en el que luego de editar, el setActualInput no se vuelve a ejecutar
  useEffect(() => {
    setActualValues()
  },[])

  const onSubmitClient = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`http://127.0.0.1:5000/editarCliente/${client.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nameEditValue,
            apellido: lastNameEditValue,
            telefono: phoneEditValue,
            genero: genreEditValue
        })
      })

      const data = await response.json()

      if(data.success){
        Swal.fire({
          icon: 'success',
          title: 'El cliente se edito correctamente',
          confirmButtonColor: '#FF4ED2'
        })
        toggleEditModal()
        getClients()
        clearInputs()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'El cliente no pudo ser editado',
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
            <form onSubmit={onSubmitClient}>
                <div className={styles.closeBtnContainer}>
                    <button type="button" className={styles.closeBtn} onClick={toggleEditModal}>X</button>
                </div>
                <h2>Complete los datos para editar al cliente</h2>
            
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name"  placeholder="Ingrese el nombre del nuevo cliente" value={nameEditValue} onChange={onInputChange} minLength={3} maxLength={32} required/>
            
                <label htmlFor="lastName">Apellido</label>
                <input type="text" name="lastName"  placeholder="Ingrese el apellido del nuevo cliente" value={lastNameEditValue} onChange={onInputChange} minLength={3} maxLength={32} required/>

                <label htmlFor="phone">Telefono</label>
                <input type="text" name="phone"  placeholder="Ingrese el telefono del nuevo cliente" value={phoneEditValue} onChange={onInputChange} required/>

                <label htmlFor="genero">Rol</label>
                <select name="genero"  value={genreEditValue} onChange={onInputChange} required>
                    <option value="">Selecciona un genero para el cliente</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            
                <button className={styles.addEmployeeButton}>Editar cliente</button>
            </form>
        </div>
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import styles from "./EditClientModal.module.css"

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
        alert("Se edito el cliente con exito")
        toggleEditModal()
        getClients()
        clearInputs()
    }else{
        alert("No se pudo editar al cliente")
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
                <input type="text" name="name"  placeholder="Ingrese el nombre del nuevo cliente" value={nameEditValue} onChange={onInputChange}/>
            
                <label htmlFor="lastName">Apellido</label>
                <input type="text" name="lastName"  placeholder="Ingrese el apellido del nuevo cliente" value={lastNameEditValue} onChange={onInputChange}/>

                <label htmlFor="phone">Telefono</label>
                <input type="text" name="phone"  placeholder="Ingrese el telefono del nuevo cliente" value={phoneEditValue} onChange={onInputChange}/>

                <label htmlFor="genero">Rol</label>
                <select name="genero"  value={genreEditValue} onChange={onInputChange}>
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

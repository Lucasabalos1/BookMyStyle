import { useState } from "react"
import { Header } from "../Components/Global/Header"
import styles from "./CreateClient.module.css"
import Swal from "sweetalert2"
import { Footer } from "../Components/Global/Footer"

export const CreateClient = () => {

  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setlastNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [genreValue, setGenreValue] = useState("")
  
  const onInputChange = (event) => {
    (event.target.name === "nombre") ? setNameValue(event.target.value) :
    (event.target.name === "apellido") ? setlastNameValue(event.target.value) :
    (event.target.name === "telefono") ? setPhoneValue(event.target.value) : 
    setGenreValue(event.target.value)
  }

  const onSubmitClient = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:5000/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nameValue,
          apellido: lastNameValue,
          telefono: phoneValue,
          genero: genreValue
        })
      })

      const data = await response.json()

      
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente creado con exito',
          confirmButtonColor: '#FF4ED2'
      })
      clearInputs()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al crear el cliente',
          text: 'Por favor revisa los datos ingresados y verifica que el cliente ya no exista',
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
  
  const clearInputs = () => {
    setNameValue("")
    setlastNameValue("")
    setPhoneValue("")
    setGenreValue("")
  }

  return (
    <>
      <Header/>

      <div className={styles.mainContainer}>
        <h2 className='titleSection'>Carga de clientes</h2>
        <section className={styles.formContainer}>
          <h2 >Complete los datos para el nuevo cliente</h2>
          <form onSubmit={onSubmitClient}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre del cliente" value={nameValue} onChange={onInputChange} required/>

            <label htmlFor="apellido">Apellido</label>
            <input type="text" name="apellido" id="apellido" placeholder="Ingrese el apellido del cliente" value={lastNameValue} onChange={onInputChange} required/>

            <label htmlFor="telefono">Telefono</label>
            <input type="number" name="telefono" id="telefono" placeholder="Ingerese el telefono del cliente" value={phoneValue} onChange={onInputChange} required/>

            <label htmlFor="genero">Genero</label>
            <select name="genero" id="genero" value={genreValue} onChange={onInputChange} required>
              <option value="">Selecciona un genero para el cliente</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>

            <button className={styles.submitButton}>Crear cliente</button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  )
}
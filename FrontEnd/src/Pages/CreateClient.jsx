import { useState } from "react"
import { Header } from "../Components/Global/Header"

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

      //Cambiar esto por la libreria de notificaciones
      if (data.success) {
        alert("Empleado creado con exito")
      }else{
        alert("Error al crear el empleado")
      }

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  }

  return (
    <>
      <Header/>

      <form onSubmit={onSubmitClient}>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre del cliente" value={nameValue} onChange={onInputChange}/>

        <label htmlFor="apellido">Apellido</label>
        <input type="text" name="apellido" id="apellido" placeholder="Ingrese el apellido del cliente" value={lastNameValue} onChange={onInputChange}/>

        <label htmlFor="telefono">Telefono</label>
        <input type="number" name="telefono" id="telefono" placeholder="Ingerese el telefono del cliente" value={phoneValue} onChange={onInputChange}/>

        <label htmlFor="genero">Genero</label>
        <select name="genero" id="genero" value={genreValue} onChange={onInputChange}>
            <option value="">Selecciona un genero para el cliente</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
        </select>

        <button>Crear cliente</button>
      </form>
    </>
  )
}
import { useState } from "react"
import styles from "./AddServiceModal.module.css"
import Swal from "sweetalert2"

export const AddServiceModal = ({show, toggleAddModal, getServices}) => {
  
  const [nameValue, setNameValue] = useState("")
  const [timeValue, setTimeValue] = useState("")
  const [priceValue, setPriceValue] = useState("")

  const onInputChange = (event) => {
    (event.target.name) === "nombre"
    ? setNameValue(event.target.value)
    : (event.target.name) === "precio"
    ? setPriceValue(event.target.value)
    : (event.target.name) === "tiempo"
    ? setTimeValue(event.target.value) : ""
  }

  const clearInputs = () => {
    setNameValue("")
    setTimeValue("")
    setPriceValue("")
  }

  const onSubmitService = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`http://127.0.0.1:5000/addServices`, {
        method : "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          nombre: nameValue,
          tiempo: timeValue,
          precio: priceValue
        })
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'El servicio se agrego correctamente',
          confirmButtonColor: '#FF4ED2'
        })
        toggleAddModal()
        getServices()
        clearInputs()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al crear el servicio',
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
      console.log("Hubo un error al conectar con el servicodor", error)
    }


  }

  return (
    <>
      <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`} >
        <section className={`${styles.formCreateContainer} ${show ? styles.scaleContainer : ""}`}>
            <form onSubmit={onSubmitService}>
                <div className={styles.headerContainer}>
                    <div className={styles.closeBtnContainer}>
                        <button type="button" className={styles.closeBtn} onClick={toggleAddModal}>X</button>
                    </div>

                    <h2> Complete los datos del nuevo servicio</h2>
                </div>

                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" id="nombre" placeholder="Ingrese un nombre para el nuevo servicio" value={nameValue} onChange={onInputChange} required/>

                <label htmlFor="tiempo">Tiempo</label>
                <input type="text" name="tiempo" id="tiempo" placeholder="Ingrese el tiempo del nuevo servicio" value={timeValue} onChange={onInputChange} required/>

                <label htmlFor="precio">Precio</label>
                <input type="text" name="precio" id="precio" placeholder="Ingrese un precio para el nuevo servicio" value={priceValue} onChange={onInputChange} required/>

                <button className={styles.confirmService}>Cargar Servicio</button>
            </form>
        </section>
      </div>
    </>
  )
}

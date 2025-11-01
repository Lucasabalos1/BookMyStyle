import styles from "./AddServiceModal.module.css"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export const EditServiceModal = ({show, toggleEditModal, service, getServices}) => {
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
    
    const completeInputs = () => {
      setNameValue(service.nombre)
      setTimeValue(service.tiempo)
      setPriceValue(service.precio)
    }

    const onSubmitEditService = async (event) => {
      event.preventDefault()
  
      try {
        const response = await fetch(`https://bookmystyle.onrender.com/editServices/${service.id}`, {
          method : "PUT",
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
            title: 'El servicio fue editado con exito',
            confirmButtonColor: '#FF4ED2'
          })
          toggleEditModal()
          getServices()
          clearInputs()
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error al editar el servicio',
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

    useEffect(() => {
      if (show && service) {
        completeInputs()
      }
    }, [service, show])
  
    return (
      <>
        <div className={`${styles.modalBackground} ${show ? styles.showModal : ""}`} >
          <section className={`${styles.formCreateContainer} ${show ? styles.scaleContainer : ""}`}>
              <form onSubmit={onSubmitEditService}>
                  <div className={styles.headerContainer}>
                      <div className={styles.closeBtnContainer}>
                          <button type="button" className={styles.closeBtn} onClick={toggleEditModal}>X</button>
                      </div>
  
                      <h2> Complete los nuevos datos para editar el servicio</h2>
                  </div>
  
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" name="nombre" id="nombre" placeholder="Ingrese un nombre para el nuevo servicio" value={nameValue} onChange={onInputChange} minLength={3} maxLength={64} required/>
  
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

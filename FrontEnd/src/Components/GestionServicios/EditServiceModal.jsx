import styles from "./AddServiceModal.module.css"
import { useEffect, useState } from "react"

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
        const response = await fetch(`http://127.0.0.1:5000/editServices/${service.id}`, {
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
          alert("El servicio se edito con exito")
          toggleEditModal()
          getServices()
          clearInputs()
        }else{
          alert("Hubo un error al editar el servicio")
        }
      } catch (error) {
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
                  <input type="text" name="nombre" id="nombre" placeholder="Ingrese un nombre para el nuevo servicio" value={nameValue} onChange={onInputChange}/>
  
                  <label htmlFor="tiempo">Tiempo</label>
                  <input type="text" name="tiempo" id="tiempo" placeholder="Ingrese el tiempo del nuevo servicio" value={timeValue} onChange={onInputChange}/>
  
                  <label htmlFor="precio">Precio</label>
                  <input type="text" name="precio" id="precio" placeholder="Ingrese un precio para el nuevo servicio" value={priceValue} onChange={onInputChange}/>
  
                  <button className={styles.confirmService}>Cargar Servicio</button>
              </form>
          </section>
        </div>
      </>
    )
}

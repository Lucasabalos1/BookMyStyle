import styles from './ServicesManager.module.css'
import { Header } from "../Components/Global/Header"
import { ServiceCard } from '../Components/GestionServicios/ServiceCard'
import { AddServiceModal } from '../Components/GestionServicios/AddServiceModal'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const ServicesManager = () => {
  
  const [serviceList, setServiceList] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  const toggleAddModal = () => {
    setShowAddModal(prev => !prev)
  }

  const getServices = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/getServices')
        const data = await response.json()
        setServiceList(data.data)
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
  


  useEffect(() => {
    getServices()
  },[])

  return (
    <>
      <Header/>

      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <h2 className='titleSection'>Listado de servicios</h2>
        </div>

        <div className={styles.servicesContainer}>
            <div className={styles.headerContainer}>
                <button className={styles.addServiceBtn} onClick={toggleAddModal}>Agregar servicio</button>
            </div>
            <hr />
            <div className={styles.serviceListContainer}>
                <ul className={styles.ulService}>
                    {serviceList.map((service) => (
                        <li key={service.id} className={styles.liService}>
                            <ServiceCard service={service} getServices={getServices} />                         
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>
      
      <AddServiceModal show={showAddModal} toggleAddModal={toggleAddModal} getServices={getServices}/>

    </>
  )
}
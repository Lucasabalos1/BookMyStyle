import styles from './ServicesManager.module.css'
import { Header } from "../Components/Global/Header"
import { ServiceCard } from '../Components/GestionServicios/ServiceCard'
import { useEffect, useState } from 'react'
export const ServicesManager = () => {
  
  const [serviceList, setServiceList] = useState([])
  
  const getServices = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/getServices')
        const data = await response.json()
        setServiceList(data.data)
    } catch (error) {
        console.log("Hubo un error al conectarse con el servidor", error)
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
            <h2>Listado de servicios</h2>
        </div>

        <div className={styles.servicesContainer}>
            <div className={styles.hederContainer}>
                <button className={styles.addServiceBtn}>Agregar servicio</button>
            </div>
            <hr />
            <div className={styles.serviceListContainer}>
                <ul className={styles.ulService}>
                    {serviceList.map((service) => (
                        <li key={service.id} className={styles.liService}>
                            <ServiceCard service={service} />                         
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>
    </>
  )
}
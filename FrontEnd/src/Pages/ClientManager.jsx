import { useEffect, useState } from "react"
import { Header } from "../Components/Global/Header"
import { ClientCard } from "../Components/GestionClientes/ClientCard"
import styles from "./ClientManager.module.css"
import Swal from "sweetalert2"

export const ClientManager = () => {
  
  const [clients, setClients] = useState([])
  
  const getClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getClients")
      const data = await response.json()
      if(data.success){
        setClients(data.data)
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

  useEffect(() => {
    getClients()
  },[])

  return (
    <>
    <Header/>

    <div className={styles.mainContainer}>
      <h2 className='titleSection'>Listado de clientes</h2>

      <section className={styles.clientsCardContainer}>
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} getClients={getClients}/>
        ))}
      </section>
    </div>

    </>
  )
}
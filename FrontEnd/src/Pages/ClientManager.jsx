import { useEffect, useState } from "react"
import { Header } from "../Components/Global/Header"

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
      console.log("Hubo un error al conectarse con el servidor", error)
    }
  }

  useEffect(() => {
    getClients()
  },[])

  return (
    <>
    <Header/>

    <div className="clientsContainer">
      {clients.map(client => (
       <div className="cardContainer">
         <h2>{`${client.nombre} ${client.apellido}`}</h2>
         <h3>{client.telefono}</h3>
         <span>{client.genero}</span>
         <div className="buttonsContainer">
          <button>Editar</button>
          <button>Eliminar</button>
         </div>
       </div>
      ))}
    </div>
    </>
  )
}
import { useEffect, useState } from "react"
import { Header } from "../Components/Global/Header"

export const EmployeeManager = () => {
  
  const [employees, setEmployees] = useState([])

  const getEmployee = async (event) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getWorkers")
      const data = await response.json()
      if(data.success){
        setEmployees(data.data)
      }
    } catch (error) {
      console.log("Error al conectar con el servidor", error)      
    }
  }

  useEffect(() => {
      getEmployee()
  },[])
  
  return (
    <>
      <Header/>

      <div className="employeesContainer">
        {employees.map((employee) => (
          <div key={employee.id} className="cardContainer">
            <h2>{`${employee.nombre} ${employee.apellido}`}</h2>
            <h2>{`${employee.correo}`}</h2>
            <h2>{`${employee.rol}`}</h2>
            <button>Editar</button>
            <button>Eliminar</button>
          </div>
        ))}
      </div>
      
    </>
  )
}

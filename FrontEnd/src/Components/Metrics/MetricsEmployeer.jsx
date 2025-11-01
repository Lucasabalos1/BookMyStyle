import { useEffect, useState } from "react";
import styles from "./Metrics.module.css";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Swal from "sweetalert2";

export const MetricsEmployeer = () => {
  
  const [employeeMetrics, setEmployeeMetrics] = useState([])
  const [incomeData, setIncomeData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([])

  const getEmployeeMetrics = async () => {
    try {
      const response = await fetch('https://bookmystyle.onrender.com/metricas/empleados')
      const data = await response.json()
      console.log(data.data)
      setEmployeeMetrics(data.data)
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
    getEmployeeMetrics()
  },[])

   useEffect(() => {
    const barsIncome = employeeMetrics.map(element => ({
      name: element.nombre,
      ingresos: element.ingresos
    }));
    setIncomeData(barsIncome);

    const barsAppointment = employeeMetrics.map(element => ({
      name: element.nombre,
      turnos: element.turnos
    }))
    setAppointmentData(barsAppointment)
  }, [employeeMetrics]);

  return (
    <>
      <div className={styles.subTitleCont}>
        <h3>Metricas de empleados</h3>
      </div>

      <div className={styles.graphicsContainer}>

          <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
              <h4>Cantidad de ingresos por empleados</h4>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={incomeData}
                margin={{
                  top: 5,
                  right: 40,
                  left: 20,
                  bottom: 5,
                }}
                barSize={15}
              >
              <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }}/>
              <Tooltip 
                contentStyle={{
                  background: '#ffffff',
                  color: '#000000'
                }}
              />
              <Legend
                wrapperStyle={{ color: "#fff" }}
                formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="ingresos" fill="#3229e0ff" background={{ fill: '#fff' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
              <h4>Cantidad de turnos por empleados</h4>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={appointmentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#fff" }}/>
              <YAxis tick={{ fill: "#fff" }} />
              <Tooltip 
                contentStyle={{
                  background: '#ffffff',
                  color: '#000000'
                }}
              />
              <Legend
                wrapperStyle={{ color: "#fff" }}
                formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
              />
              <Line type="monotone" dataKey="turnos" stroke="#3229e0ff" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </div>
    </>
  )
}

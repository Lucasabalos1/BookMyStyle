import { useEffect, useState } from "react";
import styles from "./Metrics.module.css";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Swal from "sweetalert2";

export const MetricsService = () => {
  
  const [serviceMetrics, setServiceMetrics] = useState([])
  const [appointmentServiceData, setAppointmentServiceData] = useState([]);
  const [incomeServiceData , setIncomeServiceData] = useState([])

  const getServiceMetrics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/metricas/servicios')
      const data = await response.json()
      console.log(data.data)
      setServiceMetrics(data.data)
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
    getServiceMetrics()
  },[])

  useEffect(() => {
    const barsAppointment = serviceMetrics.map(element => ({
      name: element.nombre,
      cantidad: element.cantidad_de_turnos
    }));
    setAppointmentServiceData(barsAppointment);

    const barsIncomeService = serviceMetrics.map(element => ({
      name: element.nombre,
      ingresos: element.ingresos
    }));
    setIncomeServiceData(barsIncomeService)
  }, [serviceMetrics]);

  return (
    <>
      <div className={styles.subTitleCont}>
        <h3>Metricas de servicios</h3>
      </div>
      <div className={styles.graphicsContainer}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicTitle}>
            <h4>Cantidad de turnos por servicio</h4>
          </div>

          <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={appointmentServiceData}
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
              <Bar dataKey="cantidad" fill="#3229e0ff" background={{ fill: '#fff' }} />
              </BarChart>
          </ResponsiveContainer>

        </div>

        <div className={styles.graphicContainer}>
          <div className={styles.graphicTitle}>
            <h4>Ingresos generados por servicio</h4>
          </div>

          <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={incomeServiceData}
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
              <Line type="monotone" dataKey="ingresos" stroke="#3229e0ff" activeDot={{ r: 8 }} />
              </LineChart>
          </ResponsiveContainer>

        </div>
      </div>
    </>
  )
}
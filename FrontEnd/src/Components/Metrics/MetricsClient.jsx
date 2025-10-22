import { useEffect, useState } from "react";
import styles from "./Metrics.module.css";
import {PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Swal from "sweetalert2";

const GENDER_COLORS = {
  Masculino: "#3229e0", 
  Femenino: "#FF4ED2",  
};

export const MetricsClient = () => {
  
  const [clientsMetrics, setClientsMetrics] = useState([])
  const [clientsRankingData, setClientsRankingData] = useState([])
  const [clientsGenreData, setClientsGenreData] = useState([])

  const getClientsMetrics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/metricas/clientes')
      const data = await response.json()
      console.log(data.data)
      setClientsMetrics(data.data)
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
      getClientsMetrics()
  },[])

  useEffect(() => {
  if (clientsMetrics?.top_clientes) {
    const barsRanking = clientsMetrics.top_clientes.map(element => ({
      name: element.nombre,
      atenciones: element.cantidad_de_atenciones
    }));
    setClientsRankingData(barsRanking);
  }

  if (clientsMetrics?.distribucion_por_sexo){
    const barsGenre = clientsMetrics.distribucion_por_sexo.map(element => ({
      genero: element.sexo,
      cantidad: element.cantidad 
    }));
    setClientsGenreData(barsGenre)
  }
  }, [clientsMetrics]);

  return (
    <>
      <div className={styles.subTitleCont}>
        <h3>Metricas de clientes</h3>
      </div>

      <div className={styles.graphicsContainer}>
          <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
                <h4>Top clientes recurrentes</h4>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={clientsRankingData}
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
              <Bar dataKey="atenciones" fill="#3229e0ff" background={{ fill: '#fff' }} />
              </BarChart>
            </ResponsiveContainer>            

          </div>

          <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
                <h4>Cantidad de turnos promedio por cliente</h4>
            </div>
            
            <div className={styles.averageClientsContainer}>
              <span className={styles.averageData}>{`${clientsMetrics.promedio_turno_por_cliente} turnos promedios`}</span>
            </div>
           
          </div>

          <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
                <h4>Distribución por sexo</h4>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientsGenreData}
                  dataKey="cantidad"   
                  nameKey="genero"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                {clientsGenreData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GENDER_COLORS[entry.genero] || "#ccc"}
                  />
                ))}
                </Pie>
              <Tooltip />
              <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
      </div>
      
    </>
  )
}
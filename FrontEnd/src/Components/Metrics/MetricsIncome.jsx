import { useEffect, useState } from "react";
import styles from "./Metrics.module.css";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Swal from "sweetalert2";

export const MetricsIncome = () => {
  
  const [incomeMetrics, setIncomeMetrics] = useState([])
  const [topBillingData, setTopBillingData] = useState([])
  const [weekData, setWeekData] =  useState([])

  const getIncomeMetrics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/metricas/ingresos')
      const data = await response.json()
      console.log(data.data)
      setIncomeMetrics(data.data)
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
    getIncomeMetrics()
  },[])

  useEffect(() => {
    if(incomeMetrics?.top_servicios_facturacion){
      const barsBilling = incomeMetrics.top_servicios_facturacion.map(element => ({
        name: element.servicio,
        ingresos: element.ingresos
      }));
      setTopBillingData(barsBilling);
    }
    
    if (incomeMetrics?.ingresos_por_dia_semana) {
      const barsWeek = incomeMetrics.ingresos_por_dia_semana.map(element => ({
        dia: element.dia,
        ingresos: element.ingresos 
      }));
      setWeekData(barsWeek)
    }
  }, [incomeMetrics]);

  return (
    <>
      <div className={styles.subTitleCont}>
        <h3>Metricas de empleados</h3>
      </div>

      <div className={styles.graphicsContainer}>
        <div className={styles.monthContainer}>
          <div className={styles.graphicTitle}>
            <h4>Ingreso total del mes</h4>
          </div>

          <div className={styles.incomeMonthContainer}>
            <div className={styles.monthActualCont}>
              <span>Ingresos del mes actual</span>
              <span className={styles.monthValue}>
                {incomeMetrics.ingresos_mensual
                ? `${incomeMetrics.ingresos_mensual.ingresos_mes_actual}$`
                : "Cargando..."}
              </span>
            </div>

            <div className={styles.monthAnteriorCont}>
              <span>Ingresos del mes anterior</span>
              <span className={styles.monthValue}>
                {incomeMetrics.ingresos_mensual
                ? `${incomeMetrics.ingresos_mensual.ingresos_mes_anterior}$`
                : "Cargando..."}
              </span>
            </div>

            <div className={styles.monthPercentageCont}>
              <span>Porcentaje de diferencia</span>
              <span className={styles.monthValue}>
                {incomeMetrics.ingresos_mensual
                ? `${incomeMetrics.ingresos_mensual.porcetaje_diferencia}%`
                : "Cargando..."}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.graphicContainer}>
          <div className={styles.graphicTitle}>
            <h4>Ingresos por día/semana</h4>
          </div>
            
          <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={weekData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" tick={{ fill: "#fff" }}/>
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

        <div className={styles.graphicContainer}>
            <div className={styles.graphicTitle}>
              <h4>Top servicios que más facturan</h4>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={topBillingData}
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
      </div>
    </>
  )
}

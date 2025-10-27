import styles from "./MetricsPage.module.css"
import { Header } from "../Components/Global/Header"
import { useState } from "react"
import { MetricsClient } from "../Components/Metrics/MetricsClient"
import { MetricsEmployeer } from "../Components/Metrics/MetricsEmployeer"
import { MetricsIncome } from "../Components/Metrics/MetricsIncome"
import { MetricsService } from "../Components/Metrics/MetricsService"
import { Footer } from "../Components/Global/Footer"

const metricsComponents = {
  clientes: <MetricsClient />,
  empleados: <MetricsEmployeer />,
  servicios: <MetricsService />,
  ingresos: <MetricsIncome />,
}

export const MetricsPage = () => {
  
  const [metricSelected, setMetricSelected] = useState("")

  const onInputChange = (event) => {
    setMetricSelected(event.target.value)
  }

  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <h2 className='titleSection'>Gestion de metricas</h2>
        </div>

        <section className={styles.metricsSection}>
            <div className={styles.selectedContainer}>
                <p>Selecciona un tipo de metrica para ver</p>
                <select name="metrica" id="metrica" value={metricSelected} onChange={onInputChange}>
                    <option value="">Sin metrica seleccionada</option>
                    <option value="empleados">Metricas de empleados</option>
                    <option value="clientes">Metricas de clientes</option>
                    <option value="servicios">Metricas de servicios</option>
                    <option value="ingresos">Metricas de ingresos</option>
                </select>
            </div>

            <div className={styles.metricsGraphicsContainer}>
                {metricsComponents[metricSelected] || ""}
            </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
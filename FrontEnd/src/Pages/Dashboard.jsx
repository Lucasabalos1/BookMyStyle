import { Header } from "../Components/Global/Header"
import { Welcome } from "../Components/Dashboard/Welcome"
import { Footer } from "../Components/Global/Footer"
import styles from "./Dashboard.module.css"
import { CardShortcuts } from "../Components/Dashboard/CardShortcuts"

export const Dashboard = () => {
  return (
    <>
      <Header/>
      <Welcome/>
      <div className={styles.shortcutsContainer}>
        <CardShortcuts
          title={"Clientes"}
          subtitles={[
            { label: "Ver clientes", to: "/clientManager" },
            { label: "Añadir clientes", to: "/createClient" }
          ]}
        />
        <CardShortcuts
          title={"Empleado"}
          subtitles={[
            { label: "Gestionar empleados", to: "/employeeManager" }
          ]}
        />
        <CardShortcuts
          title={"Turnos"}
          subtitles={[
            { label: "Crear turnos", to: "/createAppointment" },
            { label: "Ver turnos", to: "/appointmentManager" },
            { label: "Historial de turnos", to: "/appointmentHistory" }
          ]}
        />
        <CardShortcuts
          title={"Servicios"}
          subtitles={[
            { label: "Gestion de servicios", to: "/serviceManager" }
          ]}
        />
        <CardShortcuts
          title={"Metricas"}
          subtitles={[
            { label: "Gestion de metricas", to: "/metricsPage" }
          ]}
        />
        <CardShortcuts
          title={"Configuracion"}
          subtitles={[
            { label: "Gestion de peluqueria", to: "/workManager" }
          ]}
        />
      </div>
      <Footer />
    </>
  )
}
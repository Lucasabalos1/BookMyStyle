import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";         
import styles from "./AppointmentCalendar.module.css"

export const AppointmentCalendar = ({ events, onEventClick }) => {
  return (
    <div className={styles.calendarBackground}>
      <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin
      ]}
      initialView="timeGridDay" // Día con horarios
      slotDuration="00:30:00"   // Intervalo de 30 minutos
      allDaySlot={false}        // Oculta el slot "todo el día"
      events={events}           // Array con tus turnos [{ id, title, start, end }]
      eventClick={onEventClick} // Función que se ejecuta al clickear un evento
      nowIndicator={true}       // Línea que indica la hora actual
    />
    </div>
  );
};
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
      initialView="timeGridDay"
      slotDuration="00:30:00"
      allDaySlot={false}
      events={events}
      eventClick={onEventClick}
      nowIndicator={true}
    />
    </div>
  );
};
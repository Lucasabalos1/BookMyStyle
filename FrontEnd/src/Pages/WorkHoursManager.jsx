import styles from "./WorkHoursManager.module.css"
import { Header } from "../Components/Global/Header"
import { DayCard } from "../Components/WorkMangar/DayCard"
import { useEffect, useRef, useState, } from "react"


export const WorkHoursManager = () => {
  
  const [schedule, setSchedule] = useState([])
  const [isChange, setIsChange] = useState(false)
  const firstLoad = useRef(true);


  const getSchedules = () => {
    const scheduleData = JSON.parse(localStorage.getItem("schedule"));

    if (!scheduleData){
      const arraySchedule = [
        {
          dia: "Lunes",
          datos: { estaAbierto: true, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Martes",
          datos: { estaAbierto: true, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Miercoles",
          datos: { estaAbierto: true, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Jueves",
          datos: { estaAbierto: true, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Viernes",
          datos: { estaAbierto: true, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Sabado",
          datos: { estaAbierto: false, Desde: "10:00", Hasta: "20:00" }
        },
        {
          dia: "Domingo",
          datos: { estaAbierto: false, Desde: "10:00", Hasta: "20:00" }
        }
      ];
      
      localStorage.setItem("schedule", JSON.stringify(arraySchedule))
      setSchedule(arraySchedule)
    }else{
      setSchedule(scheduleData)
    }
    
  }

  const toggleDayState = (index) => {
    setSchedule(prev => {
      const updated = prev.map((item, i) =>
        i === index
          ? { ...item, datos: { ...item.datos, estaAbierto: !item.datos.estaAbierto } }
          : item
      );
      return updated;
    });
  }

  const handleScheduleTimeChange = (index, field, value) => {
    setSchedule(prev => {
      const updated = prev.map((item, i) =>
        i === index
          ? { ...item, datos: { ...item.datos, [field]: value } }
          : item
      );
      return updated;
    });
  };

  const handleSaveNewData = () => {
     localStorage.setItem("schedule", JSON.stringify(schedule))
     setIsChange(false)
  }

  useEffect(() => {
    getSchedules()
  },[])

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      setIsChange(true);
    }
  }, [schedule]);


  return (
    <>
      <Header/>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <h2 className='titleSection'>Gestion de peluqueria</h2>
        </div>

        <section className={styles.managerContainer}>
            <div className={styles.headerContainer}>
                <h3 className={styles.headerTitle}>Configuracion de dias y horarios de atencion</h3>
                <p className={styles.subtitle}>Configura los días y horarios en que tu peluquería estará abierta al público</p>
            </div>

            <div className={styles.scheduleContainer}>
                {schedule.map((item, idx) => (
                  <DayCard
                    key={idx}
                    day={item.dia}
                    state={item.datos.estaAbierto}
                    desde={item.datos.Desde}
                    hasta={item.datos.Hasta}
                    onToggle={() => toggleDayState(idx)}
                    onTimeChange={(field, value) => handleScheduleTimeChange(idx, field, value)}
                  />
                ))}
            </div>

            <div className={styles.confirmSaveBtn}>
              <button className={styles.saveBtn} disabled={!isChange} onClick={handleSaveNewData}>Guardar Cambios</button>
              <span className={`${isChange ? styles.changeMsg : styles.hideMsg} `}>Hay cambios que no fueron guardados</span>
            </div>
        </section>
      </div>
    </>
  )
}
import styles from "./DayCard.module.css"
import { useState } from "react"

export const DayCard = () => {
  
  const [state, setState] = useState(true)
  
  const togleState = () => {
    setState(!state)
  }


  return (
    <>
      <div className={styles.dayCardContainer}>
        <div className={styles.dayContainer}>
            <span className={styles.day}>Lunes</span>
        </div>

        <div className={styles.inputsContainer}>
            <div className={styles.inputBlock}>
                <label htmlFor="Desde">Desde:</label>
                <input type="time" name="Desde" id="Desde"/>
            </div>
            <div className={styles.inputBlock}>
                <label htmlFor="Hasta">Hasta:</label>
                <input type="time" name="Hasta" id="Hasta"/>
            </div>
        </div>

        <div className={styles.stateContainer}>
            <span className={`${styles.state} ${state ? styles.open : styles.closed}`}>
                {state ? 'Abierto' : 'Cerrado'}
            </span>
            <input type="checkbox" className={styles.checkbox} checked={state}/>
            <span className={styles.slider} onClick={togleState}></span>
        </div>
    </div>
    </>
  )
}
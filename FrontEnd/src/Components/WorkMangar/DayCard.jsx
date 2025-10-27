import styles from "./DayCard.module.css"

export const DayCard = ({ day, state, desde, hasta, onToggle, onTimeChange }) => {
  

  return (
    <>
      <div className={styles.dayCardContainer}>
        <div className={styles.dayContainer}>
            <span className={styles.day}>{day}</span>
        </div>

        <div className={styles.controlersContainer}>
            <div className={styles.inputsContainer}>
                <div className={styles.inputBlock}>
                    <label htmlFor={`Desde-${day}`}>Desde:</label>
                    <input type="time" name="Desde" id={`Desde-${day}`} disabled={!state} value={desde} onChange={e => onTimeChange("Desde", e.target.value)}/>
                </div>
                <div className={styles.inputBlock}>
                    <label htmlFor={`Hasta-${day}`}>Hasta:</label>
                    <input type="time" name="Hasta" id={`Hasta-${day}`} disabled={!state} value={hasta} onChange={e => onTimeChange("Hasta", e.target.value)}/>
                </div>
            </div>

            <div className={styles.stateContainer}>
                <span className={`${styles.state} ${state ? styles.open : styles.closed}`}>
                    {state ? 'Abierto' : 'Cerrado'}
                </span>
                <input type="checkbox" className={styles.checkbox} checked={state} onChange={onToggle}/>
                <span className={styles.slider} onClick={onToggle}></span>
            </div>
        </div>
    </div>
    </>
  )
}
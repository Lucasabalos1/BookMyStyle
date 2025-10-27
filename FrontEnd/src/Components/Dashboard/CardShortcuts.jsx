import styles from "./CardShortcuts.module.css"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export const CardShortcuts = ({title, subtitles}) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("User_data"))
  
      if(!user){
          return;
      }
  
      if (user.rol !== "user_admin") {
          setIsVisible(false)
      }
  }, [])

  return (
    <>
      <article className={`${isVisible ? styles.cardContainer : styles.hideCard}`}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.subtitlesContainer}>
            {subtitles.map((item, idx) => {
                const label = typeof item === "string" ? item : item.label
                const to = typeof item === "string" ? null : item.to
                return (
                  <h4 key={idx} className={styles.subtitleCont}>
                    {to ? (
                      <NavLink
                        to={to}
                      >
                        {label}
                      </NavLink>
                    ) : label}
                  </h4>
                )
            })}
        </div>
      </article>
    </>
  )
}
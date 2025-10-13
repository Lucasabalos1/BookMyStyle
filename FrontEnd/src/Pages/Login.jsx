import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Login.module.css'
import logo from '../assets/BookmystyleLogoInverso.png';
import Swal from "sweetalert2";

export const Login = () => {
  const [emailValue, setEmail] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const navigate = useNavigate()

  const onInputChange = (event) => {
    (event.target.name === "correo") ? setEmail(event.target.value) : setPasswordValue(event.target.value)    
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
        }),
        }
      );

      const data = await response.json();
      if(!data.success){
        Swal.fire({
          icon: 'error',
          title: 'Las credenciales son invalidas',
          text: 'Verifique el correo o la contraseña',
          confirmButtonColor: '#FF4ED2'
        })
        return
      }

      localStorage.setItem("User_data", JSON.stringify(data))

      navigate('/dashboard')
      
      
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  }

  return (
    <>

      <section className={styles.loginSectionContainer}>
        <form onSubmit={onSubmit}>
        
        <div className={styles.loginContainer}>

          <div className={styles.logoContainer}>
            <img src={logo} alt="logo-booymystyle" />
          </div>

          <h4>Iniciar sesion para continuar</h4>
          
          <label className={styles.labelLogin} htmlFor="correo">Correo Electrónico</label>
          <input className={styles.inputLogin} type="email" id="correo" name="correo" placeholder="Ingrese su correo" value={emailValue} onChange={onInputChange} required/>

          <label className={styles.labelLogin} htmlFor="password">Contraseña</label>
          <input className={styles.inputLogin} type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={passwordValue} onChange={onInputChange} required/>

          <button className={styles.submitButton}>Iniciar Sesion</button>
        
        </div>

        </form>
      </section>
    </>
  )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
      if(data.success){
        navigate('/dashboard')
      }
      
    } catch (error) {
      console.error("Error al entrenar el modelo:", error);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        
        <label htmlFor="correo">Correo Electronico</label>
        <input type="email" id="correo" name="correo" placeholder="Ingrese su correo" value={emailValue} onChange={onInputChange}/>

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={passwordValue} onChange={onInputChange}/>

        <button>Login</button>

      </form>
    </>
  )
}

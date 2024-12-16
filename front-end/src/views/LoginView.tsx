import { FormEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import styles from "@/styles/views/LoginView.module.css"
import { authenticateUser } from "../api/UserAPI"

import ErrorMessage from "../components/admin/ErrorMessage"
import EyePass from "../components/svg/EyePass"

export default function LoginView() {
  const [name, setname] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate("/admin")
    }
  })


  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(name === "" || password === "") {
      setError(true)
      return
    }
    setError(false)

    mutate({name, password})
  }

  return (
    <form 
      className={styles.login_container}
      onSubmit={(e) => {handleOnSubmit(e)}}
      noValidate
    >
      <div className={styles.contenedor_label_input}>
        <label htmlFor="name" className={styles.label}>
          Nombre de Usuario
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          placeholder="Usuario"
          value={name}
          onChange={(e) => {setname(e.target.value)}}
        />

        {error && name === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
        )}
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="contraseña" className={styles.label}>
          Contaseña
        </label>
        <input
          id="contraseña"
          className={styles.input}
          type={isVisible? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <div className={styles.pass_eye} onClick={() => setIsVisible(!isVisible)}>
          <EyePass width={20} height={20} isVisible={isVisible} />
        </div>

        {error && password === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
        )}
      </div>

      <button type="submit" className={styles.boton_submit}>Iniciar sesión</button>
    </form>
  )
}

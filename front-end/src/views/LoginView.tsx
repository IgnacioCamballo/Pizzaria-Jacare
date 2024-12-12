import styles from "@/styles/views/LoginView.module.css"
import { FormEvent, useState } from "react"
import ErrorMessage from "../components/admin/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { authenticateUser } from "../api/UserAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function LoginView() {
  const [name, setname] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

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
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />

        {error && password === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
        )}
      </div>

      <button type="submit" className={styles.boton_submit}>Iniciar sesión</button>
    </form>
  )
}

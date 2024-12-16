import { FormEvent, useState } from 'react'

import styles from "@/styles/views/LoginView.module.css"
import ErrorMessage from './ErrorMessage'
import EyePass from '../svg/EyePass'

type UserFormProps = {
  createMutate?: string, 
  editMutate?: string
}

export default function UserForm({}: UserFormProps) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [rank, setRank] = useState(2)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(name === "" || password === "") {
      setError(true)
      return
    }
    setError(false)

    
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
          onChange={(e) => {setName(e.target.value)}}
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
          <EyePass width={20} height={20} isVisible={isVisible}/>
        </div>

        {error && password === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
        )}
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="rango" className={styles.label}>
          Rango
        </label>
        <select
          id="rango"
          className={styles.input}
          value={rank}
          onChange={(e) => {setRank(parseInt(e.target.value))}}
        >
          <option value={2}>Medio. Sin acceso a usuarios</option>
          <option value={1}>Alto. Acceso a usuarios</option>
        </select>

        {error && password === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
        )}
      </div>

      <button type="submit" className={styles.boton_submit}>Iniciar sesión</button>
    </form>
  )
}

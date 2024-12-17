import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { UseMutateAsyncFunction } from '@tanstack/react-query'

import styles from "@/styles/views/LoginView.module.css"
import ErrorMessage from './ErrorMessage'
import EyePass from '../svg/EyePass'
import LoaderSmall from './LoaderSmall'
import { AuthUser } from '../../types/usersTypes'

type UserFormProps = {
  createMutate?: UseMutateAsyncFunction<any, Error, { name: string; password: string; rank: number; }, unknown>, 
  mutationIsError?: boolean,
  editMutate?: UseMutateAsyncFunction<any, Error, {formData: {name: string, password?: string, rank: number, isPass: boolean}, id: string}, unknown>,
  editingUser? : AuthUser,
  isCreate: boolean
}

export default function UserForm({isCreate, createMutate, editMutate, mutationIsError, editingUser}: UserFormProps) {
  const [name, setName] = useState(isCreate ? "" : editingUser!.name)
  const [password, setPassword] = useState("")
  const [rank, setRank] = useState(isCreate ? 2 : editingUser!.rank)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [editingPass, setEditingPass] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [mutationIsError])

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const boolean = e.target.checked
    if(boolean) {setEditingPass(true)} else {setEditingPass(false), setPassword("")}
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    //checks for errors or missing data
    if(isCreate) {
      if(name === "" || password === "" || password.length < 8) {
        setError(true)
        setLoading(false)
        return
      }
    } else {
      if(name === "" || (editingPass === true && password.length < 8)) {
        setError(true)
        setLoading(false)
        return
      }
    }

    if(isCreate) {
      const formData = {name, password, rank}
      await createMutate!(formData)
    } else {
      if(password === "") {
        const formData = {name, rank, isPass: false}
        const formDataId = {formData, id: editingUser!._id}
        await editMutate!(formDataId)
      } else {
        const formData = {name, password, rank, isPass: true} 
        const formDataId = {formData, id: editingUser!._id}
        await editMutate!(formDataId)
      }
    }
    setLoading(false)
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
      </div>

      <div className={styles.contenedor_checkbox}>
        <label htmlFor="checkbox" className={styles.label_checkbox}>
          Crear nueva contraseña
        </label>
        <input
          id="checkbox"
          className={styles.checkbox}
          type="checkbox"
          onChange={(e) => {handleCheckbox(e)}}
        />
      </div>

      {isCreate || editingPass &&
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
          {error && password.length < 8 && (
            <ErrorMessage>La contraseña debe tener al menos 8 caracteres</ErrorMessage>
          )}
        </div>
      }

      {loading ? <LoaderSmall /> : 
        <button type="submit" className={styles.boton_submit}>{isCreate ? "Crear Usuario" : "Guardar Cambios"}</button>
      }
    </form>
  )
}
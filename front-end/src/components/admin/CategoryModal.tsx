import React, { SetStateAction, useEffect, useState } from "react"

import styles from "@/styles/views/CategoriesView.module.css"

import Modal from "../Modal"

type AlertModalProps = {
  onCancel: () => void,
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
  onEdit: (e: { target: { value: SetStateAction<string>; }; }) => void,
  catEditing: string
}

export default function CategoryModal({ onCancel, onSubmit, onEdit, catEditing }: AlertModalProps) {
  const [message, setmessage] = useState("")
  
  useEffect(() => {
    setmessage(catEditing)
  }, [])

  return (
    <Modal onCancel={onCancel}>
      <form className={styles.modal_form} onSubmit={onSubmit}>
        <label htmlFor="catName">{message ? "Cambia el nombre de la categoría" : "Crea una nueva categoría"}</label>
        <input
          className={styles.input}
          id="catName"
          name="category_name"
          type="text"
          defaultValue={catEditing}
          onChange={onEdit}
          placeholder="Nombre de Categoría"
        />
        <div style={{ display: "flex", justifyContent: "space-around", gap: "1rem" }}>
          <button className={styles.modal_button} onClick={onCancel}>
            Cancelar
          </button>

          <button className={styles.modal_button} type="submit">
            {message ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
  )
}


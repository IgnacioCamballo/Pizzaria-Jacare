import React, { SetStateAction, useEffect, useState } from "react"

import styles from "@/styles/views/CategoriesView.module.css"

import Modal from "../Modal"

type AlertModalProps = {
  onCancel: () => void,
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
  onEdit: (e: { target: { value: SetStateAction<string>; }; }) => void,
  subCatEditing: string,
  catName: string
}

export default function SubCategoryModal({ onCancel, onSubmit, onEdit, subCatEditing, catName }: AlertModalProps) {
  const [message, setmessage] = useState("")
  
  useEffect(() => {
    setmessage(subCatEditing)
  }, [])

  return (
    <Modal onCancel={onCancel}>
      <form className={styles.modal_form} onSubmit={onSubmit}>
        <label htmlFor="subCatName">{message ? `Cambia el nombre de la sub categoría ${message}` : `Crea una nueva sub categoría de ${catName}`}</label>
        <input
          className={styles.input}
          id="subCatName"
          name="sub_category_name"
          type="text"
          defaultValue={subCatEditing}
          onChange={onEdit}
          placeholder="Nombre de Sub Categoría"
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


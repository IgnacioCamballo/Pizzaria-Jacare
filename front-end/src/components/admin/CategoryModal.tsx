import React, { SetStateAction } from "react"

import styles from "@/styles/views/CategoriesView.module.css"

import Modal from "../Modal"

type AlertModalProps = {
  onCancel: () => void,
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
  onEdit: (e: { target: { value: SetStateAction<string>; }; }) => void,
  catEditing: string
}

export default function CategoryModal({ onCancel, onSubmit, onEdit, catEditing }: AlertModalProps) {
  return (
    <Modal onCancel={onCancel}>
      <form className={styles.modal_form} onSubmit={onSubmit}>
        <label htmlFor="catName">{catEditing ? "Cambia el nombre de la categoría" : "Crea una nueva categoría"}</label>
        <input
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
            {catEditing ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
  )
}


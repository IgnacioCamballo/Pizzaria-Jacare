import React, { ChangeEvent, useEffect, useState } from "react"

import styles from "@/styles/views/CategoriesView.module.css"

import Modal from "../Modal"
import { SubCategory } from "../../types/subCategoriesTypes";
import { Category } from "../../types/categoriesTypes";

type AlertModalProps = {
  onCancel: () => void,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  onEdit: (e: ChangeEvent<HTMLInputElement>) => void,
  subCatEditing: SubCategory,
  category: Category
}

export default function SubCategoryModal({ onCancel, onSubmit, onEdit, subCatEditing, category }: AlertModalProps) {
  const [message, setmessage] = useState("")

  useEffect(() => {
    setmessage(subCatEditing.nameSub)
  }, [])

  return (
    <Modal onCancel={onCancel}>
      <form className={styles.modal_form} onSubmit={onSubmit}>
        <label htmlFor="subCatName">{message ? `Editar la sub categoría ${message}` : `Crea una nueva sub categoría de ${category.name}`}</label>

        <input
          className={styles.input}
          id="subCatName"
          name="sub_category_name"
          type="text"
          defaultValue={subCatEditing.nameSub}
          onChange={onEdit}
          placeholder="Nombre de Sub Categoría"
        />

        <div className={styles.modal_buttons}>
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


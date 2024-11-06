import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { ProductForm } from "../../types/types";
import styles from "@/styles/views/ActionsProjectView.module.css"

type ProjectFormProps = {
  register: UseFormRegister<ProductForm>
  errors: FieldErrors<ProductForm>
  watch: UseFormWatch<ProductForm>
}

export default function ProjectForm({ register, errors, watch }: ProjectFormProps) {
  const ispizza = watch("category") === "pizza"

  return (
    <>
      <div className={styles.contenedor_label_input}>
        <label htmlFor="name" className={styles.label}>
          Nombre del Producto *
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          placeholder="Nombre del Producto"
          {...register("name", {
            required: "El nombre del Producto es obligatorio",
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="idNumber" className={styles.label}>
          Código del Producto
        </label>
        <input
          id="idNumber"
          className={styles.input}
          type="number"
          placeholder="Código del Producto"
          {...register("idNumber")}
        />
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="category" className={styles.label}>
          Categoría *
        </label>
        <select
          id="category"
          className={styles.input}
          {...register("category", {
            required: "La categoría es obligatoria",
          })}
        >
          <option value="">Seleccionar Categoría</option>
          <option value="pizza">Pizza</option>
          <option value="prato">Plato</option>
          <option value="bebida">Bebida</option>
        </select>

        {errors.category && (
          <ErrorMessage>{errors.category.message}</ErrorMessage>
        )}
      </div>

      {ispizza && (
        <div className={styles.contenedor_label_input}>
          <label htmlFor="subcategory" className={styles.label}>
            Sub-Categoría
          </label>
          <select
            id="subcategory"
            className={styles.input}
            {...register("subcategory")}
          >
            <option value="">Seleccionar Sub-Categoría</option>
            <option value="Clássicas">Clássicas</option>
            <option value="Tradicionais">Tradicionais</option>
            <option value="Especiais">Especiais</option>
          </select>
        </div>
      )}
      
      {ispizza && (
        <div className={styles.contenedor_label_input}>
          <label htmlFor="ingredients" className={styles.label}>
            Ingredientes
          </label>
          <input
            id="ingredients"
            className={styles.input}
            type="text"
            placeholder="Ingredientes"
            {...register("ingredients")}
          />
        </div>
      )}

      <div className={styles.contenedor_label_input}>
        <label htmlFor="price" className={styles.label}>
          {ispizza ? "Precio pizza grande" : "Precio *"}
        </label>
        <input
          id="price"
          className={styles.input}
          type="number"
          placeholder={ispizza ? "Precio pizza grande" : "Precio"}
          {...register("price", {
            required: "El precio es obligatorio",
          })}
        />

        {errors.price && (
          <ErrorMessage>{errors.price.message}</ErrorMessage>
        )}
      </div>

      {ispizza && <div className={styles.contenedor_label_input}>
        <label htmlFor="price2" className={styles.label}>
          Precio pizza pequeña
        </label>
        <input
          id="price2"
          className={styles.input}
          type="number"
          placeholder="Precio pizza pequeña"
          {...register("price2")}
        />
      </div>}

      <div className={styles.contenedor_label_input}>
        <label htmlFor="img" className={styles.label}>
          Foto del producto
        </label>
        <input
          id="img"
          className={styles.input}
          type="text"
          placeholder="Foto del producto"
          {...register("img")}
        />
      </div>
    </>
  )
}
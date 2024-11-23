import { UseMutateFunction, useQuery } from "@tanstack/react-query";

import styles from "@/styles/views/ActionsProjectView.module.css"
import ErrorMessage from "./ErrorMessage";
import { getCategories } from "../../api/CategoryAPI";

//Components
import { Product, ProductForm } from "../../types/types";
import SubCatSelect from "./SubCatSelect";
import { useEffect, useState } from "react";

type ProjectFormProps = {
  mutateCreate?: UseMutateFunction<any, Error, ProductForm, unknown>,
  mutateUpdate?: UseMutateFunction<any, Error, {formData: ProductForm, productId: Product["_id"]}, unknown>,
  editingData?: Product,
  isCreate: boolean
}

export default function ProductsForm({ mutateCreate, mutateUpdate, editingData, isCreate }: ProjectFormProps) {
  const [productId] = useState<Product["_id"]>(isCreate ? "" : editingData!._id)
  const [idNumber, setIdNumber] = useState<ProductForm["idNumber"]>(isCreate ? 0 : editingData?.idNumber) 
  const [name, setName] = useState<ProductForm["name"]>(isCreate ? "" : editingData!.name) 
  const [category, setCategory] = useState<ProductForm["category"]>(isCreate ? "" : editingData!.category) 
  const [categoryName, setCategoryName] = useState<ProductForm["categoryName"]>(isCreate ? "" : editingData!.categoryName) 
  const [subcategory, setSubcategory] = useState<ProductForm["subcategory"]>(isCreate ? "" : editingData?.subcategory) 
  const [subcategoryName, setSubcategoryName] = useState<ProductForm["subcategoryName"]>(isCreate ? "" : editingData?.subcategoryName) 
  const [ingredients, setIngredients] = useState<ProductForm["ingredients"]>(isCreate ? "" : editingData?.ingredients) 
  const [price, setPrice] = useState<ProductForm["price"]>(isCreate ? 0 : editingData!.price) 
  const [price2, setPrice2] = useState<ProductForm["price2"]>(isCreate ? 0 : editingData?.price2) 
  const [img, setImg] = useState<ProductForm["img"]>(isCreate ? "" : editingData?.img) 
  const [error, setError] = useState(false)


  const {data} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  
  //Checks if actual category name is pizza and change to double price and price names
  const ispizza = category === "673c815cd2ab7e85c67cb972"
  
  //Gets the corresponding sub categories for the selected categories and renders the sub categories section
  const actualCategorySubs = data?.find(dataCategory => dataCategory._id === category)?.subCategories
  const isSubCat = category === "" ? false : actualCategorySubs?.length !== (0 && undefined && null)

  useEffect(() => {
    if(!ispizza) {setPrice2(0), setIngredients("")}
    if(!isSubCat) {setSubcategory(undefined), setSubcategoryName("")}
  }, [category])

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("hola")

    if (name === "" || category === "" || price === 0) {
      setError(true)
      return
    }
    const formData = {
      idNumber,
      name,
      category,
      categoryName,
      subcategory,
      subcategoryName,
      ingredients,
      price,
      price2,
      img
    }
    if (isCreate) {
      mutateCreate!(formData)
    } else {
      const dataForm = { formData, productId }
      mutateUpdate!(dataForm)
    }
  }

  return (
    <form
      className={styles.contenedor_formulario}
      onSubmit={(e) => handleSubmitForm(e)}
      noValidate
    >
      <div className={styles.contenedor_label_input}>
        <label htmlFor="name" className={styles.label}>
          Nombre del Producto *
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          placeholder="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && name === "" && (
          <ErrorMessage>El nombre es obligatorio</ErrorMessage>
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
          value={idNumber}
          onChange={(e) => setIdNumber(parseInt(e.target.value))}
        />
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="category" className={styles.label}>
          Categoría *
        </label>
        <select
          id="category"
          className={styles.input}
          value={category}
          onChange={(e) => {setCategory(e.target.value), setCategoryName(data?.find(cat => cat._id === e.target.value)?.name!)}}
        >
          <option value="">Seleccionar Categoría</option>
          {data?.map(dataCategory => (
            <option key={dataCategory._id} value={dataCategory._id}>{dataCategory.name}</option>
          ))}
        </select>

        {error && category === "" && (
          <ErrorMessage>La categoría es obligatoria</ErrorMessage>
        )}
      </div>

      {isSubCat && (
        <div className={styles.contenedor_label_input}>
          <label htmlFor="subcategory" className={styles.label}>
            Sub-Categoría
          </label>

          <SubCatSelect 
            actualCategoryId={category} 
            subcategory={subcategory} 
            setSubcategory={setSubcategory} 
            setSubcategoryName={setSubcategoryName}
          />
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
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
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
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />

        {error && price === 0 && (
          <ErrorMessage>El precio es obligatorio</ErrorMessage>
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
          value={price2}
          onChange={(e) => setPrice2(parseInt(e.target.value))}
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
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className={styles.boton_submit}
      >{isCreate ? "Crear Producto" : "Guardar Cambios"}</button>
    </form>
  )
}

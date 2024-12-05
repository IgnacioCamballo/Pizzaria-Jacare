import { UseMutateFunction, useQuery } from "@tanstack/react-query";

import styles from "@/styles/views/ActionsProjectView.module.css"
import ErrorMessage from "./ErrorMessage";
import { getCategories } from "../../api/CategoryAPI";
import useMenu from "../../hooks/useMenu";

//Components
import { Product, ProductForm } from "../../types/types";
import SubCatSelect from "./SubCatSelect";
import { ChangeEvent, useEffect, useState } from "react";
import CloseXSVG from "../svg/CloseXSVG";

type ProjectFormProps = {
  mutateCreate?: UseMutateFunction<any, Error, ProductForm, unknown>,
  mutateUpdate?: UseMutateFunction<any, Error, {formData: ProductForm, productId: Product["_id"]}, unknown>,
  editingData?: Product,
  isCreate: boolean
}

export default function ProductsForm({ mutateCreate, mutateUpdate, editingData, isCreate }: ProjectFormProps) {
  const {pizza} = useMenu()

  const [productId] = useState<Product["_id"]>(isCreate ? "" : editingData!._id)
  const [idNumber, setIdNumber] = useState<ProductForm["idNumber"]>(isCreate ? 0 : editingData!.idNumber) 
  const [name, setName] = useState<ProductForm["name"]>(isCreate ? "" : editingData!.name) 
  const [category, setCategory] = useState<ProductForm["category"]>(isCreate ? "" : editingData!.category) 
  const [subcategory, setSubcategory] = useState<ProductForm["subcategory"]>(isCreate ? "" : editingData?.subcategory) 
  const [ingredients, setIngredients] = useState<ProductForm["ingredients"]>(isCreate ? "" : editingData?.ingredients) 
  const [price, setPrice] = useState<ProductForm["price"]>(isCreate ? 0 : editingData!.price) 
  const [price2, setPrice2] = useState<ProductForm["price2"]>(isCreate ? 0 : editingData?.price2) 
  const [img, setImg] = useState<ProductForm["img"]>(isCreate ? {name: "", url: "", id: ""} : editingData!.img) 
  const [error, setError] = useState(false)

  const {data} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  //Checks if actual category name is pizza and change to double price and price names
  const ispizza = category === pizza
  
  //Gets the corresponding sub categories for the selected categories and renders the sub categories section
  const actualCategorySubs = data?.find(dataCategory => dataCategory._id === category)?.subCategories
  const isSubCat = category === "" ? false : actualCategorySubs?.length ? true : false

  useEffect(() => {
    if(!isSubCat) {setSubcategory(null)}
    if(!ispizza) {
      setPrice2(0) 
      setIngredients("")
    } else {
      if(subcategory)
      setPrice(data?.find(cat => cat._id === category)?.subCategories.find(subcat => subcat._id === subcategory)?.priceBig!)
      setPrice2(data?.find(cat => cat._id === category)?.subCategories.find(subcat => subcat._id === subcategory)?.priceSmall!)
    }
  }, [category, subcategory])

  //manage the image upload to cloudinary
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {

  }

  const deleteImg = async () => { 
    
    setImg({name: "", url: "", id: ""})
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name === "" || category === "" || price === 0) {
      setError(true)
      return
    }
    const formData = {
      idNumber,
      name,
      category,
      subcategory,
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
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Seleccionar Categoría</option>
          {data?.sort((a, b) => a.orderN - b.orderN).map(dataCategory => (
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
            actualCategory={data!.find(cat => cat._id === category)!} 
            subcategory={subcategory} 
            setSubcategory={setSubcategory} 
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
          disabled={ispizza && subcategory !== "" && subcategory !== null}
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
          disabled={subcategory !== "" && subcategory !== null}
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
        {img.name !== "" ?
          <div id="img" className={styles.input}>
            <p className={styles.input_p}>{img.name}</p>

            <CloseXSVG className={styles.close_button} onClick={() => deleteImg()}/>
          </div>
        : 
          <input
          id="img"
          className={styles.input}
          type="file"
          placeholder="Foto del producto"
          onChange={(e) => uploadImage(e)}
          />
        }
      </div>

      <img src={img.url}/>

      <button
        type="submit"
        className={styles.boton_submit}
      >{isCreate ? "Crear Producto" : "Guardar Cambios"}</button>
    </form>
  )
}


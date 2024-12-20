import { UseMutateAsyncFunction, useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

import styles from "@/styles/views/ActionsProjectView.module.css"
import ErrorMessage from "./ErrorMessage";
import { getCategories } from "../../api/CategoryAPI";
import { deleteImage, updateImage } from "../../api/CloudinaryAPI";
import { Product, ProductForm } from "../../types/types";

//Components
import SubCatSelect from "./SubCatSelect";
import CloseXSVG from "../svg/CloseXSVG";
import ModalAlert from "../ModalAlert";
import ReactModal from "react-modal";
import LoaderSmall from "./LoaderSmall";

type ProjectFormProps = {
  mutateCreate?: UseMutateAsyncFunction<any, Error, ProductForm, unknown>,
  mutateUpdate?: UseMutateAsyncFunction<any, Error, { formData: ProductForm, productId: Product["_id"] }, unknown>,
  editingData?: Product,
  isCreate: boolean
}

export default function ProductsForm({ mutateCreate, mutateUpdate, editingData, isCreate }: ProjectFormProps) {

  const [productId] = useState<Product["_id"]>(isCreate ? "" : editingData!._id)
  const [idNumber, setIdNumber] = useState<ProductForm["idNumber"]>(isCreate ? 0 : editingData!.idNumber)
  const [name, setName] = useState<ProductForm["name"]>(isCreate ? "" : editingData!.name)
  const [veggy, setVeggy] = useState<ProductForm["veggy"]>(isCreate ? false : editingData?.veggy || false)
  const [category, setCategory] = useState<ProductForm["category"]>(isCreate ? "" : editingData!.category)
  const [subcategory, setSubcategory] = useState<ProductForm["subcategory"]>(isCreate ? "" : editingData?.subcategory)
  const [ingredients, setIngredients] = useState<ProductForm["ingredients"]>(isCreate ? "" : editingData?.ingredients)
  const [price, setPrice] = useState<ProductForm["price"]>(isCreate ? 0 : editingData!.price)
  const [price2] = useState<ProductForm["price2"]>(0)
  const [img, setImg] = useState<ProductForm["img"]>(isCreate ? "" : editingData!.img)
  const [error, setError] = useState(false)
  const [newImg, setNewImg] = useState("")
  const [sizeAlert, setSizeAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const { mutateAsync } = useMutation({
    mutationFn: updateImage,
    onError: (error) => {
      toast.error(error.message)
      setLoading(false)
    }
  })
 
  const deleteImageCloudinary = useMutation({
    mutationFn: deleteImage,
    onError: (error) => {
      toast.error(error.message)
      setLoading(false)
    }
  })

  //Configures image from cludinary to show in case the edit product has an existing img
  const cld = new Cloudinary({ cloud: { cloudName: 'diy7juddz' }})
  const image = cld
    .image(img)
    .format('auto')
    .quality('auto')
    .resize(fill().width(160).height(160).gravity(autoGravity()))

  //Gets the corresponding sub categories for the selected categories and renders the sub categories section
  const actualCategorySubs = data?.find(dataCategory => dataCategory._id === category)?.subCategories
  const isSubCat = category === "" ? false : actualCategorySubs?.length ? true : false

  useEffect(() => {
    if (!isSubCat) { setSubcategory("") }
  }, [category, subcategory])

  //manage the image upload to state as preview from form. when form us submitted, the handleSubmitForm will upload to cloudinary
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file.size > 100 * 1024) {
      setSizeAlert(true)
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setNewImg(reader.result!.toString())
    }
  }

  const deleteImg = async () => {
    setNewImg("")
    setImg("")
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (name === "" || category === "" || price === 0) {
      setError(true)
      return
    }

    //if old img is different of newImg deletes from cloudinary old img
    if (!isCreate && editingData?.img !== img) {
      const {mutate} = deleteImageCloudinary
      mutate(editingData!.img)
    }

    //if new img it upload it on cloudinary
    if (newImg !== "") {
      try {
        const uploadedImage = await mutateAsync(newImg)
        const formData = {
          idNumber,
          name,
          veggy,
          category,
          subcategory: subcategory === "" ? null : subcategory,
          ingredients,
          price,
          price2,
          img: uploadedImage
        }

        if (isCreate) {
          await mutateCreate!(formData)
        } else {
          const dataForm = { formData, productId }
          await mutateUpdate!(dataForm)
        }
        setLoading(false)
      } catch (error) {
        console.log("Error subiendo la imagen:", error)
        return
      }
    } else {
      const formData = {
        idNumber,
        name,
        veggy,
        category,
        subcategory: subcategory === "" ? null : subcategory,
        ingredients,
        price,
        price2,
        img
      }

      if (isCreate) {
        await mutateCreate!(formData)
      } else {
        const dataForm = { formData, productId }
        await mutateUpdate!(dataForm)
      }
      setLoading(false)
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

      <div className={styles.contenedor_checkbox}>
        <label htmlFor="checkbox" className={styles.label}>
          Vegetariano
        </label>
        <input
          id="checkbox"
          checked={veggy}
          className={styles.checkbox}
          type="checkbox"
          onChange={(e) => setVeggy(e.target.checked)}
        />
        <div className={styles.message_checkbox}>Marcar si el plato es vegetariano</div>

      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="idNumber" className={styles.label}>
          Código del Producto
        </label>
        <div className={styles.message_small_letter}>Usar para ordenar productos, si no se usa se mostraran por orden de creación</div>
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

      <div className={styles.contenedor_label_input}>
        <label htmlFor="price" className={styles.label}>
          Precio *
        </label>
        <input
          id="price"
          className={styles.input}
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />

        {error && price === 0 && (
          <ErrorMessage>El precio es obligatorio</ErrorMessage>
        )}
      </div>

      <div className={styles.contenedor_label_input}>
        <label htmlFor="img" className={styles.label}>
          Foto del producto
        </label>

        {(img !== "") ?
          <div id="img" className={styles.image}>
            <div className={styles.temporary_img}>
              <AdvancedImage cldImg={image} plugins={[lazyload()]}/>
            </div>
            <CloseXSVG className={styles.close_button} onClick={() => deleteImg()} />
          </div>
          :
          newImg === "" ?
            <input
              id="img"
              className={styles.input}
              type="file"

              onChange={(e) => uploadImage(e)}
            />
            :
            <div className={styles.image}>
              <img src={newImg} alt="imagen temporal" className={styles.temporary_img} />
              <CloseXSVG className={styles.close_button} onClick={() => deleteImg()} />
            </div>
        }
      </div>

      {loading ?
        <LoaderSmall />
        :
        <button
          type="submit"
          className={styles.boton_submit}
        >{isCreate ? "Crear Producto" : "Guardar Cambios"}</button>
      }

      {sizeAlert &&
        <ReactModal
          isOpen={sizeAlert}
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
          onRequestClose={() => setSizeAlert(false)}
        >

          <ModalAlert message="El tamaño de la imagen no debe ser mayor a 100kb" onClick={() => setSizeAlert(false)} />
        </ReactModal>
      }
    </form>
  )
}


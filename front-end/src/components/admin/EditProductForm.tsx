import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product, ProductForm } from "../../types/types";
import ProjectForm from "./ProductForm";
import styles from "@/styles/views/ActionsProjectView.module.css"
import { updateProduct } from "../../api/ProductAPI";
import { toast } from "react-toastify";

type EditProductFormProps = {
  data: ProductForm,
  productId: Product["_id"]
}

export default function EditProductForm({data, productId}: EditProductFormProps) {
  const navigate = useNavigate()

  const initialValues: ProductForm = { 
    idNumber: data.idNumber,
    name: data.name,
    category: data.category,
    subcategory: data.subcategory,
    ingredients: data.ingredients,
    price: data.price,
    price2: data.price2,
    img: data.img
  }
  const {register, watch, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["products"]})
      queryClient.invalidateQueries({queryKey: ["editProduct", productId]})
      toast.success(data)
      navigate("/admin")
    }
  })

  const handleForm = (formData: ProductForm) => {
    const data = {formData, productId}
    mutate(data)
  }
  
  return (
    <div className={styles.contenedor_general}>
      <h1 className={styles.titulo}>Editar Producto</h1>
      <p className={styles.subtitulo}>Llena el formulario para editar el producto</p>
      
      <nav>
        <Link
          className={styles.link_boton}
          to="/admin"
        >Volver a Productos</Link>
      </nav>

      <form 
        className={styles.contenedor_formulario} 
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm
          register={register}
          errors={errors}
          watch={watch}
        />

        <input
          type="submit"
          value="Editar Producto"
          className={styles.boton_submit}
        />
      </form>
    </div>
  )
}

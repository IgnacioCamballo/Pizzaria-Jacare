import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { ProductForm } from "../../types/types";
import { createProduct } from "../../api/ProductAPI";
import ProjectForm from "../../components/admin/ProductForm";
import styles from "@/styles/views/ActionsProjectView.module.css"

export default function CreateProductView() {
  const navigate = useNavigate()

  const initialValues: ProductForm = { 
    idNumber: 0,
    name: "",
    category: "",
    subcategory: undefined,
    ingredients: undefined,
    price: 0,
    price2: 0,
    img: undefined
  }
  const {register, watch, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    navigate("/admin")
    }
  })

  const handleForm = (formData: ProductForm) => {mutate(formData)}

  return (
    <div className={styles.contenedor_general}>
      <h1 className={styles.titulo}>Crear Producto</h1>
      <p className={styles.subtitulo}>Llena el formulario para crear un producto</p>
      
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
          value="Crear Proyecto"
          className={styles.boton_submit}
        />
      </form>
    </div>
  )
}

import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createProduct } from "../../api/ProductAPI";
import ProductsForm from "../../components/admin/ProductsForm";
import styles from "@/styles/views/ActionsProjectView.module.css"

export default function CreateProductView() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  

  const {mutate} = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["products"]})
      queryClient.invalidateQueries({queryKey: ["categories"]})
      queryClient.invalidateQueries({queryKey: ["SubCategory"]})
      navigate("/admin")
    }
  })

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

      <ProductsForm mutateCreate={mutate} isCreate={true}/>  
    </div>
  )
}


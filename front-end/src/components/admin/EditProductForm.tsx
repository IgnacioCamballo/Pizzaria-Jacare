import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "../../types/types";
import ProductsForm from "./ProductsForm";
import styles from "@/styles/views/ActionsProjectView.module.css"
import { updateProduct } from "../../api/ProductAPI";
import { toast } from "react-toastify";

type EditProductFormProps = {
  data: Product,
  productId: Product["_id"]
}

export default function EditProductForm({data, productId}: EditProductFormProps) {
  const navigate = useNavigate()

  

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["products"]})
      queryClient.invalidateQueries({queryKey: ["editProduct", productId]})
      queryClient.invalidateQueries({queryKey: ["categories"]})
      queryClient.invalidateQueries({queryKey: ["SubCategory"]})
      toast.success(data)
      navigate("/admin")
    }
  })

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

     <ProductsForm editingData={data} mutateUpdate={mutate} isCreate={false}/>  
   </div>
  )
}

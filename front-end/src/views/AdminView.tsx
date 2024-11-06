import { Link, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import styles from "@/styles/views/AdminView.module.css"
import { deleteProduct, getProducts } from "../api/ProductAPI"
import { toast } from "react-toastify"
import AlertModal from "../components/admin/AlertModal"
import { useState } from "react"

export default function AdminView() {
  const [alertModal, setAlertModal] = useState(false)
  const [deletingItem, setDeletingItem] = useState("")

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  //gets the products from the database
  const {data, isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })
  
  //deletes product from the database
  const {mutate} = useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["products"]})
      toast.success(data)
    }
  })
  
  //gets the name of the item trying to delete
  function nameDeletingItem () {
    const ProductName = data?.find(product => product._id === deletingItem)?.name
    return ProductName
  }

  if(isLoading) return "Cargando..."

  if(data) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Mis Productos</h1>
      <p className={styles.subtitulo}>Maneja y administra tus productos</p>
      
      <nav className={styles.boton_nuevo}>
        <Link
          className={styles.link_boton}
          to="/admin/products/create"
        >Nuevo Producto</Link>
      </nav>

      {data.length ? (
        <ul role="list" className={styles.listado_productos}>
          {data.map((product) => (
            <li key={product._id} className={styles.producto_lista}>
              <div className={styles.leftCont}>
                <img src={product.img} className={styles.foto}/>

                <div className={styles.contenedor_info}>
                  <Link to={`/admin/products/${product._id}/edit`}
                    className={styles.nombre_producto}
                    >{product.idNumber !== 0 ? `${product.idNumber}. ` : ""}{product.name}</Link>
                  <p className={styles.text_info}>
                    {product.ingredients && `Ingredientes: ${product.ingredients}`}
                  </p>
                  {product.category === "pizza" ? (
                    <div className={styles.prices}>
                      <p className={styles.price}>Grande: $R${product.price}</p>
                      <p className={styles.price}>Media: $R${product.price2}</p>
                    </div>
                  ) : 
                  <p className={styles.price}>$R{product.price}</p>
                }
                </div>
              </div>

              <div className={styles.buttons}>
                <button className={styles.button_edit} onClick={() => {navigate(`/admin/products/${product._id}/edit`)}}>Editar</button>
                <button className={styles.button_delete} onClick={() => {setDeletingItem(product._id), setAlertModal(true)}}>Eliminar</button>
              </div>
            </li>
          ))}

          {alertModal && (
            <AlertModal 
              message={`Seguro que deseas eliminar ${nameDeletingItem()}`}
              onCancel={() => {setAlertModal(false), setDeletingItem("")}}
              onConfirm={() => {mutate(deletingItem), setAlertModal(false), setDeletingItem("")}}
            />
          )}
        </ul>
      ) : (
          <p className={styles.texto_sin_proyectos}>
            No hay Productos todavía {""}
            <Link 
              to="/admin/products/create" 
              className={styles.texto_sin_proyectos_link}
            >Crear Producto</Link>
          </p>
      )}
    </div>
  )
}

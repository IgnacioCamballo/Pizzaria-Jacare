import { useEffect, useState } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import styles from "@/styles/views/AdminView.module.css"
import { deleteProduct, getProducts } from "../api/ProductAPI"
import { getCategories } from "../api/CategoryAPI"
import { Category } from "../types/categoriesTypes"

import AlertModal from "../components/admin/AlertModal"
import ProductsBySubCat from "../components/admin/ProductsBySubCat"

export default function AdminView() {
  const [alertModal, setAlertModal] = useState(false)
  const [deletingItem, setDeletingItem] = useState("")
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const queryClient = useQueryClient()

  //gets the products from the database
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  //gets the categories
  const queryGetCategories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  useEffect(() => {
    const { data } = queryGetCategories
    if (data) { setCategoryList(data) }
  }, [data])

  //deletes product from the database
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success(data)
    }
  })

  //gets the name of the item trying to delete
  function nameDeletingItem() {
    const ProductName = data?.find(product => product._id === deletingItem)?.name
    return ProductName
  }

  if (isLoading) return "Cargando..."

  if (data) return (
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
        <div className={styles.listado_productos}>
          {categoryList.sort((a, b) => a.orderN - b.orderN).map(category =>
            <ProductsBySubCat 
              key={category._id}
              category={category} 
              productsData={data} 
              setAlertModal={setAlertModal} 
              setDeletingItem={setDeletingItem}
            />
          )}
        </div>
      ) : (
        <p className={styles.texto_sin_proyectos}>
          No hay Productos todavía {""}
          <Link
            to="/admin/products/create"
            className={styles.texto_sin_proyectos_link}
          >Crear Producto</Link>
        </p>
      )}

      {alertModal && (
        <AlertModal
          message={`Seguro que deseas eliminar ${nameDeletingItem()}`}
          onCancel={() => { setAlertModal(false), setDeletingItem("") }}
          onConfirm={() => { mutate(deletingItem), setAlertModal(false), setDeletingItem("") }}
        />
      )}
    </div>
  )
}

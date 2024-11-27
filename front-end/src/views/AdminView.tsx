import { useEffect, useState } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import styles from "@/styles/views/AdminView.module.css"
import { deleteProduct } from "../api/ProductAPI"
import { getCategories } from "../api/CategoryAPI"
import { Category } from "../types/categoriesTypes"

import AlertModal from "../components/admin/AlertModal"
import ProductsBySubCat from "../components/admin/ProductsBySubCat"

export default function AdminView() {
  const [alertModal, setAlertModal] = useState(false)
  const [deletingItem, setDeletingItem] = useState("")
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category>({ _id: "", name: "", orderN: 0, subCategories: [], products: [] })

  const queryClient = useQueryClient()

  //gets the categories
  const {data, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  useEffect(() => {
    if (data) {
      data.sort((a, b) => a.orderN - b.orderN)
      setCategoryList(data)
      if(currentCategory._id !== "") {
        setCurrentCategory(data.find(cat => cat._id === currentCategory._id)!)
      } else {
        setCurrentCategory(data[0])
      }
    }
  }, [data])

  //deletes product from the database
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(data)
    }
  })

  //gets the name of the item trying to delete
  function nameDeletingItem() {
    const ProductName = currentCategory.products.find(product => product._id === deletingItem)?.name
    return ProductName
  }

  if (isLoading) return "Cargando..."

  if (categoryList) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Mis Productos</h1>
      <p className={styles.subtitulo}>Maneja y administra tus productos</p>

      <nav className={styles.boton_nuevo}>
        <Link
          className={styles.link_boton}
          to={categoryList?.length !== 0 ? "/admin/products/create" : ""}
        >Nuevo Producto</Link>
      </nav>

      {categoryList.length ? (
        <div>
          <ul className={styles.categories_name_container}>
            {categoryList.map(category =>
              <li
                className={`${styles.category_name} ${category._id === currentCategory._id ? styles.category_name_active : ""}`}
                key={category._id}
                onClick={() => { setCurrentCategory(category) }}
              >
                <p className={styles.category_n_text}>{category.name}</p>
              </li>
            )}
          </ul>

          <div className={styles.categories_container}>
            {currentCategory!.products.length ? (
              <ProductsBySubCat
                category={currentCategory!}
                setAlertModal={setAlertModal}
                setDeletingItem={setDeletingItem}
              />
            ) : (
              <div>
                <p className={styles.texto_cat_sin_proyectos}>
                  Todavía no hay Productos para esta Categoría {""}
                  <Link
                    to="/admin/products/create"
                    className={styles.texto_sin_proyectos_link}
                  >Crear Producto</Link>
                </p>
              </div>
            )}
          </div>


        </div>
      ) : (
        <p className={styles.texto_sin_proyectos}>
          No hay Categorías todavía {""}
          <Link
            to="/admin/categories"
            className={styles.texto_sin_proyectos_link}
          >Crear Categorías</Link>
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

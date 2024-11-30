import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSortable, Sortable } from "react-sortablejs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import styles from "@/styles/views/CategoriesView.module.css"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../api/CategoryAPI";
import { Category, CategoryData } from "../../types/categoriesTypes";
import useMenu from "../../hooks/useMenu";

//Components
import CategoryModal from "../../components/admin/CategoryModal";
import AlertModal from "../../components/admin/AlertModal";
import CategoryItem from "../../components/admin/CategoryItem";

export default function CategoriesView() {
  const {pizza} = useMenu()

  const [alertModal, setAlertModal] = useState(false)
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const [catModal, setCatModal] = useState(false)
  const [catEditing, setCatEditing] = useState("")
  const [catEditingId, setCatEditingId] = useState("")

  const ispizza = catEditingId === pizza

  const queryClient = useQueryClient()

  //querys for categories
  const queryCreateCategory = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(data)
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const queryUpdateCategory = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(data)
    }
  })

  const querySortCategories = useMutation({
    //this is a copy of updateCategory but without toast success
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const queryDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(data)
    }
  })

  //categories api handlers
  useEffect(() => {
    if (data) {
      const SortedData = data.sort((cat1, cat2) => cat1.orderN - cat2.orderN)
      setCategoryList(SortedData)
    }
  }, [data])

  function handleEditingCat(e: { target: { value: SetStateAction<string>; }; }) {
    setCatEditing(e.target.value)
  }

  const handleSubmitCat = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    if (catEditingId === "") {
      //creates new category
      const { mutate } = queryCreateCategory

      const formData: CategoryData = {
        name: catEditing,
        orderN: categoryList.length
      }
      mutate(formData)
      onCloseModal()
    } else {
      //uppdates current category
      const { mutate } = queryUpdateCategory

      const formData: CategoryData = {
        name: catEditing,
        orderN: categoryList.find(cat => cat._id === catEditingId)?.orderN!
      }
      const data = { formData: formData, categoryId: catEditingId }

      mutate(data)
      onCloseModal()
    }
  }

  const handleDeleteCat = () => {
    const { mutate } = queryDeleteCategory
    mutate(catEditingId)
  }

  async function handleSortCategories(evt: Sortable.SortableEvent) {
    const { oldIndex, newIndex } = evt
    const listCopy = [...categoryList]

    const [removed] = listCopy.splice(oldIndex!, 1)
    listCopy.splice(newIndex!, 0, removed)

    const newCatList = listCopy.map((category, index) => ({
      ...category,
      orderN: index
    }))

    const updatePromises = newCatList.map(category => {
      const formData = { name: category.name, orderN: category.orderN };
      const data = { formData, categoryId: category._id };
      return querySortCategories.mutateAsync(data);
    });

    try {
      await Promise.all(updatePromises);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      console.error('Error al actualizar las categorías:', error);
    }
  }

  //gets the name of the item trying to delete
  function nameDeletingCat() {
    const CategoryName = categoryList.find(product => product._id === catEditingId)?.name
    return CategoryName
  }

  const onCloseModal = () => {
    setCatModal(false)
    setCatEditing("")
    setCatEditingId("")
  }

  if (isLoading) return "Cargando..."

  if (data) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Categorías</h1>
      <p className={styles.subtitulo}>Administra las Categorías y Sub-Categorías</p>

      <div className={styles.buttons_cont}>
        <Link className={styles.link_boton} to="/admin">Volver a Productos</Link>

        <button onClick={() => { setCatModal(true) }} className={styles.new_boton}> Nueva Categoría</button>
      </div>

      {categoryList.length ? (
        <ReactSortable
          tag="ul"
          className={styles.list_container}
          list={categoryList}
          setList={setCategoryList}
          dragClass="sortableDrag"
          animation={200}
          easing="ease-out"
          onEnd={(evt) => handleSortCategories(evt)}
        >
          {categoryList.map(category =>
            <CategoryItem
              key={category._id}
              category={category}
              editCategory={() => { setCatModal(true), setCatEditing(category.name), setCatEditingId(category._id) }}
              deleteCategory={() => { setAlertModal(true), setCatEditingId(category._id) }}
            />
          )}
        </ReactSortable>
      ) : (
        <p className={styles.no_categ}>No hay categorías aún</p>
      )}

      {catModal &&
        <CategoryModal
          onCancel={onCloseModal}
          onSubmit={handleSubmitCat}
          onEdit={handleEditingCat}
          catEditing={catEditing}
        />
      }

      {alertModal && (
        <AlertModal
          message={`${ispizza ? `No se puede eliminar ${nameDeletingCat()}` : `Seguro que deseas eliminar ${nameDeletingCat()}`}`}
          onCancel={() => { setAlertModal(false), setCatEditingId("") }}
          onConfirm={() => {ispizza ? {} : (setAlertModal(false), setCatEditingId(""), handleDeleteCat())}}
        />
      )}
    </div>
  )
}
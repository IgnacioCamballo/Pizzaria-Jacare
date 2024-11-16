import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import styles from "@/styles/views/CategoriesView.module.css"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../api/CategoryAPI";
import { Category, CategoryData } from "../../types/categoriesTypes";

//Components
import ArrowSVG from "../../components/svg/ArrowSVG";
import CategoryMenu from "../../components/admin/CategoryMenu";
import CategoryModal from "../../components/admin/CategoryModal";
import AlertModal from "../../components/admin/AlertModal";

export default function CategoriesView() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [showedCat, setShowedCat] = useState<string>("")
  const [subCatShownList, setSubCatShownList] = useState()

  const [alertModal, setAlertModal] = useState(false)

  const [catModal, setCatModal] = useState(false)
  const [catEditing, setCatEditing] = useState("")
  const [catEditingId, setCatEditingId] = useState("")

  const [subCatModal, setSubCatModal] = useState(false)
  const [subCatEditing, setSubCatEditing] = useState("")
  const [subCatEditingId, setSubCatEditingId] = useState("")

  const queryClient = useQueryClient()
  console.log(categoryList)

  //querys for categories
  const queryCreateCategory = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success(data)
    }
  })
  
  const {data, isLoading, isSuccess, } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })
 
  const queryUpdateCategory = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success(data)
    }
  })

  const querySortCategories = useMutation({
    mutationFn: updateCategory
  })

  const queryDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success(data)
    }
  })

  //categories api handlers
  useEffect (() => {
    if(data) {
      const SortedData = data.sort(function (cat1, cat2) {return cat1.orderN - cat2.orderN})
      setCategoryList(SortedData)
    }
  }, [isSuccess])
 
  function handleEditingCat(e: { target: { value: SetStateAction<string>; }; }) {
    setCatEditing(e.target.value)
  }

  
  const handleSubmitCat = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    
    if(catEditingId === "") {
      //creates new category
      const {mutate} = queryCreateCategory

      const formData: CategoryData = {
        name: catEditing,
        orderN: categoryList.length
      }
      mutate(formData)
      onCloseModal()
    } else {
      //uppdates current category
      const {mutate} = queryUpdateCategory

      const formData: CategoryData = {
        name: catEditing,
        orderN: categoryList.find(cat => cat._id === catEditingId)?.orderN!
      }
      const data = {formData: formData, categoryId: catEditingId}
      
      mutate(data)
      onCloseModal()
    }
  }
  
  const handleDeleteCat = () => {
    const {mutate} = queryDeleteCategory
    mutate(catEditingId)
  }

  useEffect(() => {
    const newCatList = categoryList.map((category, index) => ({
      ...category,
      orderN: index
    }))

    const {mutate} = querySortCategories

    newCatList.map(category => {
      const formData = {name: category.name, orderN: category.orderN}
      const data = {formData: formData, categoryId: category._id}
      mutate(data)
    })
  }, [categoryList])
  

  //sets the sub-category to be shown or hide the current one when pressing a categoty arrow
  const SubCatShowed = (cat: Category) => {
    if(cat.name === showedCat) {
      setShowedCat("")
      setSubCatShownList(undefined)
    } else {
      setShowedCat(cat.name)
      //setSubCatShownList(cat.subCateg)
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


  if(isLoading) return "Cargando..."

  if(data) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Categorías</h1>
      <p className={styles.subtitulo}>Administra las Categorías y Sub-Categorías</p>
      
      <div className={styles.buttons_cont}>
        <Link className={styles.link_boton} to="/admin">Volver a Productos</Link>

        <button onClick={() => {setCatModal(true)}} className={styles.new_boton}> Nueva Categoría</button>
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
        >
          {categoryList.map(category => 
            <li key={category._id} className={styles.category_container}>
              <div className={styles.category}>
                <div className={styles.cat_name_side}>
                  <ArrowSVG className={styles.arrow} onClick={() => SubCatShowed(category)}/>

                  <h2 className={styles.category_name}>{category.name}</h2>
                </div>
                <CategoryMenu 
                  onClic1={() => {}} 
                  onClic2={() => {setCatModal(true), setCatEditing(category.name), setCatEditingId(category._id)}} 
                  onClic3={() => {setAlertModal(true), setCatEditingId(category._id)}}
                />
              </div>

              {/* {showedCat === category.name && 
                <ReactSortable 
                  tag="ul" 
                  className={styles.list_container} 
                  list={subCatShownList} 
                  setList={setSubCatShownList}
                  dragClass="sortableDrag"
                  animation={200}
                  easing="ease-out"
                  >
                  {subCatShownList!.map(sub =>
                    <li key={sub.nameSub}>
                      <h2>{sub.nameSub}</h2>
                    </li>
                  )}
                </ReactSortable>
              } */}
            </li>
          )}
        </ReactSortable>
      ) : (
        <>No hay categorías aún</>
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
              message={`Seguro que deseas eliminar ${nameDeletingCat()}`}
              onCancel={() => {setAlertModal(false), setCatEditingId("")}}
              onConfirm={() => {handleDeleteCat(), setAlertModal(false), setCatEditingId("")}}
            />
          )}
    </div>
  )
}

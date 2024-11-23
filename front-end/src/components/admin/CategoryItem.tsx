import { SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactSortable, Sortable } from "react-sortablejs";
import { toast } from "react-toastify";

import styles from "@/styles/views/CategoriesView.module.css"
import { Category } from "../../types/categoriesTypes";
import { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } from "../../api/SubCategoryAPI";
import { SubCategory, SubCategoryData } from "../../types/subCategoriesTypes";

//Components
import CategoryMenu from "../../components/admin/CategoryMenu";
import ArrowSVG from "../../components/svg/ArrowSVG";
import SubCategoryMenu from "./SubCategoryMenu";
import AlertModal from "./AlertModal";
import SubCategoryModal from "./SubCategoryModal";

type CategoryItemProps = {
  category: Category,
  editCategory: () => void,
  deleteCategory: () => void
}

export default function CategoryItem({ category, editCategory, deleteCategory }: CategoryItemProps) {
  const [showSubs, setShowSubs] = useState(false)
  const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([])
  const [alertModal, setAlertModal] = useState(false)

  const [subCatModal, setSubCatModal] = useState(false)
  const [subCatEditing, setSubCatEditing] = useState("")
  const [subCatEditingId, setSubCatEditingId] = useState("")

  const queryClient = useQueryClient()

  //querys for categories
  const queryCreateSubCategory = useMutation({
    mutationFn: createSubCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["SubCategory"]})
      queryClient.invalidateQueries({ queryKey: ["categories"]})
      toast.success(data)
    }
  })

  const { data } = useQuery({
    queryKey: ["SubCategory"],
    queryFn: () => getSubCategories(category._id)
  })

  const queryUpdateSubCategory = useMutation({
    mutationFn: updateSubCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["SubCategory"] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(data)
    }
  })

  const querySortSubCategories = useMutation({
    mutationFn: updateSubCategory,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const queryDeleteSubCategory = useMutation({
    mutationFn: deleteSubCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["SubCategory"]})
      queryClient.invalidateQueries({ queryKey: ["categories"]})
      toast.success(data)
    }
  })

  //categories api handlers
  useEffect(() => {
    if (data?.length) {
      if(data[0].category === category._id) {
      const SortedData = data.sort((cat1, cat2) => cat1.orderNsub - cat2.orderNsub)
      setSubCategoryList(SortedData)
      }
    }
    queryClient.invalidateQueries({ queryKey: ["SubCategory"] })
  }, [data])

  function handleEditingSubCat(e: { target: { value: SetStateAction<string>; }; }) {
    setSubCatEditing(e.target.value)
  }

  const handleSubmitSubCat = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    if (subCatEditingId === "") {
      //creates new category
      const { mutate } = queryCreateSubCategory

      const formData: SubCategoryData = {
        nameSub: subCatEditing,
        orderNsub: subCategoryList.length
      }
      const data = {
        formData: formData,
        catId: category._id
      }
      mutate(data)
      onCloseModal()
      setShowSubs(true)
    } else {
      //uppdates current category
      const { mutate } = queryUpdateSubCategory

      const formData: SubCategoryData = {
        nameSub: subCatEditing,
        orderNsub: subCategoryList.find(cat => cat._id === subCatEditingId)?.orderNsub!
      }
      const data = { formData, catId: category._id, subId: subCatEditingId }

      mutate(data)
      onCloseModal()
    }
  }

  const handleDeleteSubCat = () => {
    const { mutate } = queryDeleteSubCategory
    const isLast = subCategoryList.length === 1
    const deleteData = {
      catId: category._id,
      subId: subCatEditingId
    }
    mutate(deleteData)
    if (isLast) {setSubCategoryList([])}
  }

  async function handleSortSubCategories(evt: Sortable.SortableEvent) {
    const { oldIndex, newIndex } = evt
    const listCopy = [...subCategoryList]

    const [removed] = listCopy.splice(oldIndex!, 1)
    listCopy.splice(newIndex!, 0, removed)
    
    const newCatList = listCopy.map((subCategory, index) => ({
      ...subCategory,
      orderNsub: index
    }))

    const updatePromises = newCatList.map(subCatNew => {
      const formData = { nameSub: subCatNew.nameSub, orderNsub: subCatNew.orderNsub };
      const data = { formData, catId: category._id, subId: subCatNew._id };
      return querySortSubCategories.mutateAsync(data);
    });

    try {
      await Promise.all(updatePromises);
      queryClient.invalidateQueries({ queryKey: ["SubCategory"]})
      queryClient.invalidateQueries({ queryKey: ["categories"]})
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al actualizar las sub-categorías:', error);
    }
  }

  //gets the name of the item trying to delete
  function nameDeletingSubCat() {
    const subCategoryName = subCategoryList.find(product => product._id === subCatEditingId)?.nameSub
    return subCategoryName
  }

  const onCloseModal = () => {
    setSubCatModal(false)
    setSubCatEditing("")
    setSubCatEditingId("")
  }

  return (
    <li key={category._id} className={styles.category_container}>
      <div className={styles.category}>
        <div className={styles.cat_name_side}>
          <ArrowSVG 
            className={`
              ${styles.arrow} 
              ${showSubs && styles.arrow_active} 
              ${!category.subCategories.length && styles.opacity0}  
            `} 
            onClick={() => { setShowSubs(!showSubs) }} 
          />

          <h2 className={styles.category_name}>{category.name}</h2>
        </div>
        <CategoryMenu
          onClic1={() => {setSubCatModal(true)}}
          onClic2={editCategory}
          onClic3={deleteCategory}
        />
      </div>

      {(showSubs && subCategoryList.length) ? 
        <div className={styles.pad}>
        <ReactSortable
          tag="ul"
          className={styles.subCats_container}
          list={subCategoryList}
          setList={setSubCategoryList}
          dragClass="sortableDrag"
          animation={200}
          easing="ease-out"
          onEnd={(evt) => handleSortSubCategories(evt)}
        >
          {subCategoryList.map(subCat =>
            <li key={subCat._id} className={styles.subCategory_container}>
                <h2 className={styles.category_name}>{subCat.nameSub}</h2>
                
                <SubCategoryMenu
                  onClic1={() => { setSubCatModal(true), setSubCatEditing(subCat.nameSub), setSubCatEditingId(subCat._id) }}
                  onClic2={() => { setAlertModal(true), setSubCatEditingId(subCat._id) }}
                />
            </li>
          )}
        </ReactSortable>
        </div>
        : <></>
      }

      {subCatModal &&
        <SubCategoryModal
          onCancel={onCloseModal}
          onSubmit={handleSubmitSubCat}
          onEdit={handleEditingSubCat}
          subCatEditing={subCatEditing}
          catName={category.name}
        />
      }

      {alertModal && (
        <AlertModal
          message={`Seguro que deseas eliminar ${nameDeletingSubCat()}`}
          onCancel={() => { setAlertModal(false), setSubCatEditingId("") }}
          onConfirm={() => { handleDeleteSubCat(), setAlertModal(false), setSubCatEditingId("") }}
        />
      )}
    </li>
  )
}
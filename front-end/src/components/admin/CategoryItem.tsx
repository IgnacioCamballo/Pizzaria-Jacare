import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactSortable, Sortable } from "react-sortablejs";
import { toast } from "react-toastify";

import styles from "@/styles/views/CategoriesView.module.css"
import useMenu from "../../hooks/useMenu";
import { Category } from "../../types/categoriesTypes";
import { createSubCategory, updateSubCategory, deleteSubCategory } from "../../api/SubCategoryAPI";
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

const initialSubCat = {
  _id: "", 
  nameSub: "", 
  orderNsub: 0, 
  category: "", 
  priceSmall: 0,
  priceBig: 0
}

export default function CategoryItem({ category, editCategory, deleteCategory }: CategoryItemProps) {
  const [showSubs, setShowSubs] = useState(false)
  const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([])
  const [alertModal, setAlertModal] = useState(false)

  const [subCatModal, setSubCatModal] = useState(false)
  const [subCatEditing, setSubCatEditing] = useState<SubCategory>(initialSubCat)

  const queryClient = useQueryClient()

  const {pizza} = useMenu()

  useEffect(() => {
    const list = category.subCategories.sort((cat1, cat2) => cat1.orderNsub - cat2.orderNsub)
    setSubCategoryList(list)
  }, [category])

  //querys for categories
  const queryCreateSubCategory = useMutation({
    mutationFn: createSubCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"]})
      toast.success(data)
    }
  })

  const queryUpdateSubCategory = useMutation({
    mutationFn: updateSubCategory,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
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
      queryClient.invalidateQueries({ queryKey: ["categories"]})
      toast.success(data)
    }
  })

  function handleEditingSubCat(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.id === "subCatName") {
      setSubCatEditing({...subCatEditing, nameSub: e.target.value})
    }
    if(e.target.id === "priceBig") {
      setSubCatEditing({...subCatEditing, priceBig: parseInt(e.target.value)})
    }
    if(e.target.id === "priceSmall") {
      setSubCatEditing({...subCatEditing, priceSmall: parseInt(e.target.value)})
    }
  }

  const handleSubmitSubCat = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    if (subCatEditing._id === "") {
      //creates new category
      const { mutate } = queryCreateSubCategory

      const formData: SubCategoryData = {
        nameSub: subCatEditing.nameSub,
        orderNsub: subCategoryList.length,
        priceSmall: subCatEditing.priceSmall,
        priceBig: subCatEditing.priceBig
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
        nameSub: subCatEditing.nameSub,
        orderNsub: subCategoryList.find(cat => cat._id === subCatEditing._id)!.orderNsub!,
        priceSmall: subCatEditing.priceSmall,
        priceBig: subCatEditing.priceBig
      }
      const data = { formData, catId: category._id, subId: subCatEditing._id }

      mutate(data)
      onCloseModal()
    }
  }

  const handleDeleteSubCat = () => {
    const { mutate } = queryDeleteSubCategory
    const deleteData = {
      catId: category._id,
      subId: subCatEditing._id
    }
    mutate(deleteData)
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
      const formData = { 
        nameSub: subCatNew.nameSub, 
        orderNsub: subCatNew.orderNsub
      };
      const data = { formData, catId: category._id, subId: subCatNew._id };
      return querySortSubCategories.mutateAsync(data);
    });

    try {
      await Promise.all(updatePromises);
      queryClient.invalidateQueries({ queryKey: ["categories"]})
    } catch (error) {
      console.error('Error al actualizar las sub-categorías:', error);
    }
  }

  //gets the name of the item trying to delete
  function nameDeletingSubCat() {
    const subCategoryName = subCategoryList.find(subCat => subCat._id === subCatEditing._id)?.nameSub
    return subCategoryName
  }

  const onCloseModal = () => {
    setSubCatModal(false)
    setSubCatEditing(initialSubCat)
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

                <div className={styles.price_menu}>
                  {category._id === pizza && <p className={styles.prices_subCat}><span className={styles.prices_subCat_span}>G:</span> R${subCat.priceBig} <span className={styles.prices_subCat_span}>M:</span> R${subCat.priceSmall}</p>}  
                
                  <SubCategoryMenu
                    onClic1={() => { setSubCatModal(true), setSubCatEditing(subCat)}}
                    onClic2={() => { setAlertModal(true), setSubCatEditing(subCat)}}
                  />
                </div>
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
          category={category}
        />
      }

      {alertModal && (
        <AlertModal
          message={`Seguro que deseas eliminar ${nameDeletingSubCat()}`}
          onCancel={() => { setAlertModal(false), setSubCatEditing(initialSubCat) }}
          onConfirm={() => { handleDeleteSubCat(), setAlertModal(false), setSubCatEditing(initialSubCat) }}
        />
      )}
    </li>
  )
}

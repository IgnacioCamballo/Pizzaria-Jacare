import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import styles from "@/styles/views/CategoriesView.module.css"
import { Category } from "../../types/categoriesTypes";

//Components
import CategoryMenu from "../../components/admin/CategoryMenu";
import ArrowSVG from "../../components/svg/ArrowSVG";

type CategoryItemProps = {
  category: Category,
  menuAction1: () => void,
  menuAction2: () => void,
  menuAction3: () => void
}

export default function CategoryItem({ category, menuAction1, menuAction2, menuAction3 }: CategoryItemProps) {
  const [alertModal, setAlertModal] = useState(false)
  const [SubCategoryList, setSubCategoryList] = useState<[]>([])

  const [subCatModal, setSubCatModal] = useState(false)
  const [subCatEditing, setSubCatEditing] = useState("")
  const [subCatEditingId, setSubCatEditingId] = useState("")

  const queryClient = useQueryClient()
  
  return (
    <li key={category._id} className={styles.category_container}>
      <div className={styles.category}>
        <div className={styles.cat_name_side}>
          <ArrowSVG className={styles.arrow} onClick={() => { }} />

          <h2 className={styles.category_name}>{category.name}</h2>
        </div>
        <CategoryMenu
          onClic1={menuAction1}
          onClic2={menuAction2}
          onClic3={menuAction3}
        />
      </div>
    </li>
  )
}

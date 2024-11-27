
import styles from "@/styles/views/ActionsProjectView.module.css"
import { useEffect, useState } from "react"
import { SubCategory } from "../../types/subCategoriesTypes"
import { Category } from "../../types/categoriesTypes"

type SubCatSelectProps = {
  subcategory: string | undefined | null,
  setSubcategory: React.Dispatch<React.SetStateAction<string | undefined | null>>,
  actualCategory: Category,
}

export default function SubCatSelect({ subcategory, setSubcategory, actualCategory }: SubCatSelectProps) {
  const [subCatsList, setSubCatsList] = useState<SubCategory[]>([])

  useEffect(() => {
    setSubCatsList(actualCategory.subCategories.sort((a, b) => a.orderNsub - b.orderNsub))
  }, [actualCategory])

  return (
    <select
      id="subcategory"
      className={styles.input}
      value={subcategory!}
      onChange={(e) => setSubcategory(e.target.value)}
    >
      <option value="">Seleccionar Sub Categoría</option>

      {subCatsList.map(subCat => (
        <option key={subCat._id} value={subCat._id}>{subCat.nameSub}</option>
      ))}
    </select>
  )
}


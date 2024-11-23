import { UseFormRegister } from "react-hook-form"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import styles from "@/styles/views/ActionsProjectView.module.css"
import { ProductForm } from "../../types/types"
import { getSubCategories } from "../../api/SubCategoryAPI"
import { useEffect, useState } from "react"
import { SubCategory } from "../../types/subCategoriesTypes"

type SubCatSelectProps = {
  subcategory: string | undefined | null,
  setSubcategory: React.Dispatch<React.SetStateAction<string | undefined>>,
  setSubcategoryName: React.Dispatch<React.SetStateAction<string | undefined>>,
  actualCategoryId: string,
}

export default function SubCatSelect({ subcategory, setSubcategory, setSubcategoryName, actualCategoryId }: SubCatSelectProps) {
  const queryClient = useQueryClient()

  const [subCatsList, setSubCatsList] = useState<SubCategory[]>([])

  const { data, refetch } = useQuery({
    queryKey: ["SubCategory"],
    queryFn: () => getSubCategories(actualCategoryId),
    retry: false
  })

  useEffect(() => {
    if (data?.length) {
      if (data[0].category === actualCategoryId) {
        const SortedData = data.sort((cat1, cat2) => cat1.orderNsub - cat2.orderNsub)
        setSubCatsList(SortedData)
      } else {
        queryClient.invalidateQueries({ queryKey: ["SubCategory"] })
        refetch()
      }
    }
  }, [data, actualCategoryId])

  return (
    <select
      id="subcategory"
      className={styles.input}
      value={subcategory!}
      onChange={(e) => {setSubcategory(e.target.value), setSubcategoryName(data?.find(cat => cat._id === e.target.value)?.nameSub)}}
    >
      <option value="">Seleccionar Sub Categoría</option>

      {subCatsList.map(subCat => (
        <option key={subCat._id} value={subCat._id}>{subCat.nameSub}</option>
      ))}
    </select>
  )
}


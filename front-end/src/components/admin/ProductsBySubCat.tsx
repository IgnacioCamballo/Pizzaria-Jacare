import { getSubCategories } from "../../api/SubCategoryAPI"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import styles from "@/styles/views/AdminView.module.css"
import ProductItem from "./ProductItem"
import { Category } from "../../types/categoriesTypes"
import { Product } from "../../types/types"
import { useEffect, useState } from "react"
import { SubCategory } from "../../types/subCategoriesTypes"
import { Link } from "react-router-dom"

type ProductsBySubCatProps = {
  category: Category,
  productsData: Product[],
  setDeletingItem: React.Dispatch<React.SetStateAction<string>>,
  setAlertModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductsBySubCat({ category, productsData, setAlertModal, setDeletingItem }: ProductsBySubCatProps) {
  const queryClient = useQueryClient()

  const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([])

  //gets the subCategories for the categorie given
  const { data } = useQuery({
    queryKey: ["SubCategory"],
    queryFn: () => getSubCategories(category._id),
  })
  console.log(data)

  useEffect(() => {
    if (data?.length) {
      if (data[0].category === category._id) {
        const SortedData = data.sort((cat1, cat2) => cat1.orderNsub - cat2.orderNsub)
        setSubCategoryList(SortedData)
      }
    } else { setSubCategoryList([]) }

    queryClient.invalidateQueries({ queryKey: ["SubCategory"] })
  }, [data])

  if (subCategoryList.length) {
    return (
      <div className={styles.subCat_list}>
        {subCategoryList.map(subcat =>
          <div key={subcat._id}>
            <h2 className={styles.subCat_name}>{subcat.nameSub}</h2>
            {productsData!.filter(product => product.category === category._id && product.subcategory === subcat._id).length ?
              productsData!.filter(product => product.category === category._id && product.subcategory === subcat._id)
                .sort((a, b) => a.idNumber - b.idNumber)
                .map(product =>
                  <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
                ) :
              <p className={styles.texto_cat_sin_proyectos}>
                Todavía no hay Productos para esta Sub Categoría {""}
                <Link
                  to="/admin/products/create"
                  className={styles.texto_sin_proyectos_link}
                >Crear Producto</Link>
              </p>
            }
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {//gets and sorts the products  of this category with no subCategory
          productsData!.filter(product => product.category === category._id && !product.subcategory)
            .sort((a, b) => a.idNumber - b.idNumber)
            .map(product =>
              <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
            )
        }
      </div>
    )
  }
}

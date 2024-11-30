
import styles from "@/styles/views/AdminView.module.css"
import ProductItem from "./ProductItem"
import { Category } from "../../types/categoriesTypes"
import { Product } from "../../types/types"
import { useEffect, useState } from "react"
import { SubCategory } from "../../types/subCategoriesTypes"
import { Link } from "react-router-dom"

type ProductsBySubCatProps = {
  category: Category,
  setDeletingItem: React.Dispatch<React.SetStateAction<string>>,
  setAlertModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductsBySubCat({ category, setAlertModal, setDeletingItem }: ProductsBySubCatProps) {

  const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([])
  const [productsData, setProductsData] = useState<Product[]>([])

  useEffect(() => {
    setSubCategoryList(category.subCategories.sort((a, b) => a.orderNsub - b.orderNsub))
    setProductsData(category.products.sort((a, b) => a.idNumber - b.idNumber))
  }, [category])

  if (subCategoryList.length) {
    return (
      <div className={styles.subCat_list}>
        {productsData.filter(product => !product.subcategory).map(product => 
          <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
        ) }
        
        {subCategoryList.map(subcat =>
          <div key={subcat._id}>
            <h2 className={styles.subCat_name}>{subcat.nameSub}</h2>
            
            <div className={styles.listado_productos}>
              {productsData.filter(product => product.subcategory === subcat._id).length ?
                productsData.filter(product => product.subcategory === subcat._id).map(product =>
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
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className={styles.listado_productos}>
        {//gets and sorts the products  of this category with no subCategory
          productsData!.filter(product => product.category === category._id && !product.subcategory).map(product =>
            <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
          )
        }
      </div>
    )
  }
}

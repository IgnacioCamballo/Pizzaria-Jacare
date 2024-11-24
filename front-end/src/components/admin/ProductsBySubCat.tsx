import { getSubCategories } from "../../api/SubCategoryAPI"
import { useQuery } from "@tanstack/react-query"

import styles from "@/styles/views/AdminView.module.css"
import ProductItem from "./ProductItem"
import { Category } from "../../types/categoriesTypes"
import { Product } from "../../types/types"

type ProductsBySubCatProps = {
  category: Category,
  productsData: Product[],
  setDeletingItem: React.Dispatch<React.SetStateAction<string>>,
  setAlertModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductsBySubCat({category, productsData, setAlertModal, setDeletingItem}: ProductsBySubCatProps) {
 //gets the subCategories for the categorie given
 const { data } = useQuery({
  queryKey: ["SubCategory"],
  queryFn: () => getSubCategories(category._id),
})

if(data) return (
  <div>
    <h2>{category.name}</h2>
    {!category.subCategories?.length ? (
      <div>
        {//gets and sorts the products  of this category with no subCategory
          productsData!.filter(product => product.category === category._id && product.subcategory === "" || undefined)
          .sort((a, b) => a.idNumber - b.idNumber)
          .map(product =>
            <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
          )
        }
      </div>
    ) : (
    data!.sort((a, b) => a.orderNsub - b.orderNsub).map(subcat =>
      <div key={subcat._id}>
        <h2>{subcat.nameSub}</h2>
        {productsData!.filter(product => product.category === category._id && product.subcategory === subcat._id)
          .sort((a, b) => a.idNumber - b.idNumber)
          .map(product => 
            <ProductItem product={product} setAlertModal={setAlertModal} setDeletingItem={setDeletingItem} key={product._id} />
          )
        }
      </div>
    )
    )}
  </div>
)
}

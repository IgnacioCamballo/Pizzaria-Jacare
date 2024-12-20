import { SubCategory } from "../types/subCategoriesTypes";
import { Product } from "../types/types";
import Producto from "./Producto";

type props = {
  subCategory: SubCategory
  products: Product[]
}

const Submenu = ({ subCategory, products }: props) => {

  return (
    <>
      <div className="cabeza_submenu">
        <div className="titulo_submenu">{subCategory.nameSub}</div>
      </div>

      <div className="contenedor_productos_mostrados">
        {products.map(product => (
          <Producto key={product._id} producto={product}/>
        ))}
      </div>

    </>
  )
}

export default Submenu
import useMenu from "../hooks/useMenu";
import { SubCategory } from "../types/subCategoriesTypes";
import { Product } from "../types/types";
import Producto from "./Producto";

type props = {
  subCategory: SubCategory
  products: Product[]
}

const Submenu = ({ subCategory, products }: props) => {
  const {pizza} = useMenu()
  const isPizza = subCategory.category === pizza

  return (
    <>
      <div className="cabeza_submenu">
        <div className="titulo_submenu">{subCategory.nameSub}</div>
        {isPizza && (
          <>
            <div className="descripcion_pizza">
              <p className="tamaño">Grande R$ {subCategory.priceBig}</p>
              <p className="cm">35cm  12 fatias  3 sabores</p>
            </div>

            <div className="descripcion_pizza">
              <p className="tamaño">Media R$ {subCategory.priceSmall}</p>
              <p className="cm">30cm  8 fatias  2 sabores</p>
            </div>
          </>
        )}
      </div>

      <div className="contenedor_productos_mostrados">
        {products.map(product => (
          <Producto key={product._id} producto={product} isPizza={isPizza}/>
        ))}
      </div>

    </>
  )
}

export default Submenu
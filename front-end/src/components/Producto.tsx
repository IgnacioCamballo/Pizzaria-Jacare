import useMenu from "../hooks/useMenu"
import { Product } from "../types/types"

const Producto = ({ producto, isPizza }: { producto: Product, isPizza: boolean }) => {
  const { pizza, handleChangeModal, setProductoActual, delivery, multisabor, setAlertPizza } = useMenu()

  function deliveryActivo() {
    if (delivery === true) {
      if (producto.category !== pizza && multisabor) {
        setAlertPizza(true)
      } else {
        handleChangeModal()
        setProductoActual(producto)
      }
    }
  }

  return (
    <div
      className={delivery ? "contenedor_producto cursor_pointer" : "contenedor_producto"}
      onClick={() => deliveryActivo()}
      aria-label="ver info du item"
    >
      <img className="foto_producto" src="" alt="foto" />

      <div className="texto_producto">
        <p className="titulo_producto"><span>{producto.idNumber}.</span> {producto.name}</p>

        {isPizza ? 
          <>
            <div className="contenedor_ingredientes">
              <p className="ingredientes"> Ingredientes: {producto.ingredients}</p>
            </div>
            {!producto.subcategory && (
              <div className="precio_doble">
                <p className="precio"><span className="span_precio">Grande:</span> R${producto.price}</p>
                <p className="precio"><span className="span_precio">Media:</span> R${producto.price2}</p>
              </div>
            )}
          </>
          : <p className="precio">R${producto.price}</p>
        }
      </div>
    </div>
  )
}

export default Producto
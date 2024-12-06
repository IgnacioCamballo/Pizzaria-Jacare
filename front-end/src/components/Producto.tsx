import useMenu from "../hooks/useMenu"
import { Product } from "../types/types"
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Producto = ({ producto, isPizza }: { producto: Product, isPizza: boolean }) => {
  const { pizza, handleChangeModal, setProductoActual, delivery, multisabor, setAlertPizza } = useMenu()

  const cld = new Cloudinary({ cloud: { cloudName: 'diy7juddz' }})
  const img = cld
    .image(producto.img)
    .format('auto')
    .quality('auto')
    .resize(fill().width(88).height(88).gravity(autoGravity()))
  
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
      <div className="foto_producto">
        <AdvancedImage cldImg={img} plugins={[lazyload()]}/>
      </div>

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
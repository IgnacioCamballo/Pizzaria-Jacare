import { useEffect } from "react"
import useMenu from "../hooks/useMenu"
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const ModalProducto = () => {
  const {
    pizza,
    productoActual,
    tamaño,
    sabores,
    multisabor,
    setTamaño,
    setSabores,
    handleAgregarItem,
    handleCerrarModal
  } = useMenu()

  const cld = new Cloudinary({ cloud: { cloudName: 'diy7juddz' }})
  const img = cld
    .image(productoActual.img)
    .format('auto')
    .quality('auto')
    .resize(fill().width(120).height(120).gravity(autoGravity()))

  useEffect(() => {
    if(productoActual.category === pizza)
      setTamaño("Grande")
  }, [])

  const leyendaSabores = () => {
    if (sabores === 2) {
      return <p className="leyenda_sabores">o próximo sabor escolhido será adicionado a esta pizza</p>
    } else if (sabores === 3) {
      return <p className="leyenda_sabores">Os próximos 2 sabores escolhidos serão adicionados a esta pizza</p>
    }
  }

  return (
    <div className="contenedor_producto_modal">
      <div className="foto_modal_producto">
        <AdvancedImage cldImg={img} plugins={[lazyload()]}/>
      </div>

      <form
        className="texto_producto"
        method="POST"
        onSubmit={handleAgregarItem}
      >
        <p className="titulo_producto"><span>{productoActual.idNumber}.</span> {productoActual.name}</p>

        <button aria-label="cerrar ventana du producto" className="cerrar_modal" onClick={handleCerrarModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {productoActual.category === pizza ? 
          <div className="contenedor_ingredientes">
            <p className="ingredientes"> Ingredientes: {productoActual.ingredients}</p>
            {!multisabor ?
              <>
                <div className="contenedor_tamaño">
                  <p>Tamanho: </p>
                  <select
                    className="tamaño_pizza"
                    name="tamaño_pizza"
                    onChange={(e) => { setTamaño(e.target.value) }}
                    aria-label="seleccionar tamanho da pizza"
                  >
                    <option value="Grande">Grande</option>
                    <option value="Media">Media</option>
                  </select>
                </div>

                <div className="contenedor_sabores">
                  <p>Sabores:</p>
                  <select
                    className="sabores"
                    name="sabores"
                    onChange={(e) => { setSabores(parseInt(e.target.value)) }}
                    aria-label="seleccionar cantidad du sabores"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {tamaño == "Grande" ? <option value="3">3</option> : <></>}
                  </select>
                </div>
                {leyendaSabores()}
              </> : <></>
            }
          </div>
          : <p className="precio">R${productoActual.price}</p>
        }

        <div className="contenedor_boton_agregar_item">
          <button aria-label="agregar item" className="boton_agregar_item" type="submit">{multisabor ? "Adicionar sabor" : "Adicionar ao pedido"}</button>
          <div className="box10px"></div>
        </div>
      </form>
    </div>
  )
}

export default ModalProducto
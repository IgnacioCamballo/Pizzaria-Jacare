import productos from "../data/productos.json";
import { producto } from "../types/types";
import Producto from "./Producto";

type props = {
    categoria: string
    precioGrande: number
    precioMedia: number
}

const Submenu = ({categoria, precioGrande, precioMedia}:props) => {
    const primerLetra = categoria?.charAt(0)
    const sinPrimerLetra = categoria?.slice(1)

    return (
    <>
        <div className="cabeza_submenu">
            <div className="titulo_submenu"><span className="letra_verde">{primerLetra}</span>{sinPrimerLetra}</div>
            {precioGrande !== 0 && (
                <>
                    <div className="descripcion_pizza">
                        <p className="tamaño">Grande R$ {precioGrande}</p>
                        <p className="cm">35cm  12 fatias  3 sabores</p>
                    </div>

                    <div className="descripcion_pizza">
                        <p className="tamaño">Media R$ {precioMedia}</p>
                        <p className="cm">30cm  8 fatias  2 sabores</p>
                    </div>
                </>
            )}
        </div>

        <div className="contenedor_productos_mostrados">
            {productos.filter(producto => producto.subcategoria === categoria).map((producto: producto) => (
                <Producto key={producto.id} producto={producto}/>
            ))}
        </div>
        
    </>
  )
}

export default Submenu
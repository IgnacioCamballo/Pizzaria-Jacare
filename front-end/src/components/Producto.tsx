import useMenu from "../hooks/useMenu"
import { producto } from "../types/types"

const Producto = ({producto}: {producto:producto}) => {
    const {handleChangeModal, setProductoActual, delivery} = useMenu()

    function deliveryActivo () {
        if (delivery === true) {
            handleChangeModal()
            setProductoActual(producto)
        }
    }

    return (
        <div 
            className={delivery ? "contenedor_producto cursor_pointer" : "contenedor_producto"}
            onClick={() => {deliveryActivo()}}
            aria-label="ver info du item"
        >
            <img className="foto_producto" src="" alt="foto"/>

            <div className="texto_producto">
                <p className="titulo_producto"><span>{producto?.id}.</span> {producto?.nombre}</p>
            
                {producto?.categoria === "pizzas" 
                ?   <div className="contenedor_ingredientes">
                        <p className="ingredientes"> Ingredientes: {producto?.ingredientes}</p> 
                    </div>
                : <p className="precio">R${producto?.ingredientes}</p>
                }
            </div>
        </div>
    )
}
  
export default Producto
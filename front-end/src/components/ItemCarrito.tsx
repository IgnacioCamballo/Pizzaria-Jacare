import useMenu from '../hooks/useMenu'
import { item } from '../types/types'

const ItemCarrito = ({item}: {item: item}) => {
    const {categoria, sabores, precio, sabor1, sabor2, sabor3, tamaño, cantidad, id} = item
    const {handleEliminarItem, handleRestarCantidad, handleSumarCantidad} = useMenu()

    const categorias = () => {
        if(categoria === "pizzas") {
            return "Pizza"
        } else if (categoria === "pratos") {
            return "Prato"
        } else if (categoria === "bebidas") {
            return "Bebida"
        }
    }

    return (
        <div className="item_carrito_info">
            <div className="contenedor_de_titulo">
                <h3 className="item_carrito_categoria">{categorias()} {item.categoria === "pizzas" ? tamaño.toLowerCase() : ""}</h3>
                <svg 
                    className="eliminar" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    onClick={() => handleEliminarItem(id)}
                    aria-label="eliminar item do pedido"
                >
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
            </div>
            {sabores !== 1 && (<p className="carrito_sabores"> Sabores: </p>)}
            <div className="item_carrito_sabores">
                <p>{sabor1}</p>
                <p>{sabor2}</p>
                <p>{sabor3}</p>
            </div>
            <div className="item_carrito_contenedor_cant_precio">
                <div className="item_carrito_contenedor_cantidad">
                    <button 
                        className="item_carrito_boton"
                        onClick={() => {handleRestarCantidad(item)}}
                        aria-label="-1 du este item"
                    >-</button>
                    <p className="item_carrito_cantidad">{cantidad}</p>
                    <button 
                        className="item_carrito_boton"
                        onClick={() => {handleSumarCantidad(item)}}
                        aria-label="+ du este item"
                    >+</button>
                </div>
                <p className="item_carrito_precio">R${precio * cantidad}</p>
            </div>
        </div>
    )
}

export default ItemCarrito
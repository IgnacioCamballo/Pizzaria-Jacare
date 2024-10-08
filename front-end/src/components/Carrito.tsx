import { motion } from "framer-motion"
import useMenu from "../hooks/useMenu"
import ItemCarrito from "./ItemCarrito"
import { item } from "../types/types"

const Carrito = () => {
    const {pedido, total, handleChangeCarrito, handleRealizarPedido} = useMenu()

    const carritoVariantes = {
        hidden: {x: "100%", transition: {duration: 0.5}},
        visible: {x: 0, transition: {duration: 0.5}},
        hiddenExit: {x: "100%", transition: {duration: 0.5}}
    }

    return (
        <motion.div
            className="modal_carrito" 
            variants={carritoVariantes}
            initial="hidden"
            animate="visible"
            exit="hiddenExit"
        >
            <button className="cerrar_modal" aria-label="cerrar a ventana do producto" onClick={handleChangeCarrito}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>

            <h2 className="titulo_carrito">Seu Pedido</h2>
            
            <div className="contenedor_mapeo">
                {pedido.map((item: item) => (
                    <ItemCarrito 
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>

            <p className="cuenta_total">Total do pedido:   <span>R${total}</span></p>

            <button 
                className={pedido.length === 0 ? "realizar_orden" : "realizar_orden hover cursor_pointer"}
                onClick={pedido.length === 0 ? ()=>{} : ()=> {handleRealizarPedido()}}
                aria-label="Realizar o pedido"
            >Realizar pedido</button>

            <p className="leyenda1">Ao fazer o pedido, seu aplicativo WhatsApp será aberto e o pedido será solicitado por esse meio.</p>
            <p className="leyenda2">A taxa de entrega varia de acordo com a região.</p>
        </motion.div>
    )
}

export default Carrito
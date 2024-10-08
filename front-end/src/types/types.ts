export type item = {
    id: number
    categoria: string
    cantidad: number
    tamaño: string
    sabores: number
    sabor1: string
    sabor2: string
    sabor3: string
    precio: number
}

export type producto = {
    id: string
    nombre: string
    categoria: string
    subcategoria: string
    ingredientes: number | string
}

export type MenuContextProps = {
    menu: string,
    desplegable: boolean,
    pedido: item[],
    modal: boolean,
    productoActual: producto,
    pizzaIncompleta: item,
    multisabor: boolean,
    delivery: boolean,
    carrito: boolean,
    tamaño: string,
    sabores: number,
    total: number,
    setMenu: React.Dispatch<React.SetStateAction<string>>,
    setDesplegable: React.Dispatch<React.SetStateAction<boolean>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setProductoActual: React.Dispatch<React.SetStateAction<producto>>,
    setDelivery: React.Dispatch<React.SetStateAction<boolean>>,
    setCarrito: React.Dispatch<React.SetStateAction<boolean>>,
    setTamaño: React.Dispatch<React.SetStateAction<string>>,
    setSabores: React.Dispatch<React.SetStateAction<number>>,
    setPrecio: React.Dispatch<React.SetStateAction<number>>,
    handleAgregarItem: (e: {preventDefault: () => void;}) => void,
    handleEliminarItem: (id: number) => void,
    handleRestarCantidad: (item: item) => void,
    handleSumarCantidad: (item: item) => void,
    handleChangeModal: () => void,
    handleCerrarModal: () => void,
    handleChangeCarrito: () => void,
    handleRealizarPedido: () => void,
    calcularPrecio: () => void,
}
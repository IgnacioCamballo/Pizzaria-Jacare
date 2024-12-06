import {z} from "zod"

export type item = {
    id: string
    categoria: string
    cantidad: number
    tamaño: string
    sabores: number
    sabor1: string
    sabor2: string
    sabor3: string
    precio: number
}

export const ProductSchema = z.object({
    _id: z.string(),
    idNumber: z.number(),
    name: z.string(),
    category: z.string(),
    subcategory: z.string().optional().nullable(),
    ingredients: z.string().optional(),
    price: z.number(),
    price2: z.number().optional(),
    img: z.string()
})

export type Product = z.infer<typeof ProductSchema>
export type ProductForm = Pick<Product, "idNumber" | "name" | "category" | "subcategory" | "ingredients" | "price" | "price2" | "img">

export type MenuContextProps = {
    pizza: string,
    menu: string,
    desplegable: boolean,
    pedido: item[],
    modal: boolean,
    productoActual: Product,
    pizzaIncompleta: item,
    multisabor: boolean,
    delivery: boolean,
    carrito: boolean,
    tamaño: string,
    sabores: number,
    total: number,
    alertPizza: boolean,
    setMenu: React.Dispatch<React.SetStateAction<string>>,
    setDesplegable: React.Dispatch<React.SetStateAction<boolean>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setProductoActual: React.Dispatch<React.SetStateAction<Product>>,
    setDelivery: React.Dispatch<React.SetStateAction<boolean>>,
    setCarrito: React.Dispatch<React.SetStateAction<boolean>>,
    setTamaño: React.Dispatch<React.SetStateAction<string>>,
    setSabores: React.Dispatch<React.SetStateAction<number>>,
    setPrecio: React.Dispatch<React.SetStateAction<number>>,
    setAlertPizza: React.Dispatch<React.SetStateAction<boolean>>,
    handleAgregarItem: (e: {preventDefault: () => void;}) => void,
    handleEliminarItem: (id: string) => void,
    handleRestarCantidad: (item: item) => void,
    handleSumarCantidad: (item: item) => void,
    handleChangeModal: () => void,
    handleCerrarModal: () => void,
    handleChangeCarrito: () => void,
    handleRealizarPedido: () => void
}
import {z} from "zod"

export const ItemSchema = z.object({
    _id: z.string(),
    categoria: z.string(),
    cantidad: z.number(),
    sabores: z.number(),
    sabor1: z.string(),
    sabor2: z.string(),
    precio: z.number()
})

export type item = z.infer<typeof ItemSchema>

export const ProductSchema = z.object({
    _id: z.string(),
    idNumber: z.number(),
    name: z.string(),
    veggy: z.boolean().optional(),
    category: z.string(),
    subcategory: z.string().optional().nullable(),
    ingredients: z.string().optional(),
    price: z.number(),
    price2: z.number().optional(),
    img: z.string()
})

export type Product = z.infer<typeof ProductSchema>
export type ProductForm = Pick<Product, "idNumber" | "name" | "category" | "veggy" | "subcategory" | "ingredients" | "price" | "price2" | "img">

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
    sabores: number,
    total: number,
    alertPizza: boolean,
    setMenu: React.Dispatch<React.SetStateAction<string>>,
    setDesplegable: React.Dispatch<React.SetStateAction<boolean>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setProductoActual: React.Dispatch<React.SetStateAction<Product>>,
    setDelivery: React.Dispatch<React.SetStateAction<boolean>>,
    setCarrito: React.Dispatch<React.SetStateAction<boolean>>,
    setSabores: React.Dispatch<React.SetStateAction<number>>,
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
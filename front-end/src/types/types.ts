import {z} from "zod"

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

export const ProductSchema = z.object({
    _id: z.string(),
    idNumber: z.number(),
    name: z.string(),
    category: z.string(),
    categoryName: z.string(),
    subcategory: z.string().optional(),
    subcategoryName: z.string().optional(),
    ingredients: z.string().optional(),
    price: z.number(),
    price2: z.number().optional(),
    img: z.string().optional()
})

export const adminProductSchema = z.array(
    ProductSchema.pick({
        _id: true,
        idNumber: true,
        name: true,
        category: true,
        categoryName: true,
        subcategory: true,
        subcategoryName: true,
        ingredients: true,
        price: true,
        price2: true,
        img: true
    })
)

export type Product = z.infer<typeof ProductSchema>
export type ProductForm = Pick<Product, "idNumber" | "name" | "category" | "categoryName" | "subcategory" | "subcategoryName" | "ingredients" | "price" | "price2" | "img">

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
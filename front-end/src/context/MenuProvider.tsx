import { useState, createContext, useEffect } from "react"
import { toast } from "react-toastify"

import { item, MenuContextProps, Product } from "../types/types"

interface props {
  children: JSX.Element | JSX.Element[]
}

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

const MenuProvider = ({ children }: props) => {
  const pizza = "674f750add362637b281687d"
  const empanadas = "676189428ba5e4b08cdfcae4"

  const [menu, setMenu] = useState("Tudo")
  const [desplegable, setDesplegable] = useState(false)
  //codigo de carrito inicio
  const [pedido, setPedido] = useState<item[]>([])
  const [modal, setModal] = useState(false)
  const [productoActual, setProductoActual] = useState<Product>({} as Product)
  const [pizzaIncompleta, setPizzaIncompleta] = useState<item>({} as item)
  const [multisabor, setMultisabor] = useState(false)
  const [delivery, setDelivery] = useState(false)
  const [carrito, setCarrito] = useState(false)
  const [sabores, setSabores] = useState(1)
  const [total, setTotal] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [alertPizza, setAlertPizza] = useState(false)

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleCerrarModal = () => {
    setModal(false)
    setSabores(1)
    setProductoActual({} as Product)
  }

  const obtenerPedido = () => {
    const pedidoAlmacenado = localStorage.getItem("pedido")
    const pedidoObtenido: item[] = pedidoAlmacenado ? JSON.parse(pedidoAlmacenado) : []
    setPedido(pedidoObtenido)
    if (pedidoObtenido.length >= 1) {
      setDelivery(true)
    }
  }

  useEffect(() => {
    obtenerPedido()
  }, [])

  const handleAgregarItem = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const pedidoNuevo: item[] = pedido
    const item: item = {
      _id: productoActual._id,
      categoria: productoActual.category,
      cantidad: 1,
      sabores: sabores,
      sabor1: productoActual.subcategory === empanadas ? `Empanada do ${productoActual.name}`: productoActual.category === pizza ? `Pizza ${productoActual.name}`: productoActual.name,
      sabor2: "",
      precio: productoActual.price
    }
    
    //Checks if a single item is repeted and updates if true, or direct push into order if not repeated
    const checkRepeatedAndPush = (itemToCheck: item) => {
      //ver repetido
      if (pedidoNuevo.some(itemPedido => itemPedido._id === itemToCheck._id)) {
        const index = pedidoNuevo.findIndex(itemNuevo => itemNuevo._id === itemToCheck._id)
        const itemRepetido = pedidoNuevo[index]
        const itemSumado = {
          ...itemRepetido,
          cantidad: itemRepetido.cantidad + 1
        }
        pedidoNuevo.splice(index, 1, itemSumado)
      } else {
        pedidoNuevo.push(itemToCheck)
      }
      localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
      handleCerrarModal()
      toast.success("item adicionado com sucesso")
    }

    if (multisabor === false) {
      if (sabores === 1) {
        checkRepeatedAndPush(item)
      } else {
        setMultisabor(true)
        setPizzaIncompleta(item)
        setModal(false)
        setProductoActual({} as Product)
        toast.success("primeiro sabor selecionado")
      }
    } else {
      if (pizzaIncompleta.sabor1 === productoActual.name) {
        checkRepeatedAndPush(item)
      } else {
        const pizzaCompleta = {
          ...pizzaIncompleta,
          sabor2: ` / ${productoActual.name}`,
          precio: (pizzaIncompleta.precio > productoActual.price ? pizzaIncompleta.precio : productoActual.price),
          _id: `${pizzaIncompleta._id}${productoActual._id}`
        }
        checkRepeatedAndPush(pizzaCompleta)
      } 
      setMultisabor(false)
      setPizzaIncompleta({} as item)
      handleCerrarModal()
      toast.success("segundo sabor selecionado e item adicionado com sucesso")
    }
  }

  const handleRestarCantidad = (item: item) => {
    if (item.cantidad === 1) {
      return
    } else {
      const pedidoNuevo = pedido
      const index = pedidoNuevo.findIndex(objeto => objeto._id === item._id)
      item.cantidad = item.cantidad - 1
      pedidoNuevo.splice(index, 1, item)
      localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
      setGuardando(true)
    }
  }

  const handleSumarCantidad = (item: item) => {
    const pedidoNuevo = pedido
    const index = pedidoNuevo.findIndex(objeto => objeto._id === item._id)
    item.cantidad = item.cantidad + 1
    pedidoNuevo.splice(index, 1, item)
    localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
    setGuardando(true)
  }

  const handleEliminarItem = (id: string) => {
    const pedidoItemEliminado = pedido.filter(item => item._id !== id)
    localStorage.setItem('pedido', JSON.stringify(pedidoItemEliminado))
    setGuardando(true)
    toast.error("item removido com sucesso")
  }

  useEffect(() => {
    if (guardando === true) {
      obtenerPedido()
      setGuardando(false)
    }
  }, [guardando])


  const handleChangeCarrito = () => {
    setCarrito(!carrito)
  }

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto: item) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido, carrito])

  const handleRealizarPedido = () => {
    const numero = "+554792378248"
    let mensaje = ""
    mensaje += `Pedido do web:  \n`;
    const copiaPedido: item[] = pedido

    for (const item of copiaPedido) {
      const itemCantidad = item.cantidad;
      const itemNombre = item.sabor2 !== "" ? `${item.sabor1} ${item.sabor2}` : item.sabor1;

      mensaje += `${itemCantidad} \n`;
      mensaje += `${itemNombre},  \n`;
    }
    mensaje += `Total do pedido = R$${total}`

    const whatsappURL = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`;
    window.open(whatsappURL, "_blank");

    setTimeout(() => { borrarPedido() }, 1000)
  }

  const borrarPedido = () => {
    const pedidoBorrado: never[] = []
    localStorage.setItem('pedido', JSON.stringify(pedidoBorrado))
    obtenerPedido()
    setCarrito(false)
  }

  return (
    <MenuContext.Provider
      value={{
        pizza,
        menu,
        desplegable,
        pedido,
        modal,
        productoActual,
        pizzaIncompleta,
        multisabor,
        delivery,
        carrito,
        sabores,
        total,
        alertPizza,
        setMenu,
        setDesplegable,
        setModal,
        setProductoActual,
        setDelivery,
        setCarrito,
        setSabores,
        setAlertPizza,
        handleAgregarItem,
        handleEliminarItem,
        handleRestarCantidad,
        handleSumarCantidad,
        handleChangeModal,
        handleCerrarModal,
        handleChangeCarrito,
        handleRealizarPedido
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export { MenuProvider }

export default MenuContext

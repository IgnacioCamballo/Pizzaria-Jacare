import { useState, createContext, useEffect } from "react"
import { toast } from "react-toastify"

import { item, MenuContextProps, Product } from "../types/types"

interface props {
  children: JSX.Element | JSX.Element[]
}

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

const MenuProvider = ({ children }: props) => {
  const pizza = "674f750add362637b281687d"

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
  const [tamaño, setTamaño] = useState("")
  const [sabores, setSabores] = useState(1)
  const [precio, setPrecio] = useState(0)
  const [total, setTotal] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [alertPizza, setAlertPizza] = useState(false)

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleCerrarModal = () => {
    setModal(false)
    setTamaño("Grande")
    setSabores(1)
    setPrecio(0)
    setProductoActual({} as Product)
  }

  const handleCerrarModalParcial = () => {
    setModal(false)
    setPrecio(0)
    setProductoActual({} as Product)
  }

  const obtenerPedido = () => {
    const pedidoAlmacenado = localStorage.getItem("pedido")
    const pedidoObtenido = pedidoAlmacenado ? JSON.parse(pedidoAlmacenado) : []
    setPedido(pedidoObtenido)
    if (pedidoObtenido.length >= 1) {
      setDelivery(true)
    }
  }

  useEffect(() => {
    obtenerPedido()
  }, [])

  useEffect(() => {
    if(productoActual.category === pizza) {
      if(tamaño === "Grande") {setPrecio(productoActual.price)}
      if(tamaño === "Media") {setPrecio(productoActual.price2!)}
    } else {
      setPrecio(productoActual.price)
    }
  }, [productoActual, tamaño])

  const handleAgregarItem = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    let pedidoNuevo: item[] = pedido
    const item: item = {
      id: productoActual._id,
      categoria: productoActual.category,
      cantidad: 1,
      tamaño: tamaño,
      sabores: sabores,
      sabor1: productoActual.name,
      sabor2: "",
      sabor3: "",
      precio: precio
    }

    if (multisabor === false) {
      if (sabores === 1) {
        //ver repetido
        if (pedidoNuevo.some(item => item.id === productoActual._id && item.sabores === 1)) {
          const index = pedidoNuevo.findIndex(item => item.id === productoActual._id && item.sabores === 1)
          const itemRepetido = pedidoNuevo[index]
          const itemSumado = {
            ...itemRepetido,
            cantidad: itemRepetido.cantidad + 1
          }
          pedidoNuevo.splice(index, 1, itemSumado)
          localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
          handleCerrarModal()
          toast.success("item adicionado com sucesso")
        } else {
          pedidoNuevo.push(item)
          localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
          handleCerrarModal()
          toast.success("item adicionado com sucesso")
        }
      } else {
        setMultisabor(true)
        setPizzaIncompleta(item)
        handleCerrarModalParcial()
        toast.success("primeiro sabor selecionado")
      }
    } else {
      if (pizzaIncompleta.sabores === 2) {
        const pizzaCompleta = {
          ...pizzaIncompleta,
          sabor2: productoActual.name,
          precio: (pizzaIncompleta.precio > precio ? pizzaIncompleta.precio : precio),
          id: pizzaIncompleta.id + productoActual._id
        }
        pedidoNuevo.push(pizzaCompleta)
        localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
        setMultisabor(false)
        setPizzaIncompleta({} as item)
        handleCerrarModal()
        toast.success("segundo sabor selecionado e item adicionado com sucesso")
      } else {
        if (pizzaIncompleta.sabor2 === "") {
          const pizza2de3 = {
            ...pizzaIncompleta,
            sabor2: productoActual.name,
            precio: (pizzaIncompleta.precio > precio ? pizzaIncompleta.precio : precio),
            id: pizzaIncompleta.id + productoActual._id
          }
          setPizzaIncompleta(pizza2de3)
          handleCerrarModal()
          toast.success("segundo sabor selecionado")
        } else {
          const pizza3sabores = {
            ...pizzaIncompleta,
            sabor3: productoActual.name,
            precio: (pizzaIncompleta.precio > precio ? pizzaIncompleta.precio : precio),
            id: pizzaIncompleta.id + productoActual._id
          }
          pedidoNuevo.push(pizza3sabores)
          localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
          setMultisabor(false)
          setPizzaIncompleta({} as item)
          handleCerrarModal()
          toast.success("terceiro sabor selecionado e item adicionado com sucesso")
        }
      }
    }
  }

  const handleRestarCantidad = (item: item) => {
    if (item.cantidad === 1) {
      return
    } else {
      let pedidoNuevo = pedido
      const index = pedidoNuevo.findIndex(objeto => objeto.id === item.id)
      item.cantidad = item.cantidad - 1
      pedidoNuevo.splice(index, 1, item)
      localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
      setGuardando(true)
    }
  }

  const handleSumarCantidad = (item: item) => {
    let pedidoNuevo = pedido
    const index = pedidoNuevo.findIndex(objeto => objeto.id === item.id)
    item.cantidad = item.cantidad + 1
    pedidoNuevo.splice(index, 1, item)
    localStorage.setItem('pedido', JSON.stringify(pedidoNuevo))
    setGuardando(true)
  }

  const handleEliminarItem = (id: string) => {
    const pedidoItemEliminado = pedido.filter(item => item.id !== id)
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
    mensaje += `Pedido do web: \n`;
    const copiaPedido: item[] = pedido

    for (const item of copiaPedido) {
      const itemCantidad = item.cantidad;
      const itemCategoria = item.categoria;
      const itemNombre = item.sabor1;

      if (itemCategoria === "pizzas") {
        const itemTamaño = item.tamaño;
        const itemSabores = item.sabores;

        mensaje += `${itemCantidad} Pizza ${itemTamaño}\n `;
        mensaje += `Sabor: \n`;

        for (let i = 1; i <= itemSabores; i++) {
          const sabor = item[`sabor${i}` as keyof item];
          mensaje += `-${sabor} \n`;
        }

        mensaje += "\n";
      }

      else if (itemCategoria === "pratos") {
        mensaje += `${itemCantidad} Prato \n`;
        mensaje += `${itemNombre}\n`;
      } else {
        mensaje += `${itemCantidad} Bebida \n`;
        mensaje += `${itemNombre}\n`;
      }
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
        tamaño,
        sabores,
        total,
        alertPizza,
        setMenu,
        setDesplegable,
        setModal,
        setProductoActual,
        setDelivery,
        setCarrito,
        setTamaño,
        setSabores,
        setPrecio,
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

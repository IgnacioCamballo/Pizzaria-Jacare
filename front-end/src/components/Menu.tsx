import { useQuery } from "@tanstack/react-query"

import { getCategories } from "../api/CategoryAPI"
import useMenu from "../hooks/useMenu"

import Submenu from "./Submenu"
import { useEffect, useState } from "react"
import { Category } from "../types/categoriesTypes"
import Producto from "./Producto"

const Menu = () => {
  const {pizza, menu, setMenu, delivery, setDelivery} = useMenu()
  const [sortedCategories, setSortedCategories] = useState<Category[]>([])
  const [CategoryList, setCategoryList] = useState<Category[]>([])

  const {data, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  useEffect(() => {
    if(data) {
      setSortedCategories(data.sort((a,b) => a.orderN - b.orderN))
      setCategoryList(data.sort((a,b) => a.orderN - b.orderN))
    }
  }, [data, menu])

  useEffect(() => {
    if(data) {
      if(menu === "Tudo") {
        setSortedCategories(data!.sort((a,b) => a.orderN - b.orderN))
      } else {
        setSortedCategories(data!.filter(categ => categ._id === menu))
      }
    }
  }, [menu])

  const handleChangeDelivery = () => {
    setDelivery(!delivery)
  }
  if(isLoading) return (<p className="isLoading_menu">Cargando Menú...</p>)

  return (
    <section className="seccion_menu" id="menu">
      <div className="contenedor_inicio_menu">
        <h2 className="titulo_menu">O Nosso menu</h2>
        
        <div className="linea_menu"></div>
        
        <div className="botones">
          <button aria-label="mostrar tudo o menu" className={menu === "Tudo" ? "resaltado" : "transparente"} onClick={() => setMenu("Tudo")}>Tudo</button>
          
          {CategoryList.map(categ => (
            <button 
              key={categ._id}
              aria-label={`mostrar so ${categ.name}`} 
              className={menu === categ._id ? "resaltado" : "transparente"} 
              onClick={() => setMenu(categ._id)}
            >{categ.name}</button>
          ))}
        </div>
        
        <div className="delivery">
          <button 
            className={delivery ? "slide_exterior slide_exterior_on" : "slide_exterior"}
            onClick={handleChangeDelivery}
            aria-label="activar o desactivar modo delivery"
          >
            <div className={delivery ? "slide_interior_on" : "slide_interior_off"}></div>
          </button>
            <p>Quero Pedir Delivery</p>
        </div>   
      </div>

      {sortedCategories.map(category => (menu === category._id || "Tudo") && (
        <div key={category._id} className="general_products_container">
          <div className={`titulo_submenuCat ${category._id === pizza && "marginB0"}`}>{category.name}</div>

          <div className="contenedor_productos_mostrados">
            {category.products.filter(product => !product.subcategory).sort((a, b) => a.idNumber - b.idNumber).map(product => (
              <Producto key={product._id} producto={product} isPizza={product.category === pizza}/>
            ))}
          </div>

          {category.subCategories.sort((a, b) => a.orderNsub - b.orderNsub).map(subCat => (
            <Submenu 
              key={subCat._id}
              subCategory={subCat}
              products={category.products.filter(product => product.subcategory === subCat._id).sort((a, b) => a.idNumber - b.idNumber)}
            />
          ))}
        </div>
      ))}





      {/* {(menu === "Pizza" || menu === "Tudo") && (
        <>
          {precios.map(precio => (
            <Submenu 
              key={precio.categoria} 
              categoria={precio.categoria} 
              precioGrande={precio.precioGrande} 
              precioMedia={precio.precioMedia}
            />
          ))}
        </>
      )}

      {(multisabor === false && (menu === "Prato" || menu === "Tudo")) && (
        <Submenu categoria={"Pratos"} precioGrande={0} precioMedia={0}/>
      )}

      {(multisabor === false && (menu === "Bebidas" || menu === "Tudo")) && (
        <>
          <Submenu categoria={"Refri"} precioGrande={0} precioMedia={0}/>
          <Submenu categoria={"Cervejas"} precioGrande={0} precioMedia={0}/>
          <Submenu categoria={"Aguas"} precioGrande={0} precioMedia={0}/>
        </>
      )}
       */}
    </section>
  )
}

export default Menu
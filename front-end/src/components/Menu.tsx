import Submenu from "./Submenu"
import precios from "../data/precios.json"
import useMenu from "../hooks/useMenu"

const Menu = () => {
  const {menu, setMenu, multisabor, delivery, setDelivery} = useMenu()

  const handleChangeDelivery = () => {
    setDelivery(!delivery)
  }

  return (
    <section className="seccion_menu" id="menu">
      <div className="contenedor_inicio_menu">
        <h2 className="titulo_menu">O Nosso menu</h2>
        
        <div className="linea_menu"></div>
        
        <div className="botones">
          <button aria-label="mostrar tudo o menu" className={menu === "Tudo" ? "resaltado" : "transparente"} onClick={() => setMenu("Tudo")}>Tudo</button>
          <button aria-label="mostrar so pizzas" className={menu === "Pizza" ? "resaltado" : "transparente"} onClick={() => setMenu("Pizza")}>Pizza</button>
          <button aria-label="mostrar so pratos" className={menu === "Prato" ? "resaltado" : "transparente"} onClick={() => setMenu("Prato")}>Prato</button>
          <button aria-label="mostrar so bebidas" className={menu === "Bebidas" ? "resaltado" : "transparente"} onClick={() => setMenu("Bebidas")}>Bebidas</button>
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

      {(menu === "Pizza" || menu === "Tudo") && (
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
      
    </section>
  )
}

export default Menu
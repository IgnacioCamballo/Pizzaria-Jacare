import useMenu from "../hooks/useMenu"

const Navegacion = () => {
  const {desplegable, setDesplegable, delivery, handleChangeCarrito} = useMenu()

  const carro = (
    delivery &&
    <div 
      className="boton_carrito"
      onClick={handleChangeCarrito}
      aria-label="carrito de compras"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
    </div>
  )

  return (
    <>
      <nav className={desplegable ? "navegacion_desplegada" : "navegacion"}>
        <img src="/assets/logo.svg" alt="logo" className="logo_nav"/>

        {window.matchMedia("(min-width: 430px)").matches && (
          <div className="contenedor_nav">
          <div className="home_nav"><a aria-label="ir a home" href="#portada">Home</a></div>
          <div className="menu_nav"><a aria-label="ir a menu" href="#menu">Menu</a></div>
          <div className="contacto_nav"><a aria-label="ir a contacto" href="#contacto">Contacto</a></div>
        </div>
        )}
        {desplegable && (
          <div className="contenedor_nav">
            <div 
              className="home_nav"
              onClick={()=> setDesplegable(false)}
            >
              <a aria-label="ir a Home" href="#portada">Home</a>
            </div>
            <div 
              className="menu_nav"
              onClick={()=> setDesplegable(false)}
            >
              <a aria-label="ir a Menu" href="#menu">Menu</a>
            </div>
            <div 
              className="contacto_nav"
              onClick={()=> setDesplegable(false)}
            >
              <a aria-label="ir a contacto" href="#contacto">Contacto</a>
            </div>
          </div>
        )}
        {window.matchMedia("(max-width: 430px)").matches ? (
          <div 
            className={desplegable ? "compensa_espacio_de_img" : "compensa_espacio_de_img_cerrado"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={desplegable ? "menu_desplegable_abierto" : "menu_desplegable"}
              onClick={() => setDesplegable(!desplegable)}
              aria-label="desplegar menu du opções"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
            </svg>
            {carro}
          </div>
        ) : <div className="compensa_espacio_de_img">{carro}</div>}
        
      </nav>
    </>
  )
}
  
export default Navegacion
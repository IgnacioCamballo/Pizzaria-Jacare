
const Portada = () => {

    return (
      <div className="foto_inicio" id="portada">
          {window.matchMedia("(min-width: 430px)").matches && (
            <img src="/assets/logo.svg" alt="logo" className="logo"/>
          )}
  
          <h1 className="titulo">Pizzaria Jacaré</h1>
  
          {/* <a aria-label="ir a menu" className="boton_menu" href="#menu">MENU</a>           */}
      </div>
    )
  }
  
  export default Portada
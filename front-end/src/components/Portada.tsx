
const Portada = () => {

  return (
    <div className="foto_inicio" id="portada">
      {window.matchMedia("(min-width: 430px)").matches && (
        <img src="/assets/logo.svg" alt="logo" className="logo" />
      )}

      <h1 className="titulo">Pizzaria Jacaré</h1>
    </div>
  )
}

export default Portada
import ReactModal from "react-modal"
import { AnimatePresence } from "framer-motion"
import useMenu from "../hooks/useMenu"
import Portada from "../components/Portada"
import Navegacion from "../components/Navegacion"
import Menu from "../components/Menu"
import Contacto from "../components/Contacto"
import ModalProducto from "../components/ModalProducto"
import Carrito from "../components/Carrito"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ModalAlert from "../components/ModalAlert"

function App() {
  const {modal, handleCerrarModal, carrito, setCarrito, alertPizza, setAlertPizza} = useMenu()

  const handleClose = () => {
    setCarrito(false)
  }

  return (
    <>  
      <Portada />
      <Navegacion />
      <Menu />
      <Contacto />
      {modal && (
        <ReactModal 
          isOpen={modal} 
          className="modal" 
          overlayClassName="overlay" 
          ariaHideApp={false}
          onRequestClose={handleCerrarModal}
        >
          <ModalProducto />
        </ReactModal>
      )}
      {carrito && (
        <ReactModal 
          isOpen={carrito} 
          className="modal_carrito_base"
          overlayClassName="overlay_carrito" 
          ariaHideApp={false}
          onRequestClose={handleClose}
        >
          <AnimatePresence>
            <Carrito />
          </AnimatePresence>
        </ReactModal>
      )}
      {alertPizza && (
        <ReactModal 
          isOpen={alertPizza} 
          className="modal" 
          overlayClassName="overlay" 
          ariaHideApp={false}
          onRequestClose={() => setAlertPizza(false)}
        >
          <ModalAlert message="Primeiro você deve adicionar os sabores restantes à pizza" onClick={() => setAlertPizza(false)}/>
        </ReactModal>
      )}
      <ToastContainer autoClose={2500} pauseOnHover={false}/>
    </>
  )
}

export default App
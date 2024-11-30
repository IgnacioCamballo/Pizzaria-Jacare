import useMenu from '../hooks/useMenu'

export default function ModalAlertPizza() {
  const {setAlertPizza} = useMenu()

  return (
    <div>
      <p>Primero debes colocar los sabores restantes a la pizza</p>
      <button onClick={() => setAlertPizza(false)}>OK</button>
    </div>
  )
}

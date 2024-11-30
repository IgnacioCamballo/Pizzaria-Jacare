import useMenu from '../hooks/useMenu'

export default function ModalAlertPizza() {
  const {setAlertPizza} = useMenu()

  return (
    <div style={{display: "flex", flexDirection: "column", backgroundColor: "white", padding: "1rem 1.5rem", borderRadius: "1rem", border: "1px solid black", alignItems: "flex-end"}}>
      <p style={{marginTop: "0.25rem"}}>Primeiro você deve adicionar os sabores restantes à pizza</p>
      <button style={{width: "fit-content", marginRight: "1rem"}} onClick={() => setAlertPizza(false)}>OK</button>
    </div>
  )
}

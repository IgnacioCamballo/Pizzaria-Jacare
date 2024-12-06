
type ModalAlertProps = {
  message: string,
  onClick: () => void
}

export default function ModalAlert({message, onClick}: ModalAlertProps) {

  return (
    <div style={{display: "flex", flexDirection: "column", backgroundColor: "white", padding: "1rem 1.5rem", borderRadius: "1rem", border: "1px solid black", alignItems: "flex-end"}}>
      <p style={{marginTop: "0.25rem"}}>{message}</p>
      <button style={{width: "fit-content", marginRight: "1rem"}} onClick={onClick}>OK</button>
    </div>
  )
}

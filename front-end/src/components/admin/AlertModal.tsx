
type AlertModalProps = {
  message: string,
  onCancel: () => void,
  onConfirm: () => void
}

export default function AlertModal({message, onCancel, onConfirm}: AlertModalProps) {
  return (
    <div >  
      <div onClick={onCancel} style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(89, 96, 107, 0.75)"}}>
      </div>

      <div style={{zIndex: 1, borderRadius: "0.5rem", backgroundColor: "white", padding: "1.5rem 2rem", position: "fixed", top: "50%", left: "50%", right: "auto", bottom: "auto", transform: "translate(-50%, -50%)"}}>
        <p style={{cursor: "default", fontSize: 20, fontWeight: "500", color: "#4B5563", margin: "0 0 2rem 0"}}>{message}</p>
        <div style={{display: "flex", justifyContent: "space-around", gap: "1rem"}}>
          <button style={{width: "5rem", cursor: "pointer"}} onClick={onCancel}>Cancelar</button>
          <button style={{width: "5rem", cursor: "pointer"}} onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  )
}

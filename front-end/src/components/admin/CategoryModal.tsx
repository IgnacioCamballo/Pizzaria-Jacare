import React from "react"


type AlertModalProps = {
  children: React.ReactElement,
  onCancel: () => void,
  onConfirm: () => void,
  confirmText: string
}

export default function CategoryModal({children, onCancel, onConfirm, confirmText}: AlertModalProps) {
  return (
    <div onClick={onCancel} style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(89, 96, 107, 0.75)"}}>  
      <div style={{borderRadius: "0.5rem", backgroundColor: "white", padding: "1.5rem 2rem", position: "absolute", top: "50%", left: "50%", right: "auto", bottom: "auto", transform: "translate(-50%, -50%)"}}>
        {children}
        <div style={{display: "flex", justifyContent: "space-around", gap: "1rem"}}>
          <button style={{width: "5rem"}} onClick={onCancel}>Cancelar</button>
          <button style={{width: "5rem"}} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}


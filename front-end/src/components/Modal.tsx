import React from "react"


type ModalProps = {
  children: React.ReactElement,
  onCancel: () => void,
  className?: string | undefined
}

export default function Modal({children, onCancel, className}: ModalProps) {
  return (
    <div>  
      <div onClick={onCancel} style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(89, 96, 107, 0.75)"}}>
      </div>

      <div 
        style={{zIndex:1, borderRadius: "0.5rem", backgroundColor: "white", padding: "1.5rem 2rem", position: "absolute", top: "50%", left: "50%", right: "auto", bottom: "auto", transform: "translate(-50%, -50%)"}}
        className={className}
      >
        {children}
      </div>
    </div>
  )
}
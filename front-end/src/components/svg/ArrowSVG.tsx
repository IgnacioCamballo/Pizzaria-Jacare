import React from 'react'


type ArrowSVGProps = {
  onClick: React.MouseEventHandler<SVGSVGElement> | undefined,
  className: string | undefined
}

export default function ArrowSVG({onClick, className}: ArrowSVGProps) {
  return (
    <svg onClick={onClick} className={className} width={20} height={20} viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path d="M10.106,12.69 C9.525,13.27 8.584,13.27 8.002,12.69 L1.561,6.246 C0.979,5.665 0.722,4.143 2.561,4.143 L15.549,4.143 C17.45,4.143 17.131,5.664 16.549,6.246 L10.106,12.69 L10.106,12.69 Z" fill="#434343"> </path>
        </g>
      </g>
    </svg>
  )
}

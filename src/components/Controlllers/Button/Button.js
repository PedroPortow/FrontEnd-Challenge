import React from 'react'
import './Button.scss'

function Button({text, del, handler, className}) {
  return (
    <button
     onClick={handler}
     className={className}>
       {text} {del ? 
       (<i className="fa-solid fa-trash-can" />) : 
       (<i className="fa-solid fa-location-pin" />) }
    </button>
  )
}

export default Button
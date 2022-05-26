import React from 'react'
import logoCheck from '../../assets/logo-check.png'
import './Loader.scss'

function Loader() {
  return (
    <div className="load">
      <img src={logoCheck} alt='logo fFarmbox' />
    <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
 </div>
  )
}

export default Loader
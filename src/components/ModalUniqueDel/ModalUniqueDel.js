import React from 'react'
import { useMarkerContext } from '../../context/MarkerContext'
import './ModalUniqueDel.scss'


function ModalDeleteUnique({closeModal}) {
    const {state, dispatch, setActive, active} = useMarkerContext()

    function handleDeletePin(activePin){
      dispatch({type: 'DELETE_UNIQUE', payload: activePin})
      setActive(false)
      closeModal()
    }
    
  return (
    <div className='modal'>
      <div className='modalWrapper'>
        <div className='firstSection'>
            <i className="fa-solid fa-x"></i>
        </div>
        <div className='secondSection'>
            <h3>Excluir ponto selecionado?</h3>
        </div>
        <div className='thirdSection'>
            <div className='warningWrapper'>
                <h2>Atenção!</h2>
                <p>Essa ação não poderá ser desfeita.</p>
            </div>
        </div>
        <div className='forthSection'>
            <button className='deleteButton' onClick={() =>handleDeletePin(active)}><i className="fa-solid fa-trash-can" /> EXCLUIR</button>
            <button className='cancelButton' onClick={() => closeModal()}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}

export default ModalDeleteUnique
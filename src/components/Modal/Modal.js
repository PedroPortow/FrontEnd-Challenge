import React from 'react'
import { useMarkerContext } from '../../context/MarkerContext'
import './Modal.scss'


function Modal({closeModal, deletePin}) {
    const {state, dispatch, active, setActive} = useMarkerContext()
    
    function handleDeleteAll(){
      closeModal()
      dispatch({type: 'DELETE_ALL'})
    }

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
           {deletePin ? <h3>Excluir ponto selecionado?</h3> : <h3>Excluir todos os pontos?</h3>}
        </div>
        <div className='thirdSection'>
            <div className='warningWrapper'>
                <h2>Atenção!</h2>
                <p>Essa ação não poderá ser desfeita.</p>
            </div>
        </div>
        <div className='forthSection'>
            <button className='deleteButton' onClick={deletePin ? () =>handleDeletePin(active) : handleDeleteAll}><i className="fa-solid fa-trash-can" /> EXCLUIR</button>
            <button className='cancelButton' onClick={() => closeModal()}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
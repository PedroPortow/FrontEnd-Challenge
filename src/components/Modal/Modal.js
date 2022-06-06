import React from 'react'
import { useMarkerAndMapContext } from '../../context/MarkerAndMapContext'
import './Modal.scss'


function Modal({onCloseModal, deletePin}) {
    const {dispatch, active, setActive} = useMarkerAndMapContext()
    
    function handleDeleteAll(){
      onCloseModal()
      dispatch({type: 'DELETE_ALL'})
    }

    function handleDeletePin(activePin){
      dispatch({type: 'DELETE_UNIQUE', payload: activePin})
      setActive(false)
      onCloseModal()
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
            <button className='cancelButton' onClick={() => onCloseModal()}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
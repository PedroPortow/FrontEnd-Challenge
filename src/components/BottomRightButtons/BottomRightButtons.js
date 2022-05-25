import React, { useState } from 'react'
import  ReactDOM  from 'react-dom'
import { useMarkerContext } from '../../context/MarkerContext'
import Modal from '../Modal/Modal'
import ModalDeleteUnique from '../ModalUniqueDel/ModalUniqueDel'
import './BottomRightButtons.scss'


function BottomRightButtons() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalDeleteUniqueVisibile, setIsModalDeleteUniqueVisible] = useState(false)
    const {state, dispatch, active, setActive} = useMarkerContext()

   
    function handleAdd(){
        const lat = -15.185309410095217
        const lng = -53.58890914916992
        const today = new Date();
        const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' - ' +today.getHours() + ":" + today.getMinutes() 
        const time = Date.now()
        
        const id = Math.floor(Math.random() * 10000);
        const objForContext = {coordinates: {lat: lat, lng: lng }, timestamp: time, id: id, date: date}
  
        dispatch({type: 'ADD', payload: objForContext})

    }

    const portal = document.getElementById('portal')

    function handleModalDeleteAll(){
        setIsModalVisible(true)
    }

    const handleModalDeleteUniquee = () => {
      setIsModalDeleteUniqueVisible(true)
    }


  return (
    <div className='buttonsWrapper'>
      
      {isModalVisible ? 
        ReactDOM.createPortal
        (<Modal 
            closeModal={() => setIsModalVisible(false)}/>
        , portal) :
        ''}

             
      {isModalDeleteUniqueVisibile ? 
        ReactDOM.createPortal
        (<ModalDeleteUnique 
            closeModal={() => setIsModalDeleteUniqueVisible(false)}/>
        , portal) :
        ''}

      {active && 
      <button 
        className='button removeButton' 
        onClick={handleModalDeleteUniquee}>DELETAR PIN  <i className="fa-solid fa-trash-can" /></button> }

      <button 
        className='button addButton' 
        onClick={handleAdd}>ADICIONAR NOVO  <i className="fa-solid fa-location-pin" /></button>
      
      {state.length > 0 && 
      <button 
        className='button removeButton' 
        onClick={handleModalDeleteAll}>DELETAR TODOS  <i className="fa-solid fa-trash-can" /></button>}
    </div>
  )
}

export default BottomRightButtons
import React, { useState } from 'react'
import  ReactDOM  from 'react-dom'
import { useMarkerContext } from '../../context/MarkerContext'
import Modal from '../Modal/Modal'
import Button from './Button/Button'
import './Controllers.scss'


function Controllers() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalDeletePin, setModalDeletePin] = useState(false)
    const {state, dispatch, active, setActive, center} = useMarkerContext()

   
    function handleAdd(){
        const lat = center.lat
        const lng = center.lng
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

    const handleModalDeletePin = () => {
     setModalDeletePin(true)
    }

    console.log(state)


  return (
    <div className=
      {state.length === 0 ? 
      "buttonsWrapper" : 
      "transition1"} 
    >
      {isModalVisible ? 
      ReactDOM.createPortal
      (<Modal 
          closeModal={() => setIsModalVisible(false)}
        />
      , portal) : ''}

      {modalDeletePin ? 
      ReactDOM.createPortal
      (<Modal
          closeModal={() => setModalDeletePin(false)}
          deletePin={true}
        />
        , portal) : ''}
    
      {active && 
        <Button text={'DELETAR PIN'}  
          handler={handleModalDeletePin}
          del={'del'}
          className={'button removeButton'}
        />}
      <Button 
          text={'ADICIONAR NOVO'}
          handler={handleAdd}
          className={'button addButton'}
        />
        {state.length > 0 &&
        <Button 
          text={'DELETAR TODOS'}
          handler={handleModalDeleteAll}
          del={'del'}
          className={'button removeButton'} 
        />}
    </div>
  )
}

export default Controllers
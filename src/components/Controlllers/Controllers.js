import React, { useState } from 'react'
import  ReactDOM  from 'react-dom'
import { useMarkerAndMapContext } from '../../context/MarkerAndMapContext'
import Modal from '../Modal/Modal'
import Button from './Button/Button'
import './Controllers.scss'


function Controllers() {
    const [modalDeleteAll, setModalDeleteAll] = useState(false)
    const [modalDeletePin, setModalDeletePin] = useState(false)
    const {markers, dispatch, active, setActive, center} = useMarkerAndMapContext()

   
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
        setModalDeleteAll(true)
    }

    const handleModalDeletePin = () => {
     setModalDeletePin(true)
    }

    const classChange =  () => {
      if(markers.length === 0){
        return "buttonsWrapper"
      }
      else if(markers.length > 0 && !active){
        return "transition1"
      }
      else if(markers.length > 0 && active){
       return 'transition2'
      }
    }

  return (
    <div className={classChange()} >
      {modalDeleteAll ? 
      ReactDOM.createPortal
      (<Modal 
          closeModal={() => setModalDeleteAll(false)}
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
          del={true}
          className={'button removeButton'}
        />}
      <Button 
          text={'ADICIONAR NOVO'}
          handler={handleAdd}
          className={'button addButton'}
        />
        {markers.length > 0 &&
        <Button 
          text={'DELETAR TODOS'}
          handler={handleModalDeleteAll}
          del={true}
          className={'button removeButton'} 
        />}
    </div>
  )
}

export default Controllers
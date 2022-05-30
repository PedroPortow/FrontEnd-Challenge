//React
import React, { useState } from 'react'
import  ReactDOM  from 'react-dom'

//Context
import { useMarkerAndMapContext } from '../../context/MarkerAndMapContext'

//Components
import Modal from '../Modal/Modal'
import Button from './Button/Button'

//Styling
import './Controllers.scss'


function Controllers() {
    const [modalDeleteAllPins, setModalDeleteAllPins] = useState(false)
    const [modalDeletePin, setModalDeletePin] = useState(false)

    const {markers, dispatch, active, center} = useMarkerAndMapContext()
   
    function handleAdd(){
        const lat = center.lat
        const lng = center.lng
        const today = new Date();
        const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' - ' +today.getHours() + ":" + today.getMinutes() 

        const timestamp = Date.now()
        
        const objForContext = {coordinates: {lat: lat, lng: lng }, timestamp, id: timestamp, date: date}
        dispatch({type: 'ADD', payload: objForContext})
    }

    const portal = document.getElementById('portal')

    function handleModalDeleteAllPins(){
        setModalDeleteAllPins(true)
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
      else {
       return 'transition2'
      }
    }

  return (
    <div className={classChange()} >

      {modalDeleteAllPins ? 
      ReactDOM.createPortal
      (<Modal 
          closeModal={() => setModalDeleteAllPins(false)}
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
          handler={handleModalDeleteAllPins}
          del={true}
          className={'button removeButton'} 
        />}
    </div>
  )
}

export default Controllers
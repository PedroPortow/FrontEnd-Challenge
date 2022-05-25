import React, { useContext, useMemo, useState, useRef} from 'react'
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import data from '../../talhao.json'
import List from '../List/List';
import pin from '../../assets/Pin.svg'
import { MarkerContext, useMarkerContext } from '../../context/MarkerContext';
import BottomRightButtons from '../BottomRightButtons/BottomRightButtons';
import pinInactive from '../../assets/Regular=on, Move=off.svg'
import pinActive from '../../assets/Regular=off, Move=on.svg'

const polyOptions = {
    fillColor: "#fff",
    fillOpacity: 0.1,
    strokeColor: "#fff",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }


function Map() {
  const marker = useRef()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGjBlhfC3qyQxCq8pqqao-_CXkXwXQloc"
  })
  
    // console.log(data.features)
    const {geometry} = data.features[0]
    const {coordinates} = geometry;
    
    const mapStyle = {
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 0
    }
    
    const center = useMemo(() => ({lat: coordinates[0][2][1], lng:coordinates[0][2][0]}),[])
    const options = useMemo(() => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapTypeId: "satellite"
    }))
    
    const dataCord = coordinates[0]
    const pathCoords = dataCord.map((cord) => (
      {lat: cord[1], lng: cord[0]}
      )) //map já retorna um array
      
      // console.log(dataCord)
      const {state, dispatch, active, setActive} = useMarkerContext()
      
      const doc = document.querySelector('click', console.log('oi'))

    function handleMarkerClick(id, e){
      console.log(e)
      console.log(id)
      if(id === active){
        setActive(false)
        e.domEvent.target.src = pinInactive
      }
      else if(doc !== id && active === true || id){
        setActive(false)
        e.domEvent.target.src = pinInactive
      }
      else{
        setActive(id)
        e.domEvent.target.src = pinActive
      }
    }

 

    function handleClick(e){
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        const today = new Date();
        const timestamp = Date.now()
        const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' - ' +today.getHours() + ":" + today.getMinutes() 
        const time = Date.now()
        
        // const id = Math.floor(Math.random() * 10000);
        const objForContext = {coordinates: {lat: lat, lng: lng }, timestamp: time, date: date, id: timestamp}

        dispatch({type: 'ADD', payload: objForContext})
    }

    // console.log(state)
  return (
    <div style={{height: '100%'}}> 
    
       {isLoaded ? 
       <GoogleMap
            mapContainerStyle={mapStyle}
            center={center}
            zoom={15}
            options={options}
        >
            <Polygon 
              paths={pathCoords} 
              options={polyOptions} 
              onClick={handleClick}
            />  
            
          {state.map((el, index) => (
            <Marker
                key={el.id}
                id={el.id}
                draggable={true}
                useRef={marker}
                position={el.coordinates}
                onClick={(e) => handleMarkerClick(el.id, e)}
                icon={pinInactive }
                
                />)
                )}
               
            <List />
            <BottomRightButtons active={active} />
        </GoogleMap> : ''}
  </div>
  )
}

export default Map
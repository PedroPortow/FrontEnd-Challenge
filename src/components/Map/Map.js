import React, { useContext, useMemo, useState, useRef, useEffect} from 'react'
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import data from '../../talhao.json'
import List from '../List/List';
import pin from '../../assets/Pin.svg'
import { MarkerContext, useMarkerContext } from '../../context/MarkerContext';
import Controllers from '../Controlllers/Controllers';
import pinInactive from '../../assets/Regular=on, Move=off.svg'
import pinActive from '../../assets/Regular=off, Move=on.svg'
import { mapConfig } from '../../utilities/mapConfigs';

function Map() {
    const marker = useRef()

    const {state, dispatch, active, setActive, center, dataCord, pathCoords} = useMarkerContext()
    const {mapStyle, polyOptions, options} = mapConfig

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBGjBlhfC3qyQxCq8pqqao-_CXkXwXQloc"
    })

    function handleMarkerClick(id, e){
        if(id === active){
            setActive(false)
            e.domEvent.target.src = pinInactive
        }
        else{
            setActive(id)
            e.domEvent.target.src = pinActive
        }
    }

    //TENTATIVA FALHA DE DETECTAR CLIQUE FORA DO COMPONENTE
    //N SEI FAZER RIP PESQUISAR DEPOIS
    // useEffect(() => {
    //     const checkIfClickOutside = (e) => {
    //       if(marker.current && !marker.current.contains(e.target)){
    //         setActive(false)
    //         e.domEvent.target.src = pinInactive
    //       }
    //     }
    //     document.addEventListener('click', checkIfClickOutside)

    //   return () => {
    //     document.removeEventListener('click', checkIfClickOutside)
    //   }
    // }, [setActive]) 


    function handlePolyClick(e){
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        const today = new Date();
        const timestamp = Date.now()
        const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' - ' +today.getHours() + ":" + today.getMinutes() 
        const time = Date.now()

        const objForContext = {coordinates: {lat: lat, lng: lng }, timestamp: time, date: date, id: timestamp}

        dispatch({type: 'ADD', payload: objForContext})
    }

    /*falta implementar o loader component???problemasss*/ 

  return (
    <div style={{height: '91.8vh'}}> 
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
              onClick={handlePolyClick}
            />  
            
            {state.map((el, index) => (
                <Marker
                    key={el.id}
                    id={el.id}
                    draggable={true}
                    useRef={marker}
                    position={el.coordinates}
                    onClick={(e) => handleMarkerClick(el.id, e)}
                    icon={pinInactive}
                />))}
            <List />
            <Controllers />
        </GoogleMap> : 'Carregando....'}
  </div>
  )
}

export default Map
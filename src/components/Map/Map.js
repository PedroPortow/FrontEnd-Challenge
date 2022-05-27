import React from 'react'
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import List from '../List/List';
import {useMarkerContext } from '../../context/MarkerContext';
import Controllers from '../Controlllers/Controllers';
import pinInactive from '../../assets/Regular=on, Move=off.svg'
import pinActive from '../../assets/Regular=off, Move=on.svg'


function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBGjBlhfC3qyQxCq8pqqao-_CXkXwXQloc"
    })
    
    const google = window.google;
    const {state, dispatch, active, setActive, center, dataCord, pathCoords} = useMarkerContext()
   

    const map = () => {

        const options = {
            disableDefaultUI: true,   
            mapTypeId: "satellite", 
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
            }    
        }

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

        const mapStyle = {
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 0
        }
        
        const handlePolyClick = (e) =>{
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            const today = new Date();
            const timestamp = Date.now()
            const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' - ' +today.getHours() + ":" + today.getMinutes() 
            const time = Date.now()

            const objForContext = {coordinates: {lat: lat, lng: lng }, timestamp: time, date: date, id: timestamp}

            dispatch({type: 'ADD', payload: objForContext})
        }

        
        const handleMarkerClick = (id, e) =>{
            if(id === active){
                setActive(false)
            }
            else{
                setActive(id)
            }
        }

        return (
            <div style={{height: '91.8vh'}}> 
            {isLoaded && 
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
                                draggable={active === el.id ? true : false}
                                onClick={(e) => handleMarkerClick(el.id, e)}
                                id={el.id}
                                icon={el.id === active ? pinActive : pinInactive}
                                position={el.coordinates}/>
                        ))}
                    <List />
                    <Controllers />
            </GoogleMap> 
            }
        </div>
        )
    };

    if(isLoaded){
        return map()
    }else {
        return <p>Carregando...</p>
    }
}

export default Map
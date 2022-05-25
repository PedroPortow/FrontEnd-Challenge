import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import fetchData from '../Fetch';
import data from '../../talhao.json'
import Map from '../Map/Map';

function MapWrapper() {
 
    
  return (
    <div style={{height: '92vh'}}> 
     <Map />
    </div>
  )
}

export default MapWrapper
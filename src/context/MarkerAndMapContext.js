//React
import React, {useContext, createContext, useState, useReducer, useEffect} from 'react'

//Function Calculate Polygon Center
import {centerCalc} from '../utilities/centerCalc';

//Polygon Geocoords
import data from '../talhao.json'



const MarkerAndMapContext = createContext()

//Paths Polygon
const {geometry} = data.features[0]
const {coordinates} = geometry;
const dataCord = coordinates[0]
const pathCoords = dataCord.map((cord) => (
  {lat: cord[1], lng: cord[0]}
)) 

const center = centerCalc(pathCoords) 

//Reducer
const markerReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload];
        case 'DELETE_ALL':
            return state = []
        case 'DELETE_UNIQUE':
            return (state = newState(state, action.payload))
        default:
            return state
    }
}

const newState = (state, id) => {
    return state.filter((i) => i.id !== id)
}

export const MarkerAndMapContextProvider = ({children}) => {
    const [markers, dispatch] = useReducer(markerReducer, [], () => {
        const localData = localStorage.getItem('markers')
        return localData ? JSON.parse(localData) : []
    })
    const [active, setActive] = useState(null)

    useEffect(() => {
        localStorage.setItem("markers", JSON.stringify(markers))
    }, [markers] )
  
    return (
        <MarkerAndMapContext.Provider 
        value={{
            markers, 
            dispatch, 
            active, 
            setActive, 
            center, 
            pathCoords}}>
        {children}
        </MarkerAndMapContext.Provider>
    )
}

export function useMarkerAndMapContext(){
    return useContext(MarkerAndMapContext)
}
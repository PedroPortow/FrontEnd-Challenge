import React, {useContext, createContext, useState, useReducer} from 'react'
import { centerCalc } from '../utilities/calcCenter';
import data from '../talhao.json'

const MarkerContext = createContext()

const stateReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload];
        case 'DELETE_ALL':
            return []
        case 'DELETE_UNIQUE':
            return (state = newState(state, action.payload))
        default:
            return state
    }
}

const newState = (state, id) => {
    return state.filter((i) => i.id !== id)
}

const {geometry} = data.features[0]
const {coordinates} = geometry;
const dataCord = coordinates[0]
const pathCoords = dataCord.map((cord) => (
  {lat: cord[1], lng: cord[0]}
  )) 

const center = centerCalc(pathCoords)


export const MarkerContextProvider = ({children}) => {
    const initialMarker = []
    const [state, dispatch] = useReducer(stateReducer, [])
    const [active, setActive] = useState(null)
  
    return (
        <MarkerContext.Provider 
        value={{
            state, 
            dispatch, 
            active, 
            setActive, 
            center, 
            dataCord, 
            pathCoords}}
        >
        {children}
        </MarkerContext.Provider>
    )
}

export function useMarkerContext(){
    return useContext(MarkerContext)
}
import React, {useContext, createContext, useState, useReducer, useMemo, useEffect} from 'react'
import { centerCalc } from '../utilities/centerCalc';
import data from '../talhao.json'

const MarkerAndMapContext = createContext()

const stateReducer = (state, action) => {
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

const {geometry} = data.features[0]
const {coordinates} = geometry;
const dataCord = coordinates[0]
const pathCoords = dataCord.map((cord) => (
  {lat: cord[1], lng: cord[0]}
  )) 

const center = centerCalc(pathCoords) //aqui seria interessante usar o useMemo?


export const MarkerAndMapContextProvider = ({children}) => {
    const initialMarker = []
    const [markers, dispatch] = useReducer(stateReducer, [], () => {
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
            dataCord, 
            pathCoords}}
        >
        {children}
        </MarkerAndMapContext.Provider>
    )
}

export function useMarkerAndMapContext(){
    return useContext(MarkerAndMapContext)
}
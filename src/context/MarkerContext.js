import React, {useContext, createContext, useState, useReducer} from 'react'

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

export const MarkerContextProvider = ({children}) => {
    const initialMarker = []
    const [state, dispatch] = useReducer(stateReducer, [])
    const [active, setActive] = useState(null)
  


    
    return (
        <MarkerContext.Provider value={{state, dispatch, active, setActive}}>
            {children}
        </MarkerContext.Provider>
    )
}

export function useMarkerContext(){
    return useContext(MarkerContext)
}
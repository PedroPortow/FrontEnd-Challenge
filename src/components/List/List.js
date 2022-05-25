import React from 'react'
import { useMarkerContext } from '../../context/MarkerContext'
import './List.scss'


function List() {
    const {state, dispatch} = useMarkerContext()
    // console.log(state)
  return (
    <div className='list'>
        <div className='topList'>
            <h3>Listagem de pontos</h3>
        </div>
    <div className='listContainer'>
      {state.length > 0 ? 
       state.map((el, index) => (
          <div key={el.id} className='section'>
              <div className='textRow'>
                <i className="fa-solid fa-location-pin" />
                {index < 10 ?  <p>Ponto nº 00{index}</p> : <p>Ponto nº 0{index}</p> }
              </div>
              <h4>Criado em: {el.date}</h4>
          </div> 
       )) : 
       <div className='section'>
          <p>Sem pontos de monitoramento para exibir no momento.</p>
       </div>
       }
    </div>
    </div>
  )
}

export default List
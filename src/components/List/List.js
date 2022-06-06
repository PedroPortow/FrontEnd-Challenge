import React from 'react'
import { useMarkerAndMapContext } from '../../context/MarkerAndMapContext'
import './List.scss'

function List() {
    const {markers, active} = useMarkerAndMapContext()

  return (
    <div className='list'>
        <div className='topList'>
            <h3>Listagem de pontos</h3>
        </div>
        <div className={markers.length > 4 ? 'listContainer scroll' : 'listContainer'}>
            {markers.length > 0 ? 
            markers.map((el, index) => (
                <div key={el.id}
                    className={el.id === active ? 'selected' : 'section'}> 
                        <div className='textRow'>
                            <i className="fa-solid fa-location-dot" />
                            <p>{'Ponto n°' + String(index + 1).padStart(3, "0")}</p>
                        </div>
                <h4>Criado em: {el.date}</h4> 
                </div>)) : 
            <div className='section'>
                <p>Sem pontos de monitoramento para exibir no momento.</p>
            </div>}
        </div>
    </div>
  )
}

export default List
import React from 'react'
import { useMarkerAndMapContext } from '../../context/MarkerAndMapContext'
import './List.scss'



function List() {
    const {markers, active} = useMarkerAndMapContext()
 
    function handleSelected(e){
        console.log(e)
    }

    function handleClass(id){
        if(id === active){
            return 'selected'
        }
        else{
            return 'section'
        }
    }


    console.log(markers)

  return (
    <div className='list'>
        <div className='topList'>
            <h3>Listagem de pontos</h3>
        </div>
    <div className={markers.length > 4 ? 'listContainer scroll' : 'listContainer'}>
        {markers.length > 0 ? 
        markers.map((el, index) => (
            <div key={el.id}
                className={handleClass(el.id)} 
                onClick={(e) => handleSelected(e)}
                > 

                    <div className='textRow' >
                        <i className="fa-solid fa-location-dot" />
                        {index < 9 ?  <p>Ponto nº 00{index + 1}</p> : <p>Ponto nº 0{index + 1}</p> }
                    </div>

            <h4>Criado em: {el.date}</h4>
        </div> )) : 
        <div className='section'>
            <p>Sem pontos de monitoramento para exibir no momento.</p>
        </div>}
    </div>
    </div>
  )
}

export default List
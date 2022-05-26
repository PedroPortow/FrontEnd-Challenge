import React from 'react'
import { useMarkerContext } from '../../context/MarkerContext'
import './List.scss'



function List() {
    const {state, dispatch, active, setActive} = useMarkerContext()
 
    function handleSelected(e){
        console.log(e)
    }

    function handleClass(id){
        // console.log(id)
        if(id === active){
            return 'selected'
        }
        else{
            return 'section'
        }
    }


    console.log(state)

  return (
    <div className='list'>
        <div className='topList'>
            <h3>Listagem de pontos</h3>
        </div>
    <div className={state.length > 4 ? 'listContainer scroll' : 'listContainer'}>
        {state.length > 0 ? 
        state.map((el, index) => (
            <div key={el.id}
                className={handleClass(el.id)} 
                onClick={(e) => handleSelected(e)}> 

                    <div className='textRow' >
                        <i className="fa-solid fa-location-dot" />
                        {index < 10 ?  <p>Ponto nº 00{index}</p> : <p>Ponto nº 0{index}</p> }
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
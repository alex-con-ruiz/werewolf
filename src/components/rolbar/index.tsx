import React from 'react'
import './style.scss';
import img from '../../assets/images/Aldeano.png';
import { useStore, useStoreSchema } from '../../context/context';

const Rolbar = () => {

  const { state, dispatch }: useStoreSchema = useStore();
  React.useEffect(() => { }, [state.room.rol, dispatch])

  return (
    <div className="rolbar">
      <img src="https://lh5.googleusercontent.com/WfkfVLcIKiAawSqClRu_OUnGKDJNrqm_KBAhqUiaqMNcfzJH6wnnKr3vw8hwu61aSPq0AGD1YecHa1BfK-Lr=w1571-h382" alt="Rol Card" />
      {state.room.rol &&
        <>
          <div className="rol_description">
            <h2>{state.room.rol.rolName}</h2>
            <p>{state.room.rol.actionDescription}</p>
            <button>Do action</button>
          </div>
        </>
      }
    </div>
  )
}

export default Rolbar

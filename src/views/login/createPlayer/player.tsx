import React, { ChangeEvent } from 'react';
import { useHistory } from "react-router-dom";
import { PlayerData, useStore, useStoreSchema } from '../../../context/context';
import { serverConnected, serverOff } from '../../../socket/socketEvents';
import './style.scss';

const Player = () => {
  const { state, dispatch }: useStoreSchema = useStore()
  const history = useHistory();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_PLAYER_INPUT', payload: { playerInput: e.target.value } })
  }

  const setPlayer = async () => {
    const player: PlayerData = { playerName: state.playerInput }
    await dispatch({ type: 'SET_PLAYER', payload: { player } })
    window.localStorage.setItem('sessionname', state.playerInput)
    history.push('/join');
  }

  React.useEffect(() => {
    // if name already exist on session storage
    if (window.localStorage.getItem('sessionname')) {
      // set playerName and its id into state
      const player: PlayerData | any = { playerName: window.localStorage.getItem('sessionname') }
      dispatch({ type: 'SET_PLAYER', payload: { player } })
      // then go to join path
      history.push('/join');
    }

    serverConnected(dispatch)
    serverOff(dispatch)
  }, [history, dispatch])


  return (
    <div className="login-player">{state.clientConnected ?
      <>
        <h3 className="login-player_heading">Nombre de jugador</h3>
        <input type="text" name="PlayerName" onChange={handleInput} value={state.playerInput} />
        <button onClick={setPlayer}>Enter</button>
      </>
      : <h1>Conectando...</h1>}
    </div>
  )
}

export default Player;
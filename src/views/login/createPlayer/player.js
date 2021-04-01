import React from 'react'
import { useStore } from '../../../context/context';
import './style.scss';

const Player = () => {

  const { state, dispatch } = useStore()

  const handleInput = (e) => {
    const target = e.target;
    const value = target.value;
    dispatch({ type: 'HANDLE_PLAYER_INPUT', payload: { playerInput: value } })
  }

  const setPlayer = () => {
    const player = { ...state.player };
    player.playerName = state.playerInput
    dispatch({ type: 'SET_PLAYER_NAME', payload: player })
  }

  return (
    <div className="login-player">
      <h3 className="login-player_heading">Nombre de jugador</h3>
      <input type="text" name="PlayerName" onChange={handleInput} value={state.playerInput} />
      <button onClick={setPlayer}>Enter</button>
    </div>
  )
}

export default Player;
import React, { ChangeEvent } from 'react'
import { useStore } from '../../../context/context';
import { playerId } from "../../../socket/socket";
import './style.scss';


const Player = () => {

  const { state, dispatch } = useStore()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target;
    const value: string = target.value;
    dispatch({ type: 'HANDLE_PLAYER_INPUT', payload: { playerInput: value } })
  }

  const setPlayer = () => {
    const player = { ...state.player };
    player.playerName = state.playerInput;
    player.conectionId = playerId;
    dispatch({ type: 'SET_PLAYER', payload: { player } })
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
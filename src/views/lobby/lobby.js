import React from 'react'
import './style.scss'

import { useStore } from '../../context/context'
import socket from "../../socket/socket";

const Lobby = () => {

  const { state, dispatch } = useStore()

  React.useEffect(() => {
    socket.on('updateRoom', (response) => {
      dispatch({ type: 'JOIN_ROOM', payload: { ...response } })
    })
    return () => {
      socket.off()
    }
  })

  return (
    <div className="lobby-view">
      <div className="lobby-view_sidebar">
        <div className="sidebar_room-info">
          <h1>{state.room.roomName}</h1>
          <h3>Room id: {state.room.roomId}</h3>
        </div>
        <div className="sidebar_players">
          <h3>Players</h3>
          {state.room.players.map((player, i) => <li key={i}>{player.name}</li>)}
        </div>
      </div>
    </div>
  )
}

export default Lobby
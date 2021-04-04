import React from 'react'
import { useStore, useStoreSchema } from '../../context/context';
import { socket } from '../../socket/socket';
import { confirmCheckDispatch } from '../../socket/socketEvents';
import './style.scss';

const Sidebar = () => {
  const { state, dispatch }: useStoreSchema = useStore()

  // Check if user is owner
  const ownerShip = () => {
    const SID: string | null = window.localStorage.getItem('SID');
    return state.room.owner === SID;
  }

  const askReady = () => socket.emit('askCheck', { roomId: state.room.roomId });

  const confirmReady = () => {
    socket.emit('readyConfimation', {
      roomId: state.room.roomId, SID: window.localStorage.getItem('SID')
    })
    confirmCheckDispatch(dispatch)
  };

  React.useEffect(() => { }, [state.room, dispatch])

  const buttonReadyStyle = {
    background: 'green',
    color: 'white',
  }

  return (
    <div className="sidebar">
      <div className="sidebar_info">
        <div className="sidebar_room-info">
          <h1>{state.room.roomName}</h1>
          <h3>Room id: {state.room.roomId}</h3>
        </div>
        <div className="sidebar_players">
          <h3>Players</h3>
          {state.room.players.map((player: any, i: number) => <li key={i} style={player.isOnline ? { color: 'green' } : { color: 'red' }}>{player.name}</li>)}
        </div>
      </div>
      <div className="sidebar_actions">
        {ownerShip() && <button onClick={askReady}>Start game</button>}
        {!ownerShip() && <button onClick={confirmReady} style={state.room.readyCheck ? buttonReadyStyle : undefined}>Ready</button>}
        <button>Leave</button>
      </div>
    </div>
  )
}

export default Sidebar

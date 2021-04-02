import React from 'react';
import { useHistory } from 'react-router';
import { useStore, useStoreSchema } from '../../context/context';
import { socket } from "../../socket/socket";
import { updatedRoom, serverOff } from '../../socket/socketEvents';
import './style.scss';


const Lobby = () => {

  const { state, dispatch }: useStoreSchema = useStore();
  const history = useHistory();

  React.useEffect(() => {

    if (!state.room.roomId) {
      const roomId: string | undefined = history.location.search.split('=').pop();
      const SID: string | null = window.localStorage.getItem('SID');
      const player: string | null = window.localStorage.getItem('sessionname');

      console.log(roomId, SID, player);

      if (roomId && SID && player) {
        socket.emit('rejoinRoom', { roomId, SID, player });
      } else {
        history.push('/');
      }
    }

    serverOff(dispatch, () => history.push('/'));

    updatedRoom(dispatch)

    return () => {
      socket.off()
    }
  })

  return (
    <div className="lobby-view">
      {state.room.roomId &&
        <div className="lobby-view_sidebar">
          <div className="sidebar_room-info">
            <h1>{state.room.roomName}</h1>
            <h3>Room id: {state.room.roomId}</h3>
          </div>
          <div className="sidebar_players">
            <h3>Players</h3>
            {state.room.players.map((player: any, i: number) => <li key={i} style={player.isOnline ? { color: 'green' } : { color: 'red' }}>{player.name}</li>)}
          </div>
        </div >}
    </div >
  )
}

export default Lobby
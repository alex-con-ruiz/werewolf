import React from 'react';
import { useHistory } from 'react-router';
import Rolbar from '../../components/rolbar';
import Sidebar from '../../components/sidebar';
import { useStore, useStoreSchema } from '../../context/context';
import { socket } from "../../socket/socket";
import { serverOff, updatedRoom, readyCheck, retrieveRol } from '../../socket/socketEvents';
import './style.scss';


const Lobby = (): JSX.Element => {

  const { state, dispatch }: useStoreSchema = useStore();
  const history = useHistory();

  React.useEffect(() => {

    if (!state.room.roomId) {
      const roomId: string | undefined = history.location.search.split('=').pop();
      const SID: string | null = window.localStorage.getItem('SID');
      const player: string | null = window.localStorage.getItem('sessionname');

      if (roomId && SID && player) {
        socket.emit('rejoinRoom', { roomId, SID, player });
      } else {
        history.push('/');
      }
    }

    serverOff(dispatch, () => history.push('/'));

    updatedRoom(dispatch)

    readyCheck(dispatch);

    retrieveRol(dispatch);

    return () => {
      socket.off()
    }
  }, [state, dispatch, history])

  return (
    <div className="lobby-view">
      {state.room.roomId &&
        <>
          <Sidebar />
          <div className="midbar">

          </div>
          <Rolbar />
        </>
      }
    </div >
  )
}

export default Lobby


/*
<div className="lobby-view_sidebar">
          <div className="sidebar_room-info">
            <h1>{state.room.roomName}</h1>
            <h3>Room id: {state.room.roomId}</h3>
          </div>
          <div className="sidebar_players">
            <h3>Players</h3>
            {state.room.players.map((player: any, i: number) => <li key={i} style={player.isOnline ? { color: 'green' } : { color: 'red' }}>{player.name}</li>)}
          </div>
        </div > */
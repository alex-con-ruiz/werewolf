import './App.scss';
import React from 'react';

import { Login } from './views/login/login';
import JoinRoom from './views/join-room/joinRoom';
import { useStore } from './context/context'
import Lobby from './views/lobby/lobby';

function App() {
  const { state } = useStore()

  return (
    <div className="App">
      {!state.player.playerName && <Login />}
      {state.player.playerName && !state.room.roomId && < JoinRoom />}
      {state.room.roomId && <Lobby />}
    </div>
  );
}

export default App;

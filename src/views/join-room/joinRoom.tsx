import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../context/context';
import { socket } from "../../socket/socket";
import { updatedRoom, roomError, retrieveSID } from '../../socket/socketEvents';
import './style.scss';


const JoinRoom = (): JSX.Element => {

  const { state, dispatch } = useStore();
  const history = useHistory();

  const handleCreateRoom = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_CREATEROOM_INPUT', payload: { createRoomInput: e.target.value } })
  }

  const handleJoinRoom = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_ROOMID_INPUT', payload: { roomIdInput: e.target.value } })
  }

  const goTo = (roomId: string) => {
    history.push(`/lobby?room=${roomId}`);
  }

  const goToError = () => {
    history.push(`/error`);
  }

  React.useEffect(() => {

    // Events that should trigger on socket response
    updatedRoom(dispatch, goTo);

    roomError(dispatch, goToError)

    retrieveSID();

    return () => {
      socket.off()
    }
  })

  const createRoom = () => socket.emit('createRoom', { name: state.createRoomInput, player: state.player.playerName });

  const joinRoom = () => {
    if (window.localStorage.getItem('SID')) {
      socket.emit('rejoinRoom', { roomId: state.roomIdInput, SID: window.localStorage.getItem('SID'), player: state.player.playerName})
    } else {
      socket.emit('joinRoom', { roomId: state.roomIdInput, player: state.player.playerName })
    }
  }

  return (
    <div className="joinRoom-view">
      <h3>Create room</h3>
      <input type="text" name="createRoom" placeholder="Player Room" onChange={handleCreateRoom} value={state.createRoomInput} />
      <button onClick={createRoom}>Create</button>
      <h3>Join room</h3>
      <input type="text" name="joinRoom" placeholder="x9HqJ" onChange={handleJoinRoom} value={state.roomIdInput} />
      <button onClick={joinRoom}>Join</button>
    </div>
  )
}
export default JoinRoom


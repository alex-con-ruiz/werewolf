import React from 'react'
import socket from "../../socket/socket";
import { useStore } from '../../context/context';

import './style.scss'

const JoinRoom = () => {

  const { state, dispatch } = useStore()

  const handleCreateRoom = (e) => {
    const target = e.target;
    const value = target.value;
    dispatch({ type: 'HANDLE_CREATEROOM_INPUT', payload: { createRoomInput: value } })
  }

  const handleJoinRoom = (e) => {
    const target = e.target;
    const value = target.value;
    dispatch({ type: 'HANDLE_ROOMID_INPUT', payload: { roomIdInput: value } })
  }

  React.useEffect(() => {
    socket.on('roomCreated', (response) => {
      dispatch({ type: 'JOIN_ROOM', payload: { ...response } })
    })

    socket.on('updateRoom', (response) => {
      dispatch({ type: 'JOIN_ROOM', payload: { ...response } })
    })
    return () => {
      socket.off()
    }
  })

  const createRoom = () => socket.emit('createRoom', { name: state.createRoomInput, player: state.player.playerName });
  //const createRoom = () => console.log(player);;

  const joinRoom = () => socket.emit('joinRoom', { roomId: state.roomIdInput, player: state.player.playerName })

  console.log(state.room);

  return (
    <div className="joinRoom-view">
      {!state.room.roomId ?
        (<>
          <h3>Create room</h3>
          <input type="text" name="createRoom" placeholder="Player Room" onChange={handleCreateRoom} value={state.createRoomInput} />
          <button onClick={createRoom}>Create</button>
          <h3>Join room</h3>
          <input type="text" name="joinRoom" placeholder="x9HqJ" onChange={handleJoinRoom} value={state.roomIdInput} />
          <button onClick={joinRoom}>Join</button>
        </>)
        : null}


    </div>
  )
}
export default JoinRoom


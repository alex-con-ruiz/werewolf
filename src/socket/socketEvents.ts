import { Dispatch } from "react";
import { socket } from "./socket";
import { RoomSchema } from '../../../werewolf-server/src/interfaces/interfaces';

// Events

export const serverConnected = (dispatch: Dispatch<any>): void => {
  if (socket.connected) {
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: true } });
    return;
  }
  socket.on('connect', () => {
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: true } });
  })
}


export const serverOff = (dispatch: Dispatch<any>, callback?: Function): void => {
  socket.on('disconnect', () => {
    window.localStorage.clear()
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: false } })
    if (callback) {
      callback()
    }
  })
}

export const retrieveSID = (): void => {
  socket.on('SID', (SID) => {
    if (SID) {
      window.localStorage.setItem('SID', SID)
    }
  })
}

export const updatedRoom = (dispatch: Dispatch<any>, callback?: Function): void => {
  socket.on('updatedRoom', ({ room }) => {
    dispatch({ type: 'JOIN_ROOM', payload: { room } })
    if (callback) {
      callback(room.roomId);
    }
  })
}

export const roomError = (dispatch: Dispatch<any>, callback?: Function): void => {
  socket.on('roomError', (response) => {
    /* dispatch({ type: 'JOIN_ROOM', payload: { room: response } })

    if (callback) {
      callback(response);
    } */
  })
}

// ReadyCheck

export const readyCheck = (dispatch: Dispatch<any>): void => {
  socket.on('readyCheck', ({ readyCheck }) => {
    dispatch({ type: 'READY_CHECK', payload: readyCheck })
  })
}

export const confirmCheckDispatch = (dispatch: Dispatch<any>): void => {
  dispatch({ type: 'READY_CHECK', payload: false })
}

// Starting Game

export const retrieveRol = (dispatch: Dispatch<any>): void => {
  socket.on('yourRol', (rol) => {
    dispatch({ type: 'SET_ROL', payload: { ...rol } })
  })
}

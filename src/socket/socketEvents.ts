import { Dispatch } from "react";
import { socket } from "./socket";

// Events

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

export const retrieveSID = (): void => {
  socket.on('SID', (SID) => {
    if (SID) {
      window.localStorage.setItem('SID', SID)
    }
  })
}

export const serverConnected = (dispatch: Dispatch<any>) => {
  if (socket.connected) {
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: true } });
    return;
  }
  socket.on('connect', () => {
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: true } });
  })
}


export const serverOff = (dispatch: Dispatch<any>, callback?: Function) => {
  socket.on('disconnect', () => {
    window.localStorage.clear()
    dispatch({ type: 'CONNECTED_TO_SERVER', payload: { clientConnected: false } })
    if (callback) {
      callback()
    }
  })
}



export const reconnectToRoom = (dispatch: Dispatch<any>): void => {

}


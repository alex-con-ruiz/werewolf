import React, { Dispatch, ReactNode } from 'react';

const initialState: IState = {
  clientConnected: false,
  playerInput: '',
  createRoomInput: '',
  roomIdInput: '',
  player: {
    playerName: ''
  },
  room: {
    roomId: '',
    owner: '',
    roomName: '',
    rol: '',
    readyCheck: false,
    players: ''
  }
}

export const AppContext = React.createContext<IState | any>(initialState)

const reducer = (state: IState, { type, payload }: Action): IState => {

  let upDateState: IState;

  switch (type) {
    case 'HANDLE_PLAYER_INPUT':
      return { ...state, ...payload };
    case 'SET_PLAYER':
      return { ...state, ...payload };
    case 'HANDLE_CREATEROOM_INPUT':
      return { ...state, ...payload };
    case 'HANDLE_ROOMID_INPUT':
      return { ...state, ...payload };
    case 'JOIN_ROOM':
      return { ...state, ...payload };
    case 'CONNECTED_TO_SERVER':
      return { ...state, ...payload };
    case 'READY_CHECK':
      upDateState = { ...state };
      upDateState.room.readyCheck = payload
      return upDateState
    case 'SET_ROL':
      upDateState = { ...state };
      upDateState.room.rol = payload;
      return upDateState;
    default:
      return state;
  }
}

export const AppContextProvider = ({ children }: Children): JSX.Element => {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return (
    <AppContext.Provider value={value} > {children} </AppContext.Provider>
  )
}

export const useStore = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useStore debe estar denbtro del proveedor AppContext')
  }

  return context;
}

interface Children {
  children: ReactNode;
}

export interface IState {
  clientConnected: boolean;
  playerInput: string;
  createRoomInput: string;
  roomIdInput: string;
  player: PlayerData;
  room: Room
}

export interface PlayerData {
  playerName: string;
}

interface Room {
  readonly roomId: string;
  readonly owner: string;
  readonly roomName: string,
  rol: any;
  readyCheck: boolean;
  players: any;
}

interface Action {
  type: string;
  payload: any;
}

export interface useStoreSchema {
  state: IState;
  dispatch: Dispatch<any>
}


export interface RolSchema {
  SID: string;
  rolId: string;
  rolName: string;
  action: string | null;
  actionDescription: string;
  flavor: string;
}
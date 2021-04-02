import React, { ReactNode } from 'react';

const initialState: IState = {
  playerInput: '',
  createRoomInput: '',
  roomIdInput: '',
  player: {
    conectionId: '',
    playerName: ''
  },
  room: {
    roomId: '',
    owner: '',
    roomName: '',
    players: ''
  }
}

export const AppContext = React.createContext<IState | any>(initialState)

const reducer = (state: IState, { type, payload }: Action): IState => {
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
  playerInput: string;
  createRoomInput: string;
  roomIdInput: string;
  player: PlayerData;
  room: Room
}

interface PlayerData {
  readonly conectionId: string,
  playerName: string;
}

interface Room {
  readonly roomId: string;
  readonly owner: string;
  readonly roomName: string,
  players: any;
}

interface Action {
  type: string;
  payload: Object;
}
import React, { createContext } from 'react'

import PropTypes from 'prop-types'

// Se crea el contexto y se exporta
export const AppContext = createContext()

export const ContextProvider = ({ children }) => {

  const store = {
    playerInput: '',
    createRoomInput: '',
    roomIdInput: '',
    player: {
      playerName: null
    },
    room: {
      roomId: null,
      owner: null,
      roomName: null,
      players: []
    }
  }

  const reduce = (state, { type, payload }) => {
 
    switch (type) {
      case 'HANDLE_PLAYER_INPUT':
        return { ...state, ...payload };
      case 'SET_PLAYER_NAME':
        return { ...state, player: { ...payload } };
      case 'HANDLE_CREATEROOM_INPUT':
        return { ...state, ...payload };
      case 'HANDLE_ROOMID_INPUT':
        return { ...state, ...payload };
      case 'JOIN_ROOM':
        return { ...state, room: { ...payload } };
      default:
        break;
    }
  }

  const [state, dispatch] = React.useReducer(reduce, store);


  const value = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch])

  return (
    <>
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    </>
  )
}

export const useStore = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useStore debe estar denbtro del proveedor AppContext')
  }

  return context;
}



ContextProvider.propTypes = {
  children: PropTypes.node,
}
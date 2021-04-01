import React from 'react'
import './login.scss';
import Player from './createPlayer/player';

export const Login = () => {
  return (
    <div className="login-view">
      <div className="login-view_logo" />
      <Player className="player_login" />
    </div>
  )
}

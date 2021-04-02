import React from 'react';
import './login.scss';
import Player from './createPlayer/player';

const Login = () => {
  return (
    <div className="login-view">
      <div className="login-view_logo" />
      <Player />
    </div>
  )
}

export default Login
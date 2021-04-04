import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


const Login = lazy(() => import('./views/login/login'));
const JoinRoom = lazy(() => import('./views/join-room/joinRoom'));
const Lobby = lazy(() => import('./views/lobby/lobby'));

function App(): JSX.Element {

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/join" component={JoinRoom} />
            <Route exact path="/lobby" component={Lobby} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

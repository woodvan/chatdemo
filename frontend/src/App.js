import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path = "/" component = {Home} />
        <PublicRoute exact restricted={true} path = "/login" component = {Login} />
        <Route component = {NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import SpotFinders from './spotfinders/Index';
import NewSpot from './spotfinders/New';
import EditSpot from './spotfinders/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" render={
        renderProps => <Home
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/register" render={
        renderProps => <Register
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/spotfinders" render={
        renderProps => <SpotFinders
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/spotfinders/new" render={
       renderProps => <SpotFinders
       {...renderProps}
       user={user}
       />
      }/>
      <Route exact path="/spotfinders/edit" render={
          renderProps => <SpotFinders
          {...renderProps}
          user={user}
          />
      }/>
    </Switch>
  );
}
export default Routes;
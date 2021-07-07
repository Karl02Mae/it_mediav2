import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function App() {

  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path="/" exact><Redirect to="/home" /></Route>

          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" />

          <Route path="/home">
          <Home/>
          </Route>

        </Switch>
      </Router>
    </div >
  );
}

export default App;

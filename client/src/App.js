import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bulma/css/bulma.min.css'
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/layouts/header'

import Home from './components/pages/home';
import Dashboard from './components/pages/dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ height: "100%" }}>
            <Header />
            <Route exact path='/' render={props => <Home />} />
            <Route path='/dashboard' render={props =>
              (
                localStorage.getItem('session') ? <Dashboard />
                  :
                  <Home />
              )
            } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bulma/css/bulma.min.css'
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header/header'

import About from './components/pages/about';
import Home from './components/pages/home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path='/' render={props => <Home />} />
            <Route path='/about' component={About} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

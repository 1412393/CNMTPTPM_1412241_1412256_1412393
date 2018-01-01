import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import SignIn from './components/SigninForm.js';
import SignUp from './components/SignupForm.js'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </Provider>
    )
  }
}

export default App;

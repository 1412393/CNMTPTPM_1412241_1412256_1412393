import React, { Component } from 'react';
import axios from 'axios';
import {apiUrl} from './apiConfig.js'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import SignIn from './components/SigninForm.js';
import SignUp from './components/SignupForm.js';
import MemberSite from './components/MemberSite.js';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/membersite' component={MemberSite}/>
        </Switch>
      </Provider>
    )
  }

  componentDidMount(){
  //   axios.get(apiUrl + 'getInfo')
  //   .then((res)=> {
  //     if(res.data === "NOT_LOGGED")
  //       window.location = '/';
  //   })
  //   .catch(err => console.log(err));
  }
}

export default App;

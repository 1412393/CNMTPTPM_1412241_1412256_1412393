import React, { Component } from 'react';
import * as actions from '../actions/SigninActions.js'


class SignIn extends Component {


  render() {
    return (
      <div className= "login-form">
            <h2>Login</h2>
            <div>
                <input ref="email" type="email" name="e" placeholder="Email" required="required" />
                <input ref="password" type="password" name="p" placeholder="Password" required="required" />
                <a href='/signup'>Create a new account</a>
                <button onClick={this.handleLogin} className="btn btn-primary btn-block btn-large">Let me in.</button>
            </div>
      </div>
    );
  }
}

export default SignIn;

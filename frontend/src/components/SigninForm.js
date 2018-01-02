import React, { Component } from 'react';
import * as actions from '../actions/SigninActions.js'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

class SignIn extends Component {

  handleSignin = () =>{
    this.props.dispatch(actions.signin);
  }

  render() {
    return (
      <div className= "login-form">
            <h2>Login</h2>
            <div>
                <input ref="email" type="email" name="e" placeholder="Email" required="required" />
                <input ref="password" type="password" name="p" placeholder="Password" required="required" />
                <Link to='/signup'>Create a new account</Link>
                <button onClick={this.handleSignin} className="btn btn-primary btn-block btn-large">Let me in.</button>
            </div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps)(SignIn);

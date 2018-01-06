import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/SignupActions.js'
import LoadingPage from './LoadingPage.js';
import { Redirect } from 'react-router-dom'
import Confirm from './ConfirmPage.js'

class SignUp extends Component {
  handleSignup = () =>{
      const name = this.refs.name.value;
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      const confirm_password = this.refs.confirm_password.value;
      if(name  && email && password && confirm_password && password === confirm_password)
        this.props.dispatch(actions.signup(name,email,password))
  }


  render() {
    if(1){
      return(
        <Confirm/>
      )
    }
    if(this.props.isCreating === true)
      return(
        <LoadingPage/>
      )
    return (
      <div className= "signup-form">
            <h2>Sign Up</h2>
            <div>
                <input ref="name" type="text" name="n" placeholder="Name" required="required" />
                <input ref="email" type="email" name="e" placeholder="Email" required="required" />
                <input ref="password" type="password" name="p" placeholder="Password" required="required" />
                <input ref="confirm_password" type="password" name="p" placeholder="Confirm Password" required="required" />

                <button onClick={this.handleSignup} className="btn btn-primary btn-block btn-large">Create my account</button>
            </div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
    return {
      isCreating : state.signupData.isCreating,
      created : state.signupData.created,
      message: state.signupData.message,
      result: state.signupData.result,
      isResending: state.resendData.isResending,
      resent: state.resendData.resent
    }
}

export default connect(mapStateToProps)(SignUp);

import React, { Component } from 'react';


class SignUp extends Component {
  render() {
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

export default SignUp;

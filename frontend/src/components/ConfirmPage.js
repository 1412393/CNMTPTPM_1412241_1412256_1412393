import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/ResendActions.js'
import {connect} from 'react-redux';

const style = {
    margin: 12,
};

class Confirm extends Component {

    handleResend = () => {
      this.props.dispatch(actions.resend(sessionStorage.email));
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.resent === true){
        window.alert("An verification email has been resent !");
      }
      else {
        window.alert("Resent fail !");
      }
    }

    render() {
        return (
            <div className="confirm">
                <h1>Account has been created</h1>
                <h6>An email has been sent to your email, please confirm before sign in</h6>
                <div className="btn-group">
                    <MuiThemeProvider>
                        <RaisedButton onClick={this.handleResend} label="Resend email" secondary={true} style={style} />
                        <RaisedButton onClick={() => {window.location ="/";}}label="Back to sign in" secondary={true} style={style} />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
      result: state.resendData.result,
      isResending: state.resendData.isResending,
      resent: state.resendData.resent
    }
}
export default connect(mapStateToProps)(Confirm);

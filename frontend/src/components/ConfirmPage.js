import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

export default class Confirm extends Component {
    render() {
        return (
            <div className="confirm">
                <h1>Account has been created</h1>
                <h6>An email has been sent to your email, please confirm before sign in</h6>
                <div className="btn-group">
                    <MuiThemeProvider>
                        <RaisedButton label="Resend email" secondary={true} style={style} />
                        <RaisedButton label="Back to sign in" secondary={true} style={style} />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

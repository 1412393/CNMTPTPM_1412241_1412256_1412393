import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class MemberSite extends Component {

  render() {
    return (
      <div className="loading">
      <MuiThemeProvider>
        <CircularProgress size={80} thickness={7} max={100} min={1} />
      </MuiThemeProvider>
      </div>
    );
  }
}

import React, { Component } from 'react';
import * as actions from '../actions/InitData.js'
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



class MemberSite extends Component {

  handleSignin = () =>{
    //this.props.dispatch(actions.signin);
  }

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

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps)(MemberSite);

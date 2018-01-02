import React, { Component } from 'react';
import * as actions from '../actions/InitData.js'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


class MemberSite extends Component {

  handleSignin = () =>{
    //this.props.dispatch(actions.signin);
  }

  render() {
    return (
      <div className="membersite-form">
        <div className="info-form">
            <div className="info-image"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps)(MemberSite);

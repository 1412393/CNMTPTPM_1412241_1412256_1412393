import React, { Component } from 'react';
import * as actions from '../actions/InitData.js'
import {connect} from 'react-redux';

class MemberSite extends Component {

  handleSignin = () =>{
    this.props.dispatch(actions.signin);
  }

  render() {
    return (
      <div className= "membersite-form">

      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps)(MemberSite);

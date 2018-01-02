import React, { Component } from 'react';
import * as actions from '../actions/InitData.js'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


const stylePaper = {
  height: 350,
  width: 400,
  margin: 0,
  textAlign: 'center',
  display: 'inline-block',
};

const style = {
  margin: 12,
};
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class MemberSite extends Component {
  constructor(props) {
      super(props);
      this.state = {
        stage: "transactions",
        address: "fsdafasdfasdfasfsdf"
      };
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  handleSignin = () =>{
    //this.props.dispatch(actions.signin);
  }

  render() {
    return (
      <div className="membersite-form">
        <div className="info-form">
            <div className="info-image"></div>
            <div className="address-data">
              <h6 id="email">{this.props.data.user.email}</h6>
              <h6 id="address">Your address : {this.props.data.user.address}</h6>
            </div>
            <div className="kcoin-data">
              <h6 id="actual">Actual KCoin: {this.props.data.user.actual_coins}</h6>
              <h6 id="available">Available KCoin: {this.props.data.user.available_coins}</h6>
            </div>
        </div>
        <div className="trading-form">
          <MuiThemeProvider>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Transactions" value="transactions">
              <div className="transactions-table">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>KCoin</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn>John Smith</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                  </TableRow>

                </TableBody>
              </Table>
              </div>
              <div className="send-btn">
                <RaisedButton label="Send All" secondary={true} style={style} />
              </div>
            </Tab>
            <Tab label="History" value="history">
            </Tab>
          </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="add-form">
        <MuiThemeProvider>
          <Paper style={stylePaper} zDepth={4}>
            <h4> Add transaction </h4>
            <input ref="address" type="text" id="address" name="address" placeholder="Address.."/>
            <input ref="kcoin" type="number" id="kcoin" name="kcoin" placeholder="Kcoin.."/>
            <div className="add-btn">
              <RaisedButton label="Add" secondary={true} style={style} />
            </div>
          </Paper>
        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
      data: state.signinData.result
    }
}

export default connect(mapStateToProps)(MemberSite);

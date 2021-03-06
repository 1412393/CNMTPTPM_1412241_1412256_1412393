import React, { Component } from 'react';
import * as actions from '../actions/Admin.js'
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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Pagination from 'material-ui-pagination';
import { Redirect } from 'react-router-dom'


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

class AdminSite extends Component {
  constructor(props) {
      super(props);
      this.state = {
        stage: "transactions",
        indexPageTrans: 1,
        indexPageHis: 1,
        open: false,
        detail: {}
      };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  renderDialog = () =>{
    if(this.state.detail.transaction !== undefined)
    return(
      <div id="modal">
      <span>Transaction Hash: {this.state.detail.transaction}</span><br/>
      <span>From: {this.state.detail.sender}</span><br/>
      <span>To: {this.state.detail.receiver}</span><br/>
      <span>Value: {this.state.detail.value}</span><br/>
      </div>
    )
    else return(
      <div id="modal">
        <span>Email: {this.state.detail.email}</span><br/>
        <span>Address: {this.state.detail.address}</span><br/>
        <span>Actual KCoin: {this.state.detail.actual_coins}</span><br/>
        <span>Available KCoin: {this.state.detail.available_coins}</span><br/>
      </div>
    )
  }

  componentDidMount(){
    this.props.dispatch(actions.renew());
  }

  render() {
    if(!this.props.logged){
      return(
      <Redirect to="/" />
      )
    }
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={() => this.setState({open:false})}
      />,
    ];
    const {amount_actual_coin,amount_available_coin,amount_user} = this.props.data.info !== undefined ? this.props.data.info : "";
    const users = this.props.data.users !== undefined ? this.props.data.users : [];
    const history = this.props.data.history !== undefined ? this.props.data.history : [];
    return (
      <div className="adminsite-form">
        <div className="info-form">
            <div className="info-image"></div>
            <div className="address-data">
              <h4>WELCOME ADMIN</h4>
            </div>
            <div className="kcoin-data">
              <h6 id="actual">Actual KCoin: {amount_actual_coin}</h6>
              <h6 id="available">Available KCoin: {amount_available_coin}</h6>
              <h6 id="totaluser">Total Users: {amount_user}</h6>
            </div>
        </div>
        <div className="trading-form">
          <MuiThemeProvider>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Users" value="transactions">
              <div className="transactions-table">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Actual</TableHeaderColumn>
                    <TableHeaderColumn>Available</TableHeaderColumn>
                    <TableHeaderColumn>Email</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>Detail</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {users.map((data,index)=>{
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{data.actual_coins}</TableRowColumn>
                      <TableRowColumn>{data.available_coins}</TableRowColumn>
                      <TableRowColumn>{data.email}</TableRowColumn>
                      <TableRowColumn>{data.address}</TableRowColumn>
                      <TableRowColumn><RaisedButton label="Detail" onClick={()=> this.setState({open:true,detail: data})} style={{margin:1}} /></TableRowColumn>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              </div>
              <div className="membersite-pagination">
              <Pagination
                  total = { 3 }
                  current = { this.state.indexPageTrans }
                  display = { 3 }
                  onChange = { indexPageTrans => this.setState({ indexPageTrans }) }
              />
              </div>
            </Tab>
            <Tab label="Transactions" value="history">
            <div className="transactions-table">
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>From</TableHeaderColumn>
                    <TableHeaderColumn>To</TableHeaderColumn>
                    <TableHeaderColumn>KCoin</TableHeaderColumn>
                    <TableHeaderColumn>Detail</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {history.map((data,index)=>{
                    if(index< this.state.indexPageHis*5 && index >= (this.state.indexPageHis-1)*5)
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{data.sender}</TableRowColumn>
                      <TableRowColumn>{data.receiver}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn><RaisedButton label="Detail" onClick={()=> this.setState({open:true,detail: data})} style={{margin:1}} /></TableRowColumn>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="membersite-pagination">
            <Pagination
                total = { 8 }
                current = { this.state.indexPageHis }
                display = { 8 }
                onChange = { indexPageHis => this.setState({ indexPageHis }) }
            />
            </div>
            </Tab>
          </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="logout-btn">
        <MuiThemeProvider>
          <RaisedButton onClick={() => window.location = "/"} label="Logout" primary={true} style={style} />
          <Dialog
            title= {this.state.detail.transaction !== undefined ? "Transaction Detail" : "User Detail" }
            actions={actions}
            modal={true}
            open={this.state.open}
            >
              {this.renderDialog()}
          </Dialog>
        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
      isLogging : state.signinData.isLogging,
      logged : state.signinData.logged,
      data: state.adminData.result
    }
}

export default connect(mapStateToProps)(AdminSite);

import React, { Component } from 'react';
import * as actions from '../actions/Member.js'
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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

class MemberSite extends Component {
  constructor(props) {
      super(props);
      this.state = {
        stage: "transactions",
        open: false,
        indexPageTrans: 1,
        indexPageHis: 1,
        indexPageRecent: 1,
        transactions:[],
        available: 0,
        isFirstLoad: true,
        detail: {}
      };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleClear= () =>{
    this.setState({transactions: []})
  }

  handleSend = () =>{
    const transactions = this.state.transactions
    const content = {
      user:{
        address: sessionStorage.address
      },
      receivers: transactions
    }
    this.props.dispatch(actions.send(content))
  }

  handleAdd = () =>{
    const address = this.refs.address.value;
    const value = parseInt(this.refs.kcoin.value);
    let transaction = {
      address: address,
      value: value,
      status: "Ready",
    }
    this.setState({
      transactions: this.state.transactions.concat(transaction)
    })
    console.log(this.state.transactions)
  }
  handleRenew = () => {
    this.props.dispatch(actions.update(sessionStorage.email))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.sent === true){
      var transactions = this.state.transactions;
      var available = this.state.available;
      transactions.forEach((item) => item.status = "Success");
      var sent = 0;
      for(let i= 0;i<transactions.length;i++){
        sent += transactions[i].value;
      }
      console.log(sent)
      available -= sent;
      this.setState({
        transactions: transactions,
        available: available
      })
    }

    if(nextProps.isSending === true){
      var transactions = this.state.transactions;
      transactions.forEach((item) => item.status = "Sending");
      this.setState({
        transactions: transactions,
      })
    }

    if(nextProps.data.available_coins && this.state.isFirstLoad){
      this.setState({
        available: nextProps.data.available_coins,
        isFirstLoad: false,
      })
    }
  }

  componentDidMount(){
    this.props.dispatch(actions.update(sessionStorage.email))
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

    const history = this.props.data.history !== undefined ?  this.props.data.history: [];
    const localtransaction = this.props.data.localtransaction !== undefined ?  this.props.data.localtransaction: [];
    const address =  this.props.data.address !== undefined ?  this.props.data.address: "";
    const actual_coins = this.props.data.actual_coins !== undefined ?  this.props.data.actual_coins: "";
    const available_coins = this.props.data.available_coins !== undefined ?  this.props.data.available_coins: "";

    return (
      <div className="membersite-form">
        <div className="info-form">
            <div className="info-image"></div>
            <div className="address-data">
              <h6 id="email">{this.props.result.user.email}</h6>
              <h6 id="address">Your address : {address}</h6>
            </div>
            <div className="kcoin-data">
              <h6 id="actual">Actual KCoin: {this.props.data.actual_coins}</h6>
              <h6 id="available">Available KCoin: {this.state.available}</h6>
            </div>
        </div>
        <div className="trading-form">
          <MuiThemeProvider>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="On stage" value="transactions">
              <div className="transactions-table">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>KCoin</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.transactions.map((data,index)=>{
                    if(index< this.state.indexPageTrans*5 && index >= (this.state.indexPageTrans-1)*5)
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{data.address}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn><span id={data.status}>{data.status}</span></TableRowColumn>
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
              <div className="send-btn">
                <RaisedButton onClick={this.handleClear} label="Clear All" secondary={true} style={style} />
                <RaisedButton onClick={this.handleSend} label="Send All" secondary={true} style={style} />
              </div>
            </Tab>
            <Tab label="Success History" value="history">
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
                total = { 3 }
                current = { this.state.indexPageHis }
                display = { 3 }
                onChange = { indexPageHis => this.setState({ indexPageHis }) }
            />
            </div>
            <div className="send-btn">
                <RaisedButton onClick={this.handleRenew} label="Renew" secondary={true} style={style} />
            </div>

            </Tab>
            <Tab label="Recent" value="recent">
            <div className="transactions-table">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>KCoin</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {localtransaction.map((data,index)=>{
                    if(index< this.state.indexPageRecent*5 && index >= (this.state.indexPageRecent-1)*5)
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{"Send"}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn>{data.state}</TableRowColumn>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              </div>
            <div className="membersite-pagination">
            <Pagination
                total = { 3 }
                current = { this.state.indexPageRecent }
                display = { 3 }
                onChange = { indexPageRecent => this.setState({ indexPageRecent }) }
            />
            </div>
            <div className="send-btn">
                <RaisedButton onClick={this.handleRenew} label="Renew" secondary={true} style={style} />
            </div>

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
              <RaisedButton onClick={this.handleAdd} label="Add" secondary={true} style={style} />
            </div>
          </Paper>
        </MuiThemeProvider>
        </div>
        <div className="logout-btn">
        <MuiThemeProvider>
          <RaisedButton onClick={() => window.location = "/"} label="Logout" primary={true} style={style} />
          <Dialog
          title="Transaction Detail"
          actions={actions}
          modal={true}
          open={this.state.open}
          >
          <div id="modal">
              <span>From: {this.state.detail.sender}</span><br/>
              <span>To: {this.state.detail.receiver}</span><br/>
              <span>Value: {this.state.detail.value}</span><br/>
          </div>
          </Dialog>
        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
      isSending: state.memberData.isSending,
      sent: state.memberData.sent,
      data: state.memberData.data,

      result: state.signinData.result,
      logged: state.signinData.logged
    }
}

export default connect(mapStateToProps)(MemberSite);

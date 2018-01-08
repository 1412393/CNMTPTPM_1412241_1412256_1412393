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
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Pagination from 'material-ui-pagination';


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
        indexPageTrans: 1,
        indexPageHis: 1,
        transactions:[],
        history:[],
      };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleRenew = () =>{

  }

  handleAdd = () =>{
    const address = this.refs.address.value;
    const value = parseInt(this.refs.kcoin.value);
    let transaction = {
      address: address,
      value: value
    }
    this.setState({
      transactions: this.state.transactions.concat(transaction)
    })
    console.log(this.state.transactions)
  }

  render() {
    return (
      <div className="adminsite-form">
        <div className="info-form">
            <div className="info-image"></div>
            <div className="address-data">
              <h4>WELCOME ADMIN</h4>
            </div>
            <div className="kcoin-data">
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
                    <TableHeaderColumn>Actual</TableHeaderColumn>
                    <TableHeaderColumn>Available</TableHeaderColumn>
                    <TableHeaderColumn>Email</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.transactions.map((data,index)=>{
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{data.address}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
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
            <Tab label="History" value="history">
            <div className="transactions-table">
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>From</TableHeaderColumn>
                    <TableHeaderColumn>To</TableHeaderColumn>
                    <TableHeaderColumn>KCoin</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.history.map((data,index)=>{
                    return(
                    <TableRow key={index}>
                      <TableRowColumn>{data.address}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
                      <TableRowColumn>{data.value}</TableRowColumn>
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
            </Tab>
          </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="logout-btn">
        <MuiThemeProvider>
          <RaisedButton onClick={() => window.location = "/"} label="Logout" primary={true} style={style} />
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

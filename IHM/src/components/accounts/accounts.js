import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from "notistack";
import {CircularProgress, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";


const cardWidth = 200;
const cardHeight = 280;
const styles = theme => ({
  main: {
    flexDirection: 'column',
    padding: '0px',
    display: 'flex',
    flex: '1 1 auto'
  },
  upperPart: {
    display: 'flex',
    flex: '1 1 auto',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexWrap: 'wrap',
    flexDirection: 'column'
  },
  bottomPart: {
    display: 'flex',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    minWidth: cardWidth,
    maxWidth: cardWidth,
    height: cardHeight,
    margin: '15px',
    cursor: 'pointer',
  },
  cardTitle: {
    display: 'flex',
    flexGrow: 'grow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    height: '100px',
  },
  divider: {
    backgroundColor: '#177792',
    marginBottom: '15px',
  },
  content: {
    minHeight: '190px',
  },
  cardButton: {color: '#177792', fontWeight: 'bold'},
  invisible: {
    opacity: "0",
    width: "0px",
    height: "0px",
    visibility: "hidden"
  },
  fileName: {
    marginLeft: '15px',
  },
  tabContent: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',

  },
  tab: {maxHeight: '48px'},
  tabContainer: {
    display: 'flex',
    maxHeight: '48px'
  },
  overTab: {
    display: 'flex',
    flex: '0 0 auto',
    padding: '15px',
    alignItems:'center'
  }
});

class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedAccount: 0,
    }
  }


  render() {
    return (
      <div style={{display: 'flex', flexGrow: 1}}>
        {this.getContent()}
      </div>
    )
  }

  getContent() {
    const {classes} = this.props;
    let accounts = [{'name': '- Select an account -', 'id': '0'}].concat(this.props.accounts);
    return (
      <div className={classes.main}>
        <div className={classes.upperPart}>
          <div className={classes.overTab}>
            {this.props.fetchingAccounts === true &&
            <CircularProgress size={50} color={"secondary"}/>
            }
            {this.props.fetchingAccounts === false &&
            <Select variant={"outlined"}
                    value={this.state.selectedAccount}
                    onChange={this.handleChangeAccount}
                    style={{marginRight:'15px'}}
            >
              {accounts.map((account, index) => (
                <MenuItem
                  key={account.id}
                  value={account.id}
                >
                  <div>
                    {index === 0 && <em>{account.name}</em>}
                    {index > 0 && account.name}
                  </div>

                </MenuItem>
              ))}
            </Select>
            }
            Select account
            Select Year
          </div>
          <Tabs value={this.state.selectedTab} onChange={this.handleChangeTab} aria-label="simple tabs example"
                className={classes.tab}>
            <Tab label="January" id={1}/>
            <Tab label="February" id={2}/>
            <Tab label="Mach" id={3}/>
            <Tab label="April" id={4}/>
            <Tab label="May" id={5}/>
            <Tab label="June" id={6}/>
            <Tab label="July" id={7}/>
            <Tab label="August" id={8}/>
            <Tab label="September" id={9}/>
            <Tab label="October" id={10}/>
            <Tab label="November" id={11}/>
            <Tab label="December" id={12}/>
          </Tabs>
          <div className={classes.tabContent}>
            {'Content for tab ' + this.state.selectedTab}
          </div>
        </div>
      </div>
    );
  }

  handleChangeAccount = event => {
    this.setState({selectedAccount: event.target.value})
  }
  handleChangeTab = (event, newValue) => {
    console.log(newValue);
    this.setState({selectedTab: newValue})
  }
}


const exportedUploadData = withRouter(withStyles(styles)(withSnackbar(Accounts)));
export default connect(store => {
  return {
    pages: store.pages,
    user: store.user,
    uploadingFile: store.importExport.uploadingFile,
    fetchingAccounts: store.importExport.fetchingAccounts,
    accounts: store.importExport.accounts,
  };
})(exportedUploadData);
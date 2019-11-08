import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from "notistack";
import {CircularProgress, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {getAccountData} from "../../redux/actions/account-actions";
import AccountTable from "./accountTable";
import MonthStatistics from "./monthStatistics";
import YearStatistics from "./yearStatistics";
import Button from "@material-ui/core/Button/Button";


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
    overflowY: 'auto',

  },
  tab: {
    maxHeight: '48px',

  },
  tabContainer: {
    display: 'flex',
    maxHeight: '48px'
  },
  overTab: {
    display: 'flex',
    flex: '0 0 auto',
    padding: '15px',
    alignItems: 'center'
  }
});


class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      selectedAccount: props.accounts[0].id,
      selectedYear: new Date().getFullYear(),
      showYearStatistic: false,
    }
  }


  render() {
    return (
      <div style={{display: 'flex', flex: '1 1 auto'}}>
        {this.getContent()}
      </div>
    )
  }

  getYearStatisticsContent() {
    return (<div>
      STATISTICS
      <YearStatistics/>
    </div>)
  }

  getAccountContent() {
    const {classes} = this.props;
    return [
      <Tabs
        value={this.state.selectedTab}
        onChange={this.handleChangeTab}
        aria-label="simple tabs example"
        className={classes.tab}
        key={'tabs_accounts'}
      >
        <Tab label="January" id={1} value={1}/>
        <Tab label="February" id={2} value={2}/>
        <Tab label="March" id={3} value={3}/>
        <Tab label="April" id={4} value={4}/>
        <Tab label="May" id={5} value={5}/>
        <Tab label="June" id={6} value={6}/>
        <Tab label="July" id={7} value={7}/>
        <Tab label="August" id={8} value={8}/>
        <Tab label="September" id={9} value={9}/>
        <Tab label="October" id={10} value={10}/>
        <Tab label="November" id={11} value={11}/>
        <Tab label="December" id={12} value={12}/>
      </Tabs>,
      <div className={classes.tabContent} key={'statistics_accounts'}>
        <AccountTable/>
        <MonthStatistics month={this.state.selectedTab}/>
      </div>
    ];
  }

  getAccountMenu() {
    const {classes} = this.props;
    return (
      <div className={classes.overTab}>
        {this.props.fetchingAccounts === true &&
        <CircularProgress size={50} color={"secondary"}/>
        }
        {this.getAccountSelect()}
        {this.getYearSelect()}
        {this.getYearStatisticButton()}
      </div>);
  }

  getContent() {
    const {classes} = this.props;

    let content = this.state.showYearStatistic === false ? this.getAccountContent() : this.getYearStatisticsContent();

    return (
      <div className={classes.main}>
        <div className={classes.upperPart}>
          {this.getAccountMenu()}
          {content}
        </div>
      </div>
    );
  }

  getAccountSelect() {
    let accounts = [{'name': '- Select an account -', 'id': '0'}].concat(this.props.accounts);
    if (this.props.fetchingAccounts === false) {
      return (

        <Select variant={"outlined"}
                value={this.state.selectedAccount}
                onChange={this.handleChangeAccount}
                style={{marginRight: '15px'}}
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

      );
    }
    return null;
  }

  getYearSelect() {
    let currentYear = new Date().getFullYear(), yearTable = [];
    for (let i = currentYear; i > currentYear - 30; i--) {
      yearTable.push(i);
    }

    return (
      <Select
        variant={"outlined"}
        value={this.state.selectedYear}
        onChange={this.handleChangeSelectYear}
        style={{marginRight: '15px'}}>
        {yearTable.map(year => (
          <MenuItem
            key={year}
            value={year}
          >
            <div>{year}</div>
          </MenuItem>
        ))}

      </Select>
    );
  }

  getYearStatisticButton() {
    return (
      <Button
        variant={'contained'}
        color={"secondary"}
        onClick={this.handleShowHideYearStatistics}>
        {this.state.showYearStatistic === false ? 'Show year statistics' : 'Show accounts'}
      </Button>
    )
  }

  handleShowHideYearStatistics = event => {
    if (this.state.showYearStatistic === false) {
      this.props.dispatch(getAccountData(this.state.selectedAccount, null, null));
    } else {
      this.props.dispatch(getAccountData(this.state.selectedAccount, this.state.selectedYear, this.state.selectedTab));
    }
    this.setState({showYearStatistic: !this.state.showYearStatistic});

  };
  handleChangeSelectYear = event => {
    this.setState({selectedYear: event.target.value});
  };
  handleChangeAccount = event => {
    this.setState({selectedAccount: event.target.value});
  };

  handleChangeTab = (event, newValue) => {
    this.setState({selectedTab: newValue});
    this.props.dispatch(getAccountData(this.state.selectedAccount, this.state.selectedYear, newValue));
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
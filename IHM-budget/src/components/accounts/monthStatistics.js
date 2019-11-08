import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from "notistack";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {formatMoney, getCategory} from "../budgetUtils";


const styles = theme => ({
  main: {
    padding: '8px',
    display: 'flex',
    flex: '1 1 auto',
    overflowY: 'auto',
  },
  reason: {
    maxWidth: '300px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red'
  },
  clickable: {
    cursor: 'pointer'
  },
  table: {
    height: '100%'
  }

});


class MonthStatistic extends Component {
  state = {};

  render() {
    const {classes} = this.props;

    return <div className={classes.main}>
      {this.getContent()}
    </div>;
  }

  getContent() {

    let {credit, debit} = this.getCreditDebitAmount();
    let balance = credit - debit;

    return (
      <div>
        <Typography>MONTH STATISTICS</Typography>
        <div style={{textAlign: 'right'}}>
          <Typography>Credit: {formatMoney(credit, 2, '.', ' ')} €</Typography>
          <Typography>Debit: {formatMoney(debit, 2, '.', ' ')} €</Typography>
          <Divider/>
          <Typography>Balance: {formatMoney(balance, 2, '.', ' ')} €</Typography>
        </div>
        {this.getBudgetTable()}
      </div>
    )
  }

  getCreditDebitAmount() {
    let credit = 0, debit = 0;
    this.props.currentAccountData.forEach(element => {
      credit += element.credit || 0;
      debit += element.debit || 0;
    });
    credit = Math.round(credit * 100) / 100;
    debit = Math.round(debit * 100) / 100;
    return {credit, debit};
  }


  getBudgetTable() {
    let currentStatistic = this.getCurrentStatistics();

    return (
      <table>
        <thead>
        <tr>
          <th>Category</th>
          <th>Planned</th>
          <th>Real</th>
          <th>Conclusion</th>
          <th>Remain</th>
        </tr>
        </thead>
        <tbody>
        {currentStatistic.map((element, index) => {
          let conclusionBackground = element.conclusion === 'OK' ? 'green' : 'red';
          return (<tr style={{textAlign: 'right'}} key={'month_stat_' + index}>
            <td>{element.item}</td>
            <td>{formatMoney(element.value, 0, '.', ' ')} €</td>
            <td>{formatMoney(element.real, 2, '.', ' ')} €</td>
            <td style={{textAlign: 'center', backgroundColor: conclusionBackground}}>{element.conclusion}</td>
            <td>{formatMoney(element.remain, 2, '.', ' ')} €</td>

          </tr>);
        })}
        </tbody>
      </table>
    );
  }

  getCurrentStatistics() {
    let currentStats = [];
    this.props.currentBudget.forEach(element => {
      let real = this.getReal(element.item);
      // let real = element.value;
      let conclusion = real <= element.value ? 'OK' : 'WARN';
      let remain = real > 0 ? element.value - real : 'NA';
      currentStats.push({...element, real, conclusion, remain})
    });

    return currentStats

  }

  getReal(selectedCategory) {
    let real = 0;
    this.props.currentAccountData.forEach((element, index) => {
      let category = getCategory(element.reason, index, this.props.currentBudget);
      if (category.toUpperCase() === selectedCategory.toUpperCase()) {
        let debit = element.debit || 0;
        let credit = element.credit || 0;
        real += -credit + debit;
      }
    });
    return real;
  }

}


const exportedAccountTable = withRouter(withStyles(styles)(withSnackbar(MonthStatistic)));
export default connect(store => {
  return {
    currentAccountData: store.account.currentAccountData,
    currentBudget: store.budgets.currentBudget
  };
})(exportedAccountTable);
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from "notistack";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import classNames from "classnames"
import {Dialog, DialogActions, DialogContent, Select} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import * as budgetActions from "../../redux/actions/budget-actions";
import {getBudget} from "../../redux/actions/budget-actions";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {id: 'date', numeric: true, disablePadding: false, label: 'Date'},
  {id: 'reason', numeric: false, disablePadding: false, label: 'Operation'},
  {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
  {id: 'credit', numeric: true, disablePadding: false, label: 'Credit'},
  {id: 'debit', numeric: true, disablePadding: false, label: 'Debit'},
];

function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const styles = theme => ({
  main: {padding: '8px'},
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
  }

});


class AccountTable extends Component {
  state = {
    dense: true,
    order: 'asc',
    orderBy: 'date',
    selected: [],
    dialogOpen: false,
    currentIndex: 0,
    currentSelectedCategoryIndex: 0,
  };

  render() {
    const {classes} = this.props;
    return <div className={classes.main}>
      {this.getContent()}
      {this.getDialog()}
    </div>;
  }

  getContent() {
    const {classes} = this.props;
    const {dense, order, orderBy, selected} = this.state;
    return (
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={dense ? 'small' : 'medium'}
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={this.props.currentAccountData.length}
        />
        <TableBody>
          {stableSort(this.props.currentAccountData, getSorting(order, orderBy))
            .map((row, index) => {
              const isItemSelected = this.isSelected(row.name);
              // const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  // onClick={event => this.handleClick(event, row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.date + "_" + index}
                  selected={isItemSelected}
                >
                  <TableCell align="right">{new Date(row.date * 1000).toLocaleDateString()}</TableCell>
                  <TableCell align="left" className={classes.reason}>{row.reason}</TableCell>
                  <TableCell align="left" className={classNames(classes.reason, classes.clickable)}
                  >{this.getCategory(row.reason, index)}</TableCell>
                  <TableCell align="right">{row.credit === '' ? '' : Number(row.credit).toFixed(2)}</TableCell>
                  <TableCell align="right">{row.debit === '' ? '' : Number(row.debit).toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    )

  }

  addCategory = event => {
    // const {order, orderBy} = this.state;
    // let data = stableSort(this.props.currentAccountData, getSorting(order, orderBy));
    // console.log("should add category for ", data[event.target.id]);
    this.setState({dialogOpen: true, currentIndex: event.target.id});

  };

  getCategory(reason, index) {
    const {classes} = this.props;
    let currentClass = classes.green;
    let category = 'UNKNOWN';
    let data = this.props.currentBudget.filter(element => {
      if (element.categorieValues === undefined) return false;
      let categoriesFilter = element.categorieValues.filter(elementCat => {
        if (elementCat.label === reason) {
        }
        return elementCat.label === reason;
      });
      return categoriesFilter.length > 0;
    });

    if (data.length === 1) {
      category = data[0].item.toUpperCase();
    }
    if (category === 'UNKNOWN') {
      currentClass = classes.red
    }
    return <span className={currentClass} onClick={this.addCategory} id={index}>{category}</span>
  }

  getDialog() {
    const {order, orderBy} = this.state;
    let data = stableSort(this.props.currentAccountData, getSorting(order, orderBy));
    let titleReason = '';
    if (data[this.state.currentIndex] !== undefined) {
      titleReason = data[this.state.currentIndex].reason;
    }
    return (
      <Dialog open={this.state.dialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a category for :<br/> {titleReason}
          </DialogContentText>
          <Select
            value={this.state.currentSelectedCategoryIndex}
            onChange={this.updateSelectedCategoryIndex}
          >
            {this.props.currentBudget.map((budgetItem, index) => {
              return <MenuItem value={index} key={'item_' + index}>{budgetItem.item}</MenuItem>
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleAddItem} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  updateSelectedCategoryIndex = event => {
    this.setState({currentSelectedCategoryIndex: event.target.value});
  };
  handleClose = event => {
    this.setState({dialogOpen: false})
  };

  handleAddItem = event => {
    const {order, orderBy} = this.state;
    let data = stableSort(this.props.currentAccountData, getSorting(order, orderBy));
    let reason = data[this.state.currentIndex].reason;
    let budgetItems = this.props.currentBudget.slice();
    console.log(budgetItems, this.state.currentSelectedCategoryIndex);
    let isAlreadyIn = budgetItems[this.state.currentSelectedCategoryIndex].categorieValues.filter(element => {
      return element.value === reason;
    }).length > 0;
    if (isAlreadyIn === false) {
      budgetItems[this.state.currentSelectedCategoryIndex].categorieValues.push({label: reason, value: reason});
      this.props.dispatch(budgetActions.saveBudgetData(budgetItems, this.props.enqueueSnackbar, true));
      this.handleClose(event);
      this.props.dispatch(getBudget(this.props.enqueueSnackbar));
    }


  };


  isSelected = name => this.state.selected.indexOf(name) !== -1;

  handleRequestSort = (event, property) => {
    const {orderBy, order} = this.state;
    console.log(property);
    const isDesc = orderBy === property && order === 'desc';
    this.setOrder(isDesc ? 'asc' : 'desc');
    this.setOrderBy(property);
  };

  setOrder(value) {
    this.setState({order: value});
  }

  setOrderBy(value) {
    this.setState({orderBy: value});
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = this.props.currentAccountData.map((n, index) => index);
      this.setState({selected: newSelecteds});
      return;
    }
    this.setState({selected: []});
  };
}


const exportedAccountTable = withRouter(withStyles(styles)(withSnackbar(AccountTable)));
export default connect(store => {
  return {
    currentAccountData: store.account.currentAccountData,
    currentBudget: store.budgets.currentBudget
  };
})(exportedAccountTable);
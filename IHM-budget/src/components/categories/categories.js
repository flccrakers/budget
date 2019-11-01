import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withSnackbar} from "notistack";
import * as budgetActions from "../../redux/actions/budget-actions";
// import CreatableSelect from 'react-select/creatable';
import Creatable from 'react-select/creatable'
import {Typography} from "@material-ui/core";


const styles = theme => ({
  main: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    padding: '35px',
  },

});

class Categories extends Component {

  constructor(props) {
    super(props);
    this.resourceUploadInputRef = undefined;
    this.state = {
      budgetItems: props.currentBudget,
    }
  }


  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (prevProps.currentBudget !== this.props.currentBudget) {
      this.setState({budgetItems: this.props.currentBudget})
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flex: '1 1 auto', overflowY: 'auto'}}>
        {this.getContent()}
      </div>
    )
  }

  getContent() {
    const {classes} = this.props;

    console.log(this.state.budgetItems);
    return (
      <div className={classes.main}>
        {this.state.budgetItems.map(item => {
          if (item.type === 'debit') {
            // console.log(item.item, item.categorieValues);
            return (
              <div key={'category_item_' + item.item}>
                <Typography variant={'h5'}>{item.item}</Typography>
                <Creatable
                  isClearable
                  isMulti
                  onChange={this.handleChange}
                  // onInputChange={this.handleInputChange}
                  options={item.categorieValues}
                  value={item.categorieValues}
                  name={item.item}
                />
              </div>)
          }
        })}

      </div>
    );
  }

  handleChange = (newValue: any, actionMeta: any) => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.log(`item: ${actionMeta.name}`);
    let budgetItems = this.state.budgetItems.slice();
    budgetItems.forEach((itemObject, index, table) => {
      if (itemObject.item === actionMeta.name) {
        newValue.forEach((valueObject, index, newValueTable) => {
          if (valueObject.hasOwnProperty('__isNew__') === true) {
            newValueTable[index] = {label: valueObject.label, value: valueObject.value}
          }
        });
        table[index].categorieValues = newValue;
      }
    });
    // console.log(budgetItems);
    // console.groupEnd();
    this.setState({budgetItems});
    setTimeout(() => {
      this.saveItemListToDB(null)
    }, 50);
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  saveItemListToDB = event => {
    this.props.dispatch(budgetActions.saveBudgetData(this.state.budgetItems, this.props.enqueueSnackbar, true));
    // this.updateShouldSave(false);
  };


}

const exportedUploadData = withRouter(withStyles(styles)(withSnackbar(Categories)));
export default connect(store => {
  return {savingBudget: store.budgets.savingBudget, currentBudget: store.budgets.currentBudget};
})(exportedUploadData);
import * as budgetsService from '../../services/accountServices'

export function createBudget(name, enqueueSnackbar) {
  return function (dispatch) {
  }
}

export function saveBudgetData(budgetList, enqueueSnackbar, isCategory=false) {
  return function (dispatch) {
    dispatch({type: 'SAVING_BUDGET_DATA'});
    budgetsService.saveBudgetDataInDB(budgetList).then(result => {
      console.log(result);
      if(isCategory === false) {
        enqueueSnackbar('Budget saved', {variant: 'success', autoHideDuration: 4000});
      }else{
        enqueueSnackbar('Categories saved', {variant: 'success', autoHideDuration: 4000});
      }
      dispatch({type: 'SAVING_BUDGET_DATA_DONE'});

    }).catch(error => {
      dispatch({type: 'SAVING_BUDGET_DATA_ERROR', payload: error});
    });
  }
}

function compare( a, b ) {
  if ( a.item < b.item ){
    return -1;
  }
  if ( a.item > b.item ){
    return 1;
  }
  return 0;
}
export function getBudget(enqueueSnackbar) {
  return function (dispatch) {
    budgetsService.getBudgetDataFromDB().then(result => {
      enqueueSnackbar('Budget loaded', {variant: 'success', autoHideDuration: 4000});
      dispatch({type: 'FETCH_BUDGET_DATA', payload: result.sort(compare)})
    });
  }
}
import * as accountService from '../../services/accountServices'

export function getAccountData(accountId, year, month, enqueueSnackbar) {
  return function (dispatch) {
    dispatch({type: 'LOADING_ACCOUNT_DATA'});
    accountService.getAccountDataInDB(accountId, year, month).then(result => {
      // enqueuedSnackbar('File imported', {variant:'success', autoHideDuration:2000});
      // console.log("Should update the data for accountID "+accountId+" with file "+file.name);
      // importExportService.updateDataInDatabase(file.name, accountId).then(result=>{
      console.log(result);
      dispatch({type: 'LOADING_ACCOUNT_DATA'});
      dispatch({type: 'UPDATE_ACCOUNT_DATA', payload: result})
      // });

    }).catch(error => {
      dispatch({type: 'UPLOADING_FILE_ERROR', payload: 'error'})
    })
  }
}
import * as importExportService from '../../services/importExportServices'

export function uploadXLSXFile(file, accountId, enqueuedSnackbar) {
  return function (dispatch) {
    dispatch({type: 'UPLOADING_FILE'});
    importExportService.uploadXLSXFile([file]).then(result=>{
      enqueuedSnackbar('File imported', {variant:'success', autoHideDuration:2000});
      console.log("Should update the data for accountID "+accountId+" with file "+file.name);
      importExportService.updateDataInDatabase(file.name, accountId).then(result=>{
        console.log(result);
        dispatch({type:'UPLOADING_FILE_DONE'});
      });

    }).catch(error=>{
      dispatch({type: 'UPLOADING_FILE_ERROR', payload:'error'})
    })
  }
}

export function fetchAccountList(enqueuedSnackbar){
  return function (dispatch){
    dispatch({type:'FETCHING_ACCOUNT_LIST'});
    importExportService.getAccountList().then(accounts=>{
      dispatch({type:'FETCHING_ACCOUNT_LIST_DONE'});
      dispatch({type:'UPDATE_ACCOUNT_LIST', payload: accounts});
    }).catch(error=>{console.error(error)});
  }
}
import * as importExportService from '../../services/importExportServices'

export function uploadXLSXFile(file, enqueuedSnackbar) {
  return function (dispatch) {
    dispatch({type: 'UPLOADING_FILE'});
    importExportService.uploadXLSXFile(file).then(result=>{
      console.log(result);
      dispatch({type:'UPLOADING_FILE_DONE'});
      enqueuedSnackbar('File imported', {variant:'success', autoHideDuration:2000})
    }).catch(error=>{
      dispatch({type: 'UPLOADING_FILE_ERROR', payload:'error'})
    })

  }

}
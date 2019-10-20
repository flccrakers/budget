import * as initialState from '../initialState';

export default function reducer(state = initialState.getImportExportInitialState(), action) {
  switch (action.type) {
    case "UPLOADING_FILE":
      return {...state, uploadingFile: true};
    case "UPLOADING_FILE_DONE":
      return {...state, uploadingFile: false};
    case "UPLOADING_FILE_ERROR":
      return {...state, errorUploadingFile: action.payload};
    case "FETCHING_ACCOUNT_LIST":
      return{...state, fetchingAccounts:true};
    case "FETCHING_ACCOUNT_LIST_DONE":
      return{...state, fetchingAccounts:false};
    case "FETCHING_ACCOUNT_LIST_ERROR":
      return{...state, errorFetchingAccounts:action.payload};
    case "UPDATE_ACCOUNT_LIST":
      return{...state, accounts:action.payload};
    case "persist/REHYDRATE": {
      if (action.payload !== undefined) {
        return {...state, ...action.payload.importExport};
      }
      return {...state}
    }
    default:
      return {...state};
  }
}
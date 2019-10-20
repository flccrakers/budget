import * as initialState from '../initialState';

export default function reducer(state = initialState.getImportExportInitialState(), action) {
  switch (action.type) {
    case "UPLOADING_FILE":
      return {...state, uploadingFile: true};
    case "UPLOADING_FILE_DONE":
      return {...state, uploadingFile: false};
    case "UPLOADING_FILE_ERROR":
      return {...state, errorUploadingFile: action.payload}

    case "persist/REHYDRATE": {
      if (action.payload !== undefined) {
        return {...state, ...action.payload.account};
      }
      return {...state}
    }
    default:
      return {...state};
  }
}
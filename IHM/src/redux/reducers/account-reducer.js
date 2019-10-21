import * as initialState from '../initialState';

export default function reducer(state = initialState.getAccountInitialState(), action) {
  switch (action.type) {
    case "LOADING_ACCOUNT_DATA":
      return {...state, loadingAccountData: true};
    case "LOADING_ACCOUNT_DATA_DONE":
      return {...state, loadingAccountData: false};
    case "LOADING_ACCOUNT_DATA_ERROR":
      return {...state, loadingAccountError: action.payload};
    case "UPDATE_ACCOUNT_DATA":
      return {...state, currentAccountData: action.payload};

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
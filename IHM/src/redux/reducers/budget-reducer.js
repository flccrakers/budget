import * as initialState from '../initialState';

export default function reducer(state = initialState.getBudgetInitialState(), action) {
  switch (action.type) {
    case "CREATING_BUDGET":
      return {...state, creatingBudget: true};
    case "CREATING_BUDGET_DONE":
      return {...state, creatingBudget: false};
    case "CREATING_BUDGET_ERROR":
      return {...state, creatingBudgetError: action.payload};
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
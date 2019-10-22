import * as initialState from '../initialState';

export default function reducer(state = initialState.getBudgetInitialState(), action) {
  switch (action.type) {
    case "FETCH_BUDGET_DATA":
      return {...state, currentBudget: action.payload}
    case "SAVING_BUDGET_DATA":
      return {...state, savingBudget: true};
    case "SAVING_BUDGET_DATA_DONE":
      return {...state, savingBudget: false};
    case "SAVING_BUDGET_ERROR":
      return {...state, savingBudgetError: action.payload};
    case "CREATING_BUDGET_DONE":
      return {...state, creatingBudget: false};
    case "CREATING_BUDGET_ERROR":
      return {...state, creatingBudgetError: action.payload};
    case "UPDATE_ACCOUNT_DATA":
      return {...state, currentAccountData: action.payload};

    case "persist/REHYDRATE": {
      if (action.payload !== undefined) {
        return {...state, ...action.payload.budgets};
      }
      return {...state}
    }
    default:
      return {...state};
  }
}
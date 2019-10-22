import * as serviceBase from "./serviceBase";

export function getAccountDataInDB(accountId, year, month) {
  return serviceBase.postJSON('/get_account_data', {accountId, year, month});
}

export function saveBudgetDataInDB(data){
  return serviceBase.postJSON('/update_budget_data', {data})
}

export function getBudgetDataFromDB(){
  return serviceBase.postJSON('/get_budget_data', {})

}


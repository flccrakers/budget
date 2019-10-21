import * as serviceBase from "./serviceBase";

export function getAccountDataInDB(accountId, year, month) {
  return serviceBase.postJSON('/get_account_data', {accountId, year, month});
}


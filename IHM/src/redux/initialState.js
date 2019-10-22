export function getImportExportInitialState() {
  return {
    uploadingFile: false,
    errorUploadingFile: {},
    accounts: [],
    fetchingAccounts: false,
  };
}

export function getAccountInitialState() {
  return {
    loadingAccountData: false,
    currentAccountData: [],
  }
}

export function getBudgetInitialState() {
  return {
    creatingBudget: false,
    creatingBudgetError: '',
    currentBudget: [],
    savingBudget:false,
  }
}
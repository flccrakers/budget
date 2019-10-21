export function getImportExportInitialState() {
  return {
    uploadingFile: false,
    errorUploadingFile: {},
    accounts:[],
    fetchingAccounts:false,
  };
}

export function getAccountInitialState(){
  return{
    loadingAccountData:false,
    currentAccountData:[],
  }

}
import * as serviceBase from "./serviceBase";

export function uploadXLSXFile(files) {

  console.log("will update files ", files);
  let query = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    query.push(serviceBase.postFileToFlask('/upload_data_from_xlsx', {file}, {}))
  }

  return Promise.all(query);
}


export function getAccountList() {
  return serviceBase.getJSON('/get_account_list', {});
}


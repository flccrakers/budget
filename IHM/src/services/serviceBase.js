import config from "../config";
import moment from "moment";

let currentServerBaseHostname = `${config.flaskBaseScheme}://${config.flaskBaseHostname}`;
let currentServerBasePath = `${currentServerBaseHostname}:${config.flaskBasePort}`;


export function getServerBaseHostname() {
  return currentServerBaseHostname;
}

export function getServerBasePath() {
  return currentServerBasePath;
}

export function postJSON(url: string, bodyPayload: any, queryPayload?: any) {
  let finalUrl = composeUrl(url, queryPayload);

  let data = new FormData();
  data.append("json", JSON.stringify(bodyPayload));
  return fetch(currentServerBasePath + finalUrl, {
    method: "POST",
    body: data
  }).then(function (response) {
    let contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  }).then((response: IJSONWrapper) => {

    if (response.hasOwnProperty("IsSuccess")) {
      if (response.IsSuccess === true) {
        return response.Payload;
      } else {
        throw new Error(response.GeneralException);
      }
    } else return response;
  }).then(payload => {
    return payload
  }).catch(error => {
    console.error(error);
    if (error.toString().includes('Check your password and login name')) {
      throw new Error('The password and login name is not recognized');
    } else {
      throw new Error("Something wen't wrong ask your administrator and watch the console for details");
    }
  });
}

export function composeUrl(baseUrl: string, queryPayload?: any): string {
  let finalUrl = baseUrl;
  if (queryPayload != null) {
    if (!finalUrl.endsWith("?"))
      finalUrl += "?";

    finalUrl = Object.keys(queryPayload).reduce((currentUrl, key) => {
      let value = queryPayload[key];

      if (Array.isArray(value)) {
        value.forEach((cell) => {
          currentUrl += `${key}=${encodeURIComponent(cell)}&`;
        });
      } else if (value instanceof Date) {
        currentUrl += `${key}=${encodeURIComponent(moment(value).local().format("MM/DD/YYYY HH:mm:ss.SSS"))}&`;

      } else {
        currentUrl += `${key}=${encodeURIComponent(value)}&`;
      }
      return currentUrl;
    }, finalUrl);
  }
  return finalUrl;
}

export function getJSON(baseUrl: string, queryPayload?: any) {
  let finalUrl = composeUrl(baseUrl, queryPayload);
  return fetch(currentServerBasePath + finalUrl, {
    method: "GET",
  }).then((response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  }).then((response) => {
    if (response.hasOwnProperty("IsSuccess")) {
      // console.log(response);
      // Probably a NXResultContainer
      if (response.IsSuccess === true) {
        return response.Payload;
      } else {
        throw new Error(response.GeneralException);
      }
    } else return response;
  });
}



function showFile(blob, fileName, type) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  let newBlob = new Blob([blob], {type: type});

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = URL.createObjectURL(newBlob);
  let link = document.createElement("a");
  link.href = data;
  link.download = fileName;
  link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));

  setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    },
    100);


}

export function postFileToFlask(url: String, bodyPayload: any, queryPayload?: any) {
  let finalUrl = composeUrl(url, queryPayload);
  let data = new FormData();

  data.append('file', bodyPayload.file);
  data.append('filename', bodyPayload.file.name);

  return fetch(currentServerBasePath + finalUrl, {
    method: "POST",
    body: data,
  }).then(response => {
    return handleFlaskServerResponse(response, bodyPayload);
  }).catch(error => {
    return ({"IsSuccess": false, "Message": error});
  });
}

function handleFlaskServerResponse(response, bodyPayload) {
  let contentType = response.headers.get("content-type");
  // console.log(contentType);
  if (contentType && contentType.indexOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") !== -1) {
    handleBlobData(response.blob(), bodyPayload.file.name, contentType);
    return ({"IsSuccess": true});
  } else {
    return handleJsonData(response.json());
  }
}

function handleJsonData(jsonPromise: Promise) {
  return jsonPromise.then(json => {
    // console.log(json);
    if (json.hasOwnProperty("IsSuccess")) {
      if (json.IsSuccess === true) {
        return json.Payload;
      } else {
        throw new Error(json.GeneralException);
      }
    } else return json;
  });
}

function handleBlobData(blobPromise, filename, type) {
  filename = filename.split('.').slice(0, -1).join('.') + '_for_import_in_synergy.xlsx';
  blobPromise.then(blob => {
    showFile(blob, filename, type);
  })

}
import version from "./components/version";

const dev = {
  serverBaseScheme: "http",
  serverBaseHostname: "eNovalysServ",
  serverBasePort: "4000",
  flaskBaseScheme: "http",
  flaskBaseHostname: "localhost",
  flaskBasePort: "6767",
  version: "TESTING-" + version,
  shouldAddReduxLogger: true,
  shouldAddFakeEmail: true,
  isProd: false
};

const prod = {
  serverBaseScheme: "https",
  serverBaseHostname: "intranet.novalix.com",
  serverBasePort: "443",
  flaskBaseScheme: "https",
  flaskBaseHostname: "intranet.novalix.com",
  flaskBasePort: "6767",
  version: version,
  shouldAddReduxLogger: false,
  shouldAddFakeEmail: false,
  isProd: true
};


const config: configDTO = process.env.REACT_APP_STAGE === "dev" ? dev : prod;


export default {
  ...config
  // Add common config values here
};
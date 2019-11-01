import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./components/home";
// import Login from "./components/login"
// import DisplayDailyEvent from "./components/events/display-events-page"
// import GenericNotFound from "./components/not-found";
import {SnackbarProvider, withSnackbar} from 'notistack';
import {connect} from "react-redux";
// import * as userActions from "./redux/actions/user-action";

class App extends Component {
  // componentDidMount(): void {
  //   this.updateIP();
  // }

  // updateIP() {
  //   fetch('https://api.ipify.org/?format=json').then(response => {
  //     let contentType = response.headers.get("content-type");
  //     if (contentType && contentType.includes("application/json")) {
  //       return response.json();
  //     }
  //   }).then(json => {
  //     console.log(json.ip);
  //     this.props.dispatch(userActions.updateCurrentIP(json.ip));
  //   });
  // }

  render() {
    return (
      <Router>
        <div style={{flexGrow: 1, display: 'flex'}}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/upload-data' component={Home}/>
            <Route exact path='/accounts' component={Home}/>
            <Route exact path='/budgets' component={Home}/>
          </Switch>
        </div>
      </Router>

    );
  }


}


const MyApp = withSnackbar(App);
const ConnectedApp = connect(store => {
  return {
    user: store.user,
  }
})(MyApp);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ConnectedApp/>
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;

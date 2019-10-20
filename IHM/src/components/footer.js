import React, {Component} from 'react';
import config from "../config";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
// import * as userActions from '../redux/actions/user-action';
// import * as dialogActions from '../redux/actions/dialogActions';
// import dialogType from "../service/constants/dialogTypeRef";
// import IntranetDialog from './dialogs/dialog';
// import {isAuthenticated, updateLastActivity} from "../service/userService";


class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastSavedMoveInRedux: Date.now(),
      sessionTime: 60, //session time in minute
    };
    this.handlingOnMouseMove = this.handlingOnMouseMove.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener("mousemove", this.handlingOnMouseMove);
  }

  componentWillUnmount() {
    this.detachEventListener();
  }

  handlingOnMouseMove(event) {

    let now = Date.now();
    // if (this.props.user.isLogged === true) {
    if ((now - this.state.lastSavedMoveInRedux) > 1000 * 30) {//do it every 30 seconds
      this.setState({lastSavedMoveInRedux: now});
      // isAuthenticated(this.props.user.user.guid).then(authenticated => {
      //   if (authenticated === false) {
      //     this.generateAutomaticLogout();
      //   } else {
      //     updateLastActivity(this.props.user.user.guid);
      //   }
      // });
      // }
    }
  }

  generateAutomaticLogout() {
    let guid = this.props.user.user.guid;
    // this.props.dispatch(userActions.logout(guid));
    // this.props.dispatch(dialogActions.updateDialogAndShow(dialogType.AUTOMATIC_LOGOUT));
  }

  detachEventListener() {
    if (document.removeEventListener) {
      // For all major browsers, except IE 8 and earlier
      window.removeEventListener("mousemove", this.handlingOnMouseMove);
    } else if (document.detachEvent) {
      // For IE 8 and earlier versions
      document.detachEvent("onmousemove", this.handlingOnMouseMove);
    }
  }

  render() {
    const styles = {
      footer: {
        padding: "2px",
        backgroundColor: "#575756",
        alignItems: "center",
        flexShrink: 0,
        display: 'flex',
      },
      copyright: {
        display: "flex",
        alignItems: "center",
        flex: "0 0 auto",
        fontSize: "10px",
        color: "#ffffff",
        marginLeft: "8px",
        margin: "3px 0px 1px 3px",
      },
      progress: {
        flex: "1 1 auto"
      }
    };
    return (
      <div style={styles.footer}>
        <div style={styles.copyright}> ©budget by F. HOONAKKER {config.version}</div>
        {/*<div style={{*/}
        {/*  ...styles.copyright,*/}
        {/*  flex: 1,*/}
        {/*  justifyContent: 'flex-end',*/}
        {/*  paddingRight: '15px'*/}
        {/*}}>{"allowance: " + JSON.stringify(this.props.user.user.allowance) + " manager_allowance: " + JSON.stringify(this.props.user.user.managerAllowance)}</div>*/}
        {/*<IntranetDialog/>*/}
      </div>
    );
  }
}

const routedFooter = withRouter(Footer);
export default connect(store => {
  return {
    user: store.user,
  };
})(routedFooter);

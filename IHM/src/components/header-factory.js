import React, {Component} from 'react';
// import OfromOmada from "../styles/svg-icons/o-of-omada";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import * as userActions from '../redux/actions/user-action';
// import logoNegative from '../styles/only-symbol-negative.svg';

const styles = {
  main: {
    backgroundColor: "#177792",
  },
  leftTitle: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  left: {},
  center: {
    flex: "1 1 auto"

  },
  right: {
    display: "flex",
    alignItems: "center",
    paddingRight: "8px"
  },
  grow: {
    flexGrow: 1,
  },
  menuIcon: {
    marginLeft: '-25px',
  }
};


class HeaderFactory extends Component {
  state = {
    anchorEl: null,
    open: false,
  };

  render() {
    return this.generateHeader();
  }

  generateHeader() {
    const {anchorEl, open} = this.state;
    return (
      <AppBar position={'static'} style={styles.main}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" style={styles.menuIcon} onClick={this.handleMenu}>
            <MenuIcon/>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.goToHome}>GoHome</MenuItem>
              <MenuItem onClick={this.logout}>Log out</MenuItem>
            </Menu>
          </IconButton>
          <Typography variant="h6" color="inherit" style={styles.leftTitle}>
            {this.getTitleName()}
          </Typography>
          <div style={{...styles.grow, justifyContent: 'center', display: 'flex'}}>
            {/*<img src={logoNegative} alt={''} width={30} height={30} style={{marginRight: '8px'}}/>*/}
            <Typography variant="h6" color="inherit">
              BUDGET
            </Typography>
          </div>
          <div>
            {this.getUserName()}

          </div>
        </Toolbar>
      </AppBar>
    )
  }

  getUserName() {
    // if (this.props.user.isLogged)
    //   return (this.props.user.user.sAMAccountName)
    return 'Not Logged'
  }

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget, open: !this.state.open});
  };

  getTitleName() {
    let title = this.props.pathname;
    if (title === '/') title = 'HOME';
    if (title.charAt(0) === '/') title = title.substr(1);

    // let module = this.props.modules.find(element => {
    //   return element.location === this.props.pathname
    // });

    // return module === undefined ? title.toUpperCase() : module.title.toUpperCase();
    return this.props.pathname.toUpperCase()
  }

  handleClose = () => {
    this.setState({open: false});
  };

  goToHome = () => {
    this.handleClose();
    this.props.history.push('/')
  };

  logout = () => {
    let guid = this.props.user.user.guid;
    // this.props.dispatch(userActions.logout(guid));
    this.props.history.push('/login');
  };

  static generateOmadaTitle() {
    return (
      <div style={styles.leftTitle}>
        {/*<OfromOmada style={{marginLeft: '8px'}} className={'App-logo'}/>*/}
        <span style={{fontWeight: 'bold', marginLeft: '1px'}}>MADA</span>
      </div>);
  }

  static generateHomeTitle() {
    return (<div style={styles.leftTitle}>HOME</div>);
  }

  static generatePeopleTitle() {
    return (<div style={styles.leftTitle}>PEOPLE</div>);
  }

  static generateSignatureTitle() {
    return (<div style={styles.leftTitle}>SIGNATURE</div>);
  }

}

export default connect(store => {
  return {
    pages: store.pages,
    user: store.user,
    // modules: store.admin.moduleData,
  };
})(HeaderFactory);


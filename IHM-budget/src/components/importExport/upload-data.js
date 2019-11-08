import React, {Component} from 'react';
// import OfromOmada from "../../styles/svg-icons/o-of-omada";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {CircularProgress, Select, Typography} from "@material-ui/core";
import * as importExportActions from "../../redux/actions/import-export-actions";
import {withSnackbar} from "notistack";
import MenuItem from "@material-ui/core/MenuItem";
// import MeetingRoom from "../../styles/svg-icons/meeting-room";


const cardWidth = 200;
const cardHeight = 280;
const styles = theme => ({
  main: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: '35px',
  },
  upperPart: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bottomPart: {
    display: 'flex',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    minWidth: cardWidth,
    maxWidth: cardWidth,
    height: cardHeight,
    margin: '15px',
    cursor: 'pointer',
  },
  cardTitle: {
    display: 'flex',
    flexGrow: 'grow',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    height: '100px',
  },
  divider: {
    backgroundColor: '#177792',
    marginBottom: '15px',
  },
  content: {
    minHeight: '190px',
  },
  cardButton: {color: '#177792', fontWeight: 'bold'},
  invisible: {
    opacity: "0",
    width: "0px",
    height: "0px",
    visibility: "hidden"
  },
  fileName: {
    marginLeft: '15px',
  }
});

class UploadData extends Component {

  constructor(props) {
    super(props);
    this.resourceUploadInputRef = undefined;
    this.state = {
      selectedFile: '',
      selectedAccount: 0
    }
  }


  render() {
    return (
      <div style={{display: 'flex', flexGrow: 1}}>
        {this.getContent()}
      </div>
    )
  }

  getContent() {
    const {classes} = this.props;
    console.log("content of upload");
    let accounts = [{'name': '- Select an account -', 'id': '0'}].concat(this.props.accounts);
    console.log(accounts);
    return (
      <div className={classes.main}>
        <div className={classes.upperPart}>
          {this.props.fetchingAccounts === true &&
          <CircularProgress size={50} color={"secondary"}/>
          }
          {this.props.fetchingAccounts === false &&
          <Select variant={"outlined"}
                  value={this.state.selectedAccount}
                  onChange={this.handleChangeAccount}
          >
            {accounts.map((account, index) => (
              <MenuItem
                key={account.id}
                value={account.id}
              >
                <div>
                  {index === 0 && <em>{account.name}</em>}
                  {index > 0 && account.name + ' (' + account.id + ')'}
                </div>

              </MenuItem>
            ))}
          </Select>
          }
          <Button
            variant={"contained"} color={"primary"}
            onClick={this.clickSelectFile}
          >
            Upload data from xlsx file
          </Button>
          {this.props.uploadingFile === true &&
          <CircularProgress size={50} color={"secondary"} className={classes.fileName}/>
          }
          <Typography variant={"h6"} className={classes.fileName}>
            {this.state.selectedFile === '' ? 'Choose a file' : this.state.selectedFile}
          </Typography>

          <input
            ref={el => {
              this.resourceUploadInputRef = el
            }}
            type={'file'}
            className={classes.invisible}
            onChange={this.handleResourceInputFile}
            multiple={true}
            name={'uploaded_resource_file'}
          />
        </div>
      </div>
    );
  }

  handleChangeAccount = event => {
    this.setState({selectedAccount: event.target.value})
  };
  clickSelectFile = event => {
    this.setState({selectedFile: ''});
    this.resourceUploadInputRef.value = '';
    this.resourceUploadInputRef.click();
  };
  handleResourceInputFile = event => {
    this.setState({selectedFile: event.target.files[0].name});
    if (this.state.selectedAccount === 0) {
      this.props.enqueueSnackbar('Select an account', {variant: 'error', autoHideDuration: 4000})
    } else {
      this.props.dispatch(importExportActions.uploadXLSXFile(event.target.files[0], this.state.selectedAccount, this.props.enqueueSnackbar))
    }

  };

}

const exportedUploadData = withRouter(withStyles(styles)(withSnackbar(UploadData)));
export default connect(store => {
  return {
    pages: store.pages,
    user: store.user,
    uploadingFile: store.importExport.uploadingFile,
    fetchingAccounts: store.importExport.fetchingAccounts,
    accounts: store.importExport.accounts,
  };
})(exportedUploadData);
import React, {Component} from 'react';
// import OfromOmada from "../../styles/svg-icons/o-of-omada";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {withSnackbar} from "notistack";
import * as budgetActions from "../../redux/actions/budget-actions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/AddOutlined'
import DeletIcon from '@material-ui/icons/DeleteForever'
import {Typography} from "@material-ui/core";
// import MeetingRoom from "../../styles/svg-icons/meeting-room";


const cardWidth = 200;
const cardHeight = 280;
const styles = theme => ({
  main: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    padding: '35px',
  },
  upperPart: {
    display: 'flex',
    flex: '1 1 auto',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexWrap: 'wrap',
    flexDirection: 'column'
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
  budgetDetails: {
    display: 'flex',
    flex: '1 1 auto',
    marginTop: '15px',
    flexDirection: 'column',
  }
});

class UploadData extends Component {

  constructor(props) {
    super(props);
    this.resourceUploadInputRef = undefined;
    this.state = {
      open: false,
      selectedName: '',
      budgetItems: [],
      itemToAdd: ''
    }
  }


  render() {
    return (
      <div style={{display: 'flex', flex: '1 1 auto'}}>
        {this.getContent()}
      </div>
    )
  }

  getContent() {
    const {classes} = this.props;

    return (
      <div className={classes.main}>
        <div className={classes.upperPart}>
          <div>
            <Button variant={"contained"} color={"primary"} onClick={this.handleOpenNameSelector}>
              Create budget
            </Button>
          </div>
          {this.getBudgetNameDialog()}
          {this.getBudgetDetails()}

        </div>
      </div>
    );
  }

  getBudgetNameDialog() {
    return <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a budget</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give the name of the budget and submit.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name of the budget"
          type="text"
          fullWidth
          value={this.state.selectedName}
          onChange={this.updateName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={this.handleCreateBudget} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>;
  }

  updateName = event => {
    this.setState({selectedName: event.target.value})
  };
  handleClose = event => {
    this.setState({open: false})
  };
  handleOpenNameSelector = event => {
    this.setState({open: true})
  };
  handleCreateBudget = event => {
    console.log("budget to create is : " + this.state.selectedName);
    this.handleClose();
    this.props.dispatch(budgetActions.createBudget(this.state.selectedName, this.props.enqueueSnackbar))
  };

  getBudgetDetails() {
    const {classes} = this.props;
    return <div className={classes.budgetDetails}>
      <div>
        <TextField
          value={this.state.itemToAdd}
          variant={"outlined"}
          onChange={this.updateItemToAdd}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.addItem()
            }
          }}
          label={'Item to add'}/>
        <IconButton className={classes.button} aria-label="add" onClick={this.addItem}>
          <AddIcon color={"secondary"}/>
        </IconButton>
      </div>
      {this.createBudgetList()}
    </div>
  }

  addItem = event => {
    let currentList = this.state.budgetItems;
    let name = this.state.itemToAdd;
    currentList.push({item: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(), value: ''});
    this.setState({budgetItems: currentList, itemToAdd: ''});
  };
  updateItemToAdd = event => {
    this.setState({itemToAdd: event.target.value})
  };

  createBudgetList() {
    const {classes} = this.props;
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '15px'}}>
        <table>
          <tbody>
          {this.state.budgetItems.map((item, index) => {
            return <tr key={'budget_item_' + index}>
              <td>
                <IconButton className={classes.button} aria-label="delete" onClick={(event) => {
                  this.deleteItem(index)
                }}
                            color={'secondary'}>
                  <DeletIcon/>
                </IconButton>
              </td>
              <td>
                <Typography variant={"h5"} style={{margin: '15px'}}>
                  {item.item}
                </Typography>
              </td>
              <td>
                <TextField variant={"outlined"} label={item.item + ' value'} value={item.value}/>
              </td>
            </tr>
          })}
          </tbody>
        </table>
      </div>);
  }

  deleteItem(index) {
    let newArray = this.state.budgetItems.slice();
    newArray.splice(index,1);
    if (index > -1) {
      this.setState({budgetItems: newArray})
    }
  }
}

const exportedUploadData = withRouter(withStyles(styles)(withSnackbar(UploadData)));
export default connect(store => {
  return {};
})(exportedUploadData);
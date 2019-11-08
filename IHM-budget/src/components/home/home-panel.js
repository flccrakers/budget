import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import OfromOmada from "../../styles/svg-icons/o-of-omada";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Divider} from "@material-ui/core";
import CloudUpload from '@material-ui/icons/CloudUpload'
import Money from '@material-ui/icons/AttachMoney'
import BudgetIcon from '@material-ui/icons/AccountBalance'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchAccountList} from "../../redux/actions/import-export-actions";
import {withSnackbar} from "notistack";
import {getBudget} from "../../redux/actions/budget-actions";
import Category from "@material-ui/icons/Category";
// import MeetingRoom from "../../styles/svg-icons/meeting-room";


const cardWidth = 200;
const cardHeight = 280;
const styles = {
  main: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: '35px',
  },
  upperPart: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
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


};

class Home extends Component {

  constructor(props) {
    super(props);
    this.everwinRef = undefined;
    this.officeRef = undefined;
  }


  render() {
    return (
      <div style={{display: 'flex', flexGrow: 1}}>
        {this.getContent()}
      </div>
    )
  }

  getContent() {
    return (
      <div style={styles.main}>
        <div style={styles.upperPart}>
          <Card style={styles.card} onClick={this.uploadData}>
            <CardContent style={styles.content}>
              <div style={styles.cardTitle}>
                <CloudUpload style={{color: '#177792', marginLeft: '8px', width: '50px', height: '50px'}}/>
                <br/>
                <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>{'UPLOAD DATA'}</span>
              </div>
              <Divider style={styles.divider}/>
              <Typography component="p">
                {'Upload data from bank'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button style={styles.cardButton}>Go toIMPORT EXPORT</Button>
            </CardActions>
          </Card>
          <Card style={styles.card} onClick={this.gotToAccount}>
            <CardContent style={styles.content}>
              <div style={styles.cardTitle}>
                <Money style={{color: '#177792', marginLeft: '8px', width: '50px', height: '50px'}}/>
                <br/>
                <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>{'ACCOUNTS'}</span>
              </div>
              <Divider style={styles.divider}/>
              <Typography component="p">
                {'Watch your accounts'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button style={styles.cardButton}>Go to ACCOUNT</Button>
            </CardActions>
          </Card>
          <Card style={styles.card} onClick={this.gotToBudget}>
            <CardContent style={styles.content}>
              <div style={styles.cardTitle}>
                <BudgetIcon style={{color: '#177792', marginLeft: '8px', width: '50px', height: '50px'}}/>
                <br/>
                <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>{'BUDGETS'}</span>
              </div>
              <Divider style={styles.divider}/>
              <Typography component="p">
                {'Define your budget'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button style={styles.cardButton} >Go to BUDGET</Button>
            </CardActions>
          </Card>
          <Card style={styles.card} onClick={this.gotToCategory}>
            <CardContent style={styles.content}>
              <div style={styles.cardTitle}>
                <Category style={{color: '#177792', marginLeft: '8px', width: '50px', height: '50px'}}/>
                <br/>
                <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>{'EXPANSE CATEGORY'}</span>
              </div>
              <Divider style={styles.divider}/>
              <Typography component="p">
                {'Manage the expanse categories'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button style={styles.cardButton} >Go to BUDGET</Button>
            </CardActions>
          </Card>


        </div>

      </div>
    );
  }

  uploadData = () => {
    // this.props.dispatch(fetchModuleData());
    this.props.dispatch(fetchAccountList(this.props.enqueueSnackbar));
    this.props.history.push('/upload-data');
  };

  gotToAccount = () => {
    this.props.dispatch(fetchAccountList(this.props.enqueueSnackbar));
    this.props.dispatch(getBudget(this.props.enqueueSnackbar));
    this.props.history.push('/accounts');
  };

  gotToBudget = () => {
    this.props.dispatch(getBudget(this.props.enqueueSnackbar));
    this.props.history.push('/budgets')
  };
  gotToCategory = () => {
    this.props.dispatch(getBudget(this.props.enqueueSnackbar));
    this.props.history.push('/expanse-categories')
  }


}

const routedHome = withRouter(withSnackbar(Home));
export default connect(store => {
  return {
    pages: store.pages,
    user: store.user,
  };
})(routedHome);
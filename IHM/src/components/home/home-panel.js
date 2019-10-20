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
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchAccountList} from "../../redux/actions/import-export-actions";
import {withSnackbar} from "notistack";
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
              <Button style={styles.cardButton} onClick={this.uploadData}>Go toIMPORT EXPORT</Button>
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
              <Button style={styles.cardButton} onClick={this.uploadData}>Go to ACCOUNT</Button>
            </CardActions>
          </Card>
          {/*<Card style={styles.card} onClick={this.goToOmada}>*/}
          {/*  <CardContent style={styles.content}>*/}
          {/*    <div style={styles.cardTitle}>*/}
          {/*      <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>{'OMADA'}</span>*/}
          {/*    </div>*/}
          {/*    <Divider style={styles.divider}/>*/}
          {/*    <Typography component="p">*/}
          {/*      {'Access to the whole data of NovAliX. Import data and make reports'}*/}
          {/*    </Typography>*/}
          {/*  </CardContent>*/}
          {/*  <CardActions>*/}
          {/*    <Button style={styles.cardButton} onClick={this.goToOmada}>Go to OMADA</Button>*/}
          {/*  </CardActions>*/}
          {/*</Card>*/}
          {/*<Card style={styles.card} onClick={this.goToPeople}>*/}
          {/*  <CardContent style={styles.content}>*/}
          {/*    <div style={styles.cardTitle}>*/}
          {/*      <People style={{color: '#177792', width: '50px', height: '50px'}}/>*/}
          {/*      <br/>*/}
          {/*      <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>PEOPLE</span>*/}
          {/*    </div>*/}
          {/*    <Divider style={styles.divider}/>*/}
          {/*    <Typography component="p">*/}
          {/*      {'Request for New User Account / or Account Extension'}*/}
          {/*    </Typography>*/}
          {/*  </CardContent>*/}
          {/*  <CardActions>*/}
          {/*    <Button style={styles.cardButton} onClick={this.goToPeople}>Go to PEOPLE</Button>*/}
          {/*  </CardActions>*/}
          {/*</Card>*/}
          {/*<Card style={styles.card} onClick={this.goToMaintenance}>*/}
          {/*  <CardContent style={styles.content}>*/}
          {/*    <div style={styles.cardTitle}>*/}
          {/*      <Build style={{color: '#177792', width: '50px', height: '50px'}}/>*/}
          {/*      <br/>*/}
          {/*      <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px', textAlign: 'center'}}>MAINTENANCE MANAGEMENT</span>*/}
          {/*    </div>*/}
          {/*    <Divider style={styles.divider}/>*/}
          {/*    <Typography component="p">*/}
          {/*      {'Request for New User Account / or Account Extension'}*/}
          {/*    </Typography>*/}
          {/*  </CardContent>*/}
          {/*  <CardActions>*/}
          {/*    <Button style={styles.cardButton} onClick={this.goToMaintenance}>got to*/}
          {/*      MAINTENANCE</Button>*/}
          {/*  </CardActions>*/}
          {/*</Card>*/}
          {/*<Card style={styles.card} onClick={this.goToSignature}>*/}
          {/*  <CardContent style={styles.content}>*/}
          {/*    <div style={styles.cardTitle}>*/}
          {/*      <Gesture style={{color: '#177792', width: '50px', height: '50px'}}/>*/}
          {/*      <br/>*/}
          {/*      <span style={{color: '#177792', fontWeight: 'bold', marginLeft: '1px'}}>GENERATE SIGNATURE</span>*/}
          {/*    </div>*/}
          {/*    <Divider style={styles.divider}/>*/}
          {/*    <Typography component="p">*/}
          {/*      {"Generate your signature, in accordance with the NovAliX's graphic charter"}*/}
          {/*    </Typography>*/}
          {/*  </CardContent>*/}
          {/*  <CardActions>*/}
          {/*    <Button style={styles.cardButton} onClick={this.goToSignature}>Go to SIGNATURE</Button>*/}
          {/*  </CardActions>*/}
          {/*</Card>*/}

        </div>

      </div>
    );
  }

  uploadData = () => {
    // this.props.dispatch(fetchModuleData());
    this.props.dispatch(fetchAccountList(this.props.enqueueSnackbar));
    console.log("Should upload data");
    this.props.history.push('/upload-data');
  };

  gotToAccount = () => {
    this.props.history.push('/accounts');
  };


}

const routedHome = withRouter(withSnackbar(Home));
export default connect(store => {
  return {
    pages: store.pages,
    user: store.user,
  };
})(routedHome);
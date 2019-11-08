import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "./header";
import Footer from "./footer";
import HomePanel from "./home/home-panel";
import UploadData from "./importExport/upload-data";
import Accounts from "./accounts/accounts";
import Budgets from "./budget/budgets"
import Categories from "./categories/categories"
import {withRouter} from "react-router-dom";


const styles = {
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    position: 'relative', /* need to position inner content*/
    overflow: 'hidden',
  },
  middle: {
    flex:'1 1 auto',
    // overflow: 'auto',
    minHeight: '2em',
    display: 'flex',
  },
};

class Home extends Component {

  render() {
    return (
      <div style={styles.rootContent}>
        {this.getHeader()}
        <div style={styles.middle} id={'middle-div'}>
         {this.getMiddleContent()}
        </div>
        <Footer/>
      </div>
    );
  }

  getCurrentRoom() {

    if (this.props.history.location.pathname.includes('meeting-rooms')) {
      let roomPath = this.props.history.location.pathname.split('/').pop();
      if (roomPath === 'batA-petite') return 'Petite salle Bat-A';
      else return '';
    }
    return '';
  }


  getHeader() {
    return (
      <Header pathname={this.props.history.location.pathname} history={this.props.history}/>
    );
  }

  getMiddleContent() {
    switch (this.props.history.location.pathname) {
      case '/upload-data': {
         return <UploadData/>
      }
      case '/accounts':{
        return <Accounts/>
      }
      case '/budgets':{
        return <Budgets/>
      }
      case '/expanse-categories':{
        return <Categories/>
      }

      default:
        return (<HomePanel/>)
    }
  }
}

const MyHome = withRouter(Home);

export default connect(store => {
  return {
    converter: store.converter,
    pages: store.pages,
    user: store.user,
  };
})(MyHome);
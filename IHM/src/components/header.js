import React, {Component} from 'react';
import HeaderFactory from './header-factory';


class Header extends Component {
  render() {
    return (
      <HeaderFactory pathname={this.props.pathname} history={this.props.history}/>
    );
  }
}

export default (Header);
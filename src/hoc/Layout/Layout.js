import React, { Component } from 'react';
import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <h3>Toolbar</h3>
        <h3>sidedrawer</h3>*/}
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;

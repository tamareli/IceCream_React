import React, { Component } from 'react';
import classes from '../../css/Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedhandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.header ? 
          <Toolbar
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}
          />: null
          } 
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedhandler}
          show={this.state.showSideDrawer}
        />
        <main className={classes.Main}>{this.props.children}</main>
        {this.props.page === 'build' ? null: <Footer />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../../store/actions/auth';
import * as cartActions from '../../../store/actions/cart';
import { Redirect } from 'react-router-dom';
class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to='/' />;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(authActions.logout());
      dispatch(cartActions.clearCart());
    },
  };
};
export default connect(null, mapDispatchToProps)(Logout);

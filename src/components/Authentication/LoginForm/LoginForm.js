import classes from '../../../css/Form.module.css';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import GreenButton from '../../UI/Button/GreenButton';

class LoginForm extends Component {
  render() {
    let path = '/';
    if (this.props.redirectTo !== null) {
      path = this.props.redirectTo;
    }
    return (
      <div className={classes.Form}>
        <h4>חדש באתר?</h4>
        <hr></hr>
        <Link to={'/SignIn?redirectTo=' + this.props.redirectTo}>
          <GreenButton text='הירשם' />
        </Link>

        {this.props.isAuthenticated ? null : (
          <>
            <p style={{ marginTop: '1rem' }}>או</p>
            <Link exact='true' to={path}>
              <GreenButton text='המשך כאורח' />
            </Link>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(withRouter(LoginForm));

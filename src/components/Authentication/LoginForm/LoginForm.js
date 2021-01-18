import classes from '../../../css/Form.module.css';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';

class LoginForm extends Component {
  render() {
    let path = '/';
    if (this.props.redirectTo != null) {
      path = this.props.redirectTo;
    }
    return (
      <div className={classes.Form}>
        <h3>חדש באתר?</h3>
        <hr></hr>
        <Link to={'/SignIn?redirectTo=' + this.props.redirectTo}>
          <button className={classes.Button}>להרשמה</button>
        </Link>

        {this.props.isAuthenticated ? null : (
          <>
            <p>או</p>
            <Link exact='true' to={path}>
              <button className={classes.Button}>המשך כאורח</button>
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

import React, { Component } from 'react';
import classes from '../../../css/Form.module.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as AuthActions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
export class LogIn extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);
  };

  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };

  render() {
    console.log();
    let path = '/';
    let authRedirect = null;
    let error = null;

    if (this.props.isAuthenticated) {
      if (this.props.redirectTo != null) {
        path = this.props.redirectTo;
      }
      authRedirect = <Redirect to={path} />;
    }

    if (this.props.error) {
      error = <p style={{ color: 'red' }}>{this.props.error}</p>;
    }

    let loginForm = (
      <form onSubmit={this.onSubmit} className={classes.Form}>
        {authRedirect}
        <h3>התחבר/י</h3>
        <hr></hr>
        {error}
        <Input
          type='email'
          name='email'
          inputtype='input'
          label='מייל'
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        <Input
          type='password'
          name='password'
          inputtype='input'
          label='סיסמה'
          value={this.state.password}
          onChange={this.handleChange('password')}
        />

        <div>
          <input className={classes.Button} type='submit' value='כניסה' />
        </div>

        <div className={classes.ForgetPass}>
          {/* הקישור יפנה לדף של שיחזור סיסמה */}
          <Link to='/ForgetPassword'> שכחת סיסמה? לחץ כאן</Link>
        </div>
      </form>
    );
    if (this.props.loading) loginForm = <Spinner></Spinner>;
    return loginForm;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, path) =>
      dispatch(AuthActions.auth(email, password, path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogIn));

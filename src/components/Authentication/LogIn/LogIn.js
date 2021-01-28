import React, { Component } from 'react';
import classes from '../../../css/Form.module.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as AuthActions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import { checkValidity } from '../../../shared/validate';

export class LogIn extends Component {
  state = {
    user: {
      email: '',
      password: '',
    },
    userValidationRules: {
      email: {
        required: true,
        regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      password: { required: true, minLength: 8, maxLength: 15 },
    },
    userValid: {
      email: { valid: false, touched: false, errmessage: '' },
      password: { valid: false, touched: false, errmessage: '' },
    },
    isValidForm: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.user.email, this.state.user.password);
  };

  handleChange = (input) => (e) => {
    e.preventDefault();
    let updatedUser = this.state.user;
    let validUser = this.state.userValid;
    updatedUser[input] = e.target.value;
    validUser[input].touched = true;
    validUser[input].errmessage = checkValidity(
      updatedUser[input],
      this.state.userValidationRules[input]
    );
    validUser[input].valid = validUser[input].errmessage === '';

    let validForm = true;
    for (let field in validUser) {
      validForm = validUser[field].valid && validForm;
    }
    this.setState({
      user: updatedUser,
      userValid: validUser,
      isValidForm: validForm,
    });
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
          value={this.state.user.email}
          onChange={this.handleChange('email')}
          invalid={(!this.state.userValid.email.valid).toString()}
          touched={this.state.userValid.email.touched.toString()}
          errmessage={this.state.userValid.email.errmessage}
        />
        <Input
          type='password'
          name='password'
          inputtype='input'
          label='סיסמה'
          value={this.state.user.password}
          onChange={this.handleChange('password')}
          invalid={(!this.state.userValid.password.valid).toString()}
          touched={this.state.userValid.password.touched.toString()}
          errmessage={this.state.userValid.password.errmessage}
        />

        <div>
          <input
            className={classes.Button}
            type='submit'
            value='כניסה'
            disabled={!this.state.isValidForm}
          />
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
